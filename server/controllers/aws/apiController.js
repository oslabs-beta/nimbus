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
//NEED TO CONVERT FILE TO TYPESCRIPT
const client_api_gateway_1 = require("@aws-sdk/client-api-gateway");
const client_lambda_1 = require("@aws-sdk/client-lambda");
const apiController = {
    getAPIRelations(req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            // Change variable name
            console.log('hitting API controller');
            const apiClient = new client_api_gateway_1.APIGatewayClient({
                region: res.locals.region,
                credentials: res.locals.credentials,
            });
            const lambdaClient = new client_lambda_1.LambdaClient({
                region: res.locals.region,
                credentials: res.locals.credentials
            });
            // const apiData: {name: string, apiId: string, resourses: any[]}[] = [];
            // // Grab names of API Endpoints and associated IDs
            const apiList = [];
            const lambdaAPIsList = [];
            try {
                const restAPIs = yield apiClient.send(new client_api_gateway_1.GetRestApisCommand({}));
                //const restAPIs = await client.send(new GetResourcesCommand({ restApiId: 'd9vxwo4h1b' }));
                // const resources = await client.send(new GetResourceCommand({  }));
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
                //const restItems = restAPIs.items;
                //restItems?.forEach(i => console.log(i.resourceMethods));
                const functions = res.locals.functions;
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
                    }
                }
                const relations = [];
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
                    console.log(relationObj);
                    relations.push(relationObj);
                }
                res.locals.apiRelations = relations;
                return next();
            }
            catch (err) {
                next({
                    log: "Error caught in lambdaController.getAPIRelations middleware function",
                    status: 500,
                    message: { errMessage: `Error getting API relations for the account`, errors: err }
                });
            }
        });
    }
};
exports.default = apiController;
