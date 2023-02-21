"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_api_gateway_1 = require("@aws-sdk/client-api-gateway");
const client_lambda_1 = require("@aws-sdk/client-lambda");
// Controller for the API Gateway endpoints
const apiController = {
    // Get relations between API Gateway endpoints and Lambda functions
    getAPIRelations(req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            // Create new APIGatewayClient
            const apiClient = new client_api_gateway_1.APIGatewayClient({
                region: res.locals.region,
                credentials: res.locals.credentials,
            });
            // Create new LambdaClient
            const lambdaClient = new client_lambda_1.LambdaClient({
                region: res.locals.region,
                credentials: res.locals.credentials
            });
            // Declare array to store APIs
            const apiList = [];
            const lambdaAPIsList = [];
            try {
                // Get list of APIs and store in apiList
                const restAPIs = yield apiClient.send(new client_api_gateway_1.GetRestApisCommand({}));
                const restAPIsItems = restAPIs === null || restAPIs === void 0 ? void 0 : restAPIs.items;
                if (restAPIsItems !== undefined) {
                    for (const item of restAPIsItems) {
                        const getResourcesInput = { restApiId: item.id };
                        const resources = yield apiClient.send(new client_api_gateway_1.GetResourcesCommand(getResourcesInput));
                        const paths = (_a = resources === null || resources === void 0 ? void 0 : resources.items) === null || _a === void 0 ? void 0 : _a.map(item => item.path);
                        const apiDetails = { apiName: item.name, apiId: item.id, paths: paths };
                        apiList.push(apiDetails);
                    }
                }
                // Get list of Lambda functions from res.locals
                const functions = res.locals.functions;
                // For each function, get the policy, create apiInfo and store apiInfo in lambdaAPIsList
                for (const func of functions) {
                    try {
                        const functionName = func;
                        const getPolicyCommand = new client_lambda_1.GetPolicyCommand({
                            FunctionName: functionName
                        });
                        const policyResults = yield lambdaClient.send(getPolicyCommand);
                        if (policyResults) {
                            const policy = policyResults.Policy;
                            if (policy) {
                                const statements = JSON.parse(policy).Statement;
                                const lambdaAPIs = {
                                    functionName,
                                    endpoints: []
                                };
                                for (const statement of statements) {
                                    const apiEndpoint = statement.Condition.ArnLike['AWS:SourceArn'];
                                    const apiEndpointStrArr = apiEndpoint.split('/');
                                    const apiIdStrArr = apiEndpointStrArr[apiEndpointStrArr.length - 4].split(':');
                                    const apiId = apiIdStrArr[apiIdStrArr.length - 1];
                                    const apiMethod = apiEndpointStrArr[apiEndpointStrArr.length - 2];
                                    const apiPath = apiEndpointStrArr[apiEndpointStrArr.length - 1];
                                    const apiInfo = { apiMethod, apiPath: '/' + apiPath, apiId };
                                    lambdaAPIs.endpoints.push(apiInfo);
                                }
                                lambdaAPIsList.push(lambdaAPIs);
                            }
                        }
                    }
                    catch (err) {
                        console.log(err);
                    }
                }
                // Declare array to store relations
                const relations = [];
                // For each API, create relationObj and store in relations
                for (const api of apiList) {
                    const relationObj = { apiName: api.apiName, endpoints: {} };
                    if (relationObj.endpoints) {
                        for (const lambdaAPI of lambdaAPIsList) {
                            for (const ep of lambdaAPI.endpoints) {
                                if (ep && (ep === null || ep === void 0 ? void 0 : ep.apiId) === api.apiId) {
                                    const path = ep.apiPath;
                                    if (relationObj.endpoints[path] === undefined) {
                                        relationObj.endpoints[path] = [];
                                    }
                                    relationObj.endpoints[ep.apiPath].push({
                                        method: ep.apiMethod,
                                        func: lambdaAPI.functionName
                                    });
                                }
                            }
                        }
                    }
                    relations.push(relationObj);
                }
                res.locals.apiRelations = relations;
                return next();
            }
            // If error, pass to error handler
            catch (err) {
                next({
                    log: "Error caught in apiController.getAPIRelations middleware function",
                    status: 500,
                    message: { errMessage: `Error getting API relations for the account`, err: err }
                });
            }
        });
    },
    // Get list of API endpoints
    getAPIList(req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            // Create new APIGatewayClient
            const apiClient = new client_api_gateway_1.APIGatewayClient({
                region: res.locals.region,
                credentials: res.locals.credentials,
            });
            // Declare array to store APIs
            const apiList = [];
            try {
                // Get list of APIs and store in apiList
                const restAPIs = yield apiClient.send(new client_api_gateway_1.GetRestApisCommand({}));
                const restAPIsItems = restAPIs === null || restAPIs === void 0 ? void 0 : restAPIs.items;
                if (restAPIsItems !== undefined) {
                    for (const item of restAPIsItems) {
                        const getResourcesInput = { restApiId: item.id };
                        const resources = yield apiClient.send(new client_api_gateway_1.GetResourcesCommand(getResourcesInput));
                        const paths = (_a = resources === null || resources === void 0 ? void 0 : resources.items) === null || _a === void 0 ? void 0 : _a.map(item => item.path);
                        const apiDetails = { apiName: item.name, apiId: item.id, paths: paths };
                        apiList.push(apiDetails);
                    }
                }
                res.locals.apiList = apiList;
                return next();
            }
            catch (err) {
                // If error, pass to error handler
                next({
                    log: "Error caught in apiController.getAPIList middleware function",
                    status: 500,
                    message: { errMessage: `Error getting API relations for the account`, err: err }
                });
            }
        });
    }
};
exports.default = apiController;
