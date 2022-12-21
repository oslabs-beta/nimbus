
//NEED TO CONVERT FILE TO TYPESCRIPT
import { APIGatewayClient, GetRestApisCommand, GetResourcesCommand, GetResourcesCommandInput, GetRestApisCommandOutput, GetDomainNameCommand, GetIntegrationCommand, GetUsagePlansCommand } from "@aws-sdk/client-api-gateway";
import { Request, Response, NextFunction } from "express";
import { LambdaClient, ListFunctionsCommand, GetPolicyCommand, GetPolicyCommandOutput } from "@aws-sdk/client-lambda";

type Endpoint = {
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

const apiController = {
    async getAPIData(req: Request, res: Response, next: NextFunction) {
        // Change variable name
        console.log('hitting API controller');
        const apiClient = new APIGatewayClient({
            region: res.locals.region, 
            credentials: res.locals.credentials,
        });

        const lambdaClient = new LambdaClient({
            region: res.locals.region,
            credentials: res.locals.credentials 
        });
        // const apiData: {name: string, apiId: string, resourses: any[]}[] = [];
        // // Grab names of API Endpoints and associated IDs
        
        const apiList: API[] = []; 
        const lambdaAPIsList: LambdaAPIs[] = [];
        try {
            
            const restAPIs: GetRestApisCommandOutput = await apiClient.send(new GetRestApisCommand({}));
            //const restAPIs = await client.send(new GetResourcesCommand({ restApiId: 'd9vxwo4h1b' }));
            // const resources = await client.send(new GetResourceCommand({  }));
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
            console.log(apiList);
            //const restItems = restAPIs.items;
            //restItems?.forEach(i => console.log(i.resourceMethods));

            const functions: string[] = res.locals.functions;

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

                }
                
            }

            console.log(lambdaAPIsList);

            // const relations = [];

            // for (const api of lambdaAPIs) {
            // const apiObj = {};
            // apiObj.apiName = api.apiName;
            // apiObj.endpoints = {};
            // for (const func of funcs) {
            //     for (const ep of func.endpoints) {
            //     if (ep.apiId === api.apiId) {
            //         if (apiObj.endpoints[ep.apiPath] === undefined) {
            //         apiObj.endpoints[ep.apiPath] = [];
            //         }
            //         apiObj.endpoints[ep.apiPath].push({
            //         method: ep.apiMethod,
            //         func: func.functionName
            //         });
            //     }
            //     }
            // }
            // console.log(apiObj);
            // list.push(apiObj);
            // }
            
            
            // })
            
            // return next();
        } catch (err) {
            next({
                log: "Error caught in lambdaController.getAPIData middleware function",
                status: 500,
                message: {errMessage: `Error getting functions for the account`, errors: err}
            });
        }

        // // Iterate through apiData array
        // // Send request to get associated resources
        // for (const el of apiData) {
        //     const resources = await client.send(new GetResourcesCommand({
        //         restApiId: apiData[el].apiId
        //     });
        // );
        // };

        // // Iterate through resources array
        // for (const resource of resources.items) {
            
        // }
        // const lambdaClient = new LambdaClient({
        //     region: res.locals.region,
        //     credentials: res.locals.credentials 
        // });

        // const getPolicyCommand = new GetPolicyCommand({
        //     FunctionName: "myTestFunc"
        // });

        // try {
        //     const commandResults = await lambdaClient.send(getPolicyCommand);
        //     console.log(commandResults);
        //     return next();
        // } catch (err) {
        //     console.log(err);
        //     return next({
        //         log: "Error caught in lambdaController.getPolicy middleware function",
        //         status: 500,
        //         message: {errMessage: `Error getting functions for the account`, errors: err}
        //         });
        // }
        

    }

}

export default apiController;