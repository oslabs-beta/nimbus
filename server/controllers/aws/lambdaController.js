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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_lambda_1 = require("@aws-sdk/client-lambda");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
//req: Request, res: Response, next: NextFunction
const lambdaController = {
    getFunctions() {
        return __awaiter(this, void 0, void 0, function* () {
            const lambdaClient = new client_lambda_1.LambdaClient({
                region: 'us-east-1',
                credentials: {
                    accessKeyId: 'ASIAYSDN4ZO5EVRXMD2J',
                    secretAccessKey: '2b/KMmCLIeT+zOJwPvCgeRJixlPK9Zo87nfDVGgy',
                    sessionToken: 'IQoJb3JpZ2luX2VjEND//////////wEaCXVzLWVhc3QtMSJHMEUCIHZZneS46OGdL10mub0z33xjXAZm8zHL9nqm12CgJwLlAiEAwnSUo8OM9QHicu8CVHJF7pah3laMtvhfL4D6ZwJvD7gqowII+f//////////ARAAGgw1ODg2NDA5OTYyODIiDKGyhOFIpg9FII3NXCr3AS/l40lQFXLbbWg90aLOSVMDrpbfgeFvOPgmHow6WBawBhejChmt/YomqN8wC44TXptymSFoqxPXH+oRUYhsA+3PMumvrN/9iy/8CveI+IUmySxBFUKU95YxxZJEGrP1T4lk2hVKdyY7/jxSbkWsIhH3fPdNDvIXoyQcgxThX9wuXzW/dvv1Q8Uini638alx4PBWG/WarfaO1rSoDpqWI1ZoMUAzbFY8G3ZltkStfCUGLWN8SEwuKn7+Z5c4qU9rZrFZr+0In1KkTWPk5XZwaWxJ4I/NLG/lttA7xnXg94nbDie/vJUVIWRZ+WEsLRCgJg7oaZaQCxMw7uXunAY6nQEns7DO5UvHmsid70gaBpWVfkuwCPyWUTlrdB4PzADCkvjQfdhpxfFsD7+4QK4Wc0kUcQD21chstDpjrLCFCsg3FruPMqxO54RFMyAf3DwS9AMtPS5oSPi2aUNzMttmj3pEMLYYgJnaAxztGzfZncC8w9onpCO0D4G9vAAcd9VVEWsiSFdem4v9tJBn9t4P0aSsEmvxS8hAADMExus8'
                } //req.body.credentials
            });
            const getFunctionsCommand = new client_lambda_1.ListFunctionsCommand({});
            try {
                const commandResults = yield lambdaClient.send(getFunctionsCommand);
                const lambdaFunctions = commandResults === null || commandResults === void 0 ? void 0 : commandResults.Functions;
                const lambdaFunctionNames = lambdaFunctions === null || lambdaFunctions === void 0 ? void 0 : lambdaFunctions.map(f => f.FunctionName);
                console.log(lambdaFunctionNames);
                //return next();
            }
            catch (err) {
                console.error('Error in Lambda List Functions: ', err);
                //return next(err);
            }
        });
    }
};
lambdaController.getFunctions();
