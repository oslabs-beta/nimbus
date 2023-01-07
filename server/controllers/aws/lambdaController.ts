import { LambdaClient, ListFunctionsCommand } from "@aws-sdk/client-lambda";
import { Request, Response, NextFunction } from "express";

import dotenv from 'dotenv';
dotenv.config();

// Controller for the Lambda functions
const lambdaController = {
    // Get list of Lambda functions and store in res.locals.functions
    async getFunctions(req: Request, res: Response, next: NextFunction) {
        // Create new LambdaClient
        const lambdaClient = new LambdaClient({
            region: res.locals.region, 
            credentials: res.locals.credentials
        });
        
        // Create new ListFunctionsCommand
        const getFunctionsCommand = new ListFunctionsCommand({});

        try {
            const commandResults = await lambdaClient.send(getFunctionsCommand);
            const lambdaFunctions = commandResults?.Functions;
            const lambdaFunctionDetails = lambdaFunctions?.map(f => f.FunctionName);
            console.log(lambdaFunctionDetails);
            res.locals.functions = lambdaFunctionDetails;
            return next();
        } catch (err) {
            console.log(err);
            return next({
                log: "Error caught in lambdaController.getFunctions middleware function",
                status: 500,
                message: {errMessage: `Error getting functions for the account`, errors: err}
              });
        }
    }
}

export default lambdaController;
