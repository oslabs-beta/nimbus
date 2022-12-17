"use strict";
// NEED TO CONVERT FILE TO TYPESCRIPT
// import { APIGatewayClient, GetRestApisCommand, GetResourcesCommand, GetIntegrationCommand, GetUsagePlansCommand } from "@aws-sdk/client-api-gateway";
// import { Request, Response, NextFunction } from "express";
// const apiController = {
//     async getAPIData(req: Request, res: Response, next: NextFunction) {
//         // Change variable name
//         const client = new APIGatewayClient({
//             region: req.body.region, 
//             credentials: req.body.credentials,
//         });
//         const apiData: {name: string, apiId: string, resourses: any[]}[] = [];
//         // Grab names of API Endpoints and associated IDs
//         try {
//             const restAPIs = await client.send(new GetRestApisCommand({}));
//             restAPIs?.items?.forEach((api) => {
//                 // Unsure where this apiObj is coming from
//                 const apiObj = { name : api.name, apiId: api.id, resources: []};
//                 apiData.push(apiObj);
//             });
//         };
//         // Iterate through apiData array
//         // Send request to get associated resources
//         for (const el of apiData) {
//             const resources = await client.send(new GetResourcesCommand({
//                 restApiId: apiData[el].apiId
//             });
//         );
//         };
//         // Iterate through resources array
//         for (const resource of resources.items) {
//         }
//     }
// }
// export default apiController;
