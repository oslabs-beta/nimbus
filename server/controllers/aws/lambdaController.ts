import { LambdaClient, ListFunctionsCommand } from "@aws-sdk/client-lambda";
import { Request, Response, NextFunction } from "express";

import dotenv from 'dotenv';
dotenv.config();
//req: Request, res: Response, next: NextFunction
const lambdaController = {
    async getFunctions(req: Request, res: Response, next: NextFunction) {
        const lambdaClient = new LambdaClient({
            region: res.locals.region, //'us-east-1',
            credentials: res.locals.credentials /* {
                accessKeyId: 'ASIAYSDN4ZO5EVRXMD2J',
                secretAccessKey: '2b/KMmCLIeT+zOJwPvCgeRJixlPK9Zo87nfDVGgy',
                sessionToken: 'IQoJb3JpZ2luX2VjEND//////////wEaCXVzLWVhc3QtMSJHMEUCIHZZneS46OGdL10mub0z33xjXAZm8zHL9nqm12CgJwLlAiEAwnSUo8OM9QHicu8CVHJF7pah3laMtvhfL4D6ZwJvD7gqowII+f//////////ARAAGgw1ODg2NDA5OTYyODIiDKGyhOFIpg9FII3NXCr3AS/l40lQFXLbbWg90aLOSVMDrpbfgeFvOPgmHow6WBawBhejChmt/YomqN8wC44TXptymSFoqxPXH+oRUYhsA+3PMumvrN/9iy/8CveI+IUmySxBFUKU95YxxZJEGrP1T4lk2hVKdyY7/jxSbkWsIhH3fPdNDvIXoyQcgxThX9wuXzW/dvv1Q8Uini638alx4PBWG/WarfaO1rSoDpqWI1ZoMUAzbFY8G3ZltkStfCUGLWN8SEwuKn7+Z5c4qU9rZrFZr+0In1KkTWPk5XZwaWxJ4I/NLG/lttA7xnXg94nbDie/vJUVIWRZ+WEsLRCgJg7oaZaQCxMw7uXunAY6nQEns7DO5UvHmsid70gaBpWVfkuwCPyWUTlrdB4PzADCkvjQfdhpxfFsD7+4QK4Wc0kUcQD21chstDpjrLCFCsg3FruPMqxO54RFMyAf3DwS9AMtPS5oSPi2aUNzMttmj3pEMLYYgJnaAxztGzfZncC8w9onpCO0D4G9vAAcd9VVEWsiSFdem4v9tJBn9t4P0aSsEmvxS8hAADMExus8'
            } */
        });

        const getFunctionsCommand = new ListFunctionsCommand({});

        try {
            const commandResults = await lambdaClient.send(getFunctionsCommand);
            const lambdaFunctions = commandResults?.Functions;
            const lambdaFunctionDetails = lambdaFunctions?.map(f => f.FunctionName);
            console.log(lambdaFunctionDetails);
            res.locals.lambdaFunctions = lambdaFunctionDetails;
            //return next();
        } catch (err) {
            console.log(err);
            //return next(err);
        }
    }
}

export default lambdaController;