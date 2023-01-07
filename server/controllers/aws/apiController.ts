import { APIGatewayClient, GetRestApisCommand, GetResourcesCommand, GetResourcesCommandInput, GetRestApisCommandOutput } from "@aws-sdk/client-api-gateway";
import { Request, Response, NextFunction } from "express";
import { LambdaClient, GetPolicyCommand, GetPolicyCommandOutput } from "@aws-sdk/client-lambda";

type Endpoint = {
    apiId: string;
    apiMethod: string;
    apiPath: string;
}

type LambdaAPIs = {
    functionName: string;
    endpoints: (Endpoint | undefined)[];
}

type API = {
    apiName: (string | undefined);
    apiId: (string | undefined);
    paths: (string | undefined)[] | undefined;
}

type Relation = {
    apiName: string | undefined;
    endpoints: { [key: string]: { method: string, func: string }[] } | undefined;
}

// Controller for the API Gateway endpoints
const apiController = {
    // Get relations between API Gateway endpoints and Lambda functions
    async getAPIRelations(req: Request, res: Response, next: NextFunction) {
        // Create new APIGatewayClient
        const apiClient = new APIGatewayClient({
            region: res.locals.region, 
            credentials: res.locals.credentials,
        });
        
        // Create new LambdaClient
        const lambdaClient = new LambdaClient({
            region: res.locals.region,
            credentials: res.locals.credentials 
        });
        
        // Declare array to store APIs
        const apiList: API[] = []; 
        const lambdaAPIsList: LambdaAPIs[] = [];
        
        try {
            // Get list of APIs and store in apiList
            const restAPIs: GetRestApisCommandOutput = await apiClient.send(new GetRestApisCommand({}));
            const restAPIsItems = restAPIs?.items;
            
            if (restAPIsItems !== undefined) {
                for (const item of restAPIsItems) {
                    const getResourcesInput: GetResourcesCommandInput = { restApiId: item.id };
                    const resources = await apiClient.send(new GetResourcesCommand(getResourcesInput));
                    const paths = resources?.items?.map(item => item.path);
                    const apiDetails: API = {apiName: item.name, apiId: item.id, paths: paths};
                    apiList.push(apiDetails);
                }
            }

            // Get list of Lambda functions from res.locals
            const functions: string[] = res.locals.functions;

            // For each function, get the policy, create apiInfo and store apiInfo in lambdaAPIsList
            for (const func of functions) {
                try {
                    const functionName = func;

                    const getPolicyCommand = new GetPolicyCommand({
                        FunctionName: functionName
                    });

                    const policyResults: GetPolicyCommandOutput = await lambdaClient.send(getPolicyCommand);

                    if (policyResults) {
                        const policy: (string | undefined) = policyResults.Policy;
                        if (policy) {
                            
                            const statements = JSON.parse(policy).Statement;
                            const lambdaAPIs: LambdaAPIs = {
                                functionName,
                                endpoints: []
                            }
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

                } catch (err) {
                    console.log(err);
                }
                
            }
            // Declare array to store relations
            const relations = [];

            // For each API, create relationObj and store in relations
            for (const api of apiList) {
                const relationObj:Relation = { apiName: api.apiName, endpoints: {} };
                if (relationObj.endpoints) {
                    for (const lambdaAPI of lambdaAPIsList) {
                        for (const ep of lambdaAPI.endpoints) {
                        if (ep && ep?.apiId === api.apiId) {
                            const path: string = ep.apiPath
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
                message: {errMessage: `Error getting API relations for the account`, err: err}
            });
        }

       

    },

    // Get list of API endpoints
    async getAPIList(req: Request, res: Response, next: NextFunction) {

        // Create new APIGatewayClient
        const apiClient = new APIGatewayClient({
            region: res.locals.region, 
            credentials: res.locals.credentials,
        });

        // Declare array to store APIs
        const apiList: API[] = []; 

        try {
            // Get list of APIs and store in apiList
            const restAPIs: GetRestApisCommandOutput = await apiClient.send(new GetRestApisCommand({}));
            const restAPIsItems = restAPIs?.items;
            
            if (restAPIsItems !== undefined) {
                for (const item of restAPIsItems) {
                    const getResourcesInput: GetResourcesCommandInput = { restApiId: item.id };
                    const resources = await apiClient.send(new GetResourcesCommand(getResourcesInput));
                    const paths = resources?.items?.map(item => item.path);
                    const apiDetails: API = {apiName: item.name, apiId: item.id, paths: paths};
                    apiList.push(apiDetails);
                }
            }
            res.locals.apiList = apiList;
            return next();
        
        } catch (err) {
            // If error, pass to error handler
            next({
                log: "Error caught in apiController.getAPIList middleware function",
                status: 500,
                message: {errMessage: `Error getting API relations for the account`, err: err}
            });
        }
    }
}

export default apiController;
