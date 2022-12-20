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
    getFunctions(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const lambdaClient = new client_lambda_1.LambdaClient({
                region: res.locals.region,
                credentials: res.locals.credentials
            });
            const getFunctionsCommand = new client_lambda_1.ListFunctionsCommand({});
            try {
                const commandResults = yield lambdaClient.send(getFunctionsCommand);
                const lambdaFunctions = commandResults === null || commandResults === void 0 ? void 0 : commandResults.Functions;
                const lambdaFunctionDetails = lambdaFunctions === null || lambdaFunctions === void 0 ? void 0 : lambdaFunctions.map(f => f.FunctionName);
                console.log(lambdaFunctionDetails);
                res.locals.functions = lambdaFunctionDetails;
                return next();
            }
            catch (err) {
                console.log(err);
                return next({
                    log: "Error caught in lambdaController.getFunctions middleware function",
                    status: 500,
                    message: { errMessage: `Error getting functions for the account`, errors: err }
                });
            }
        });
    }
};
exports.default = lambdaController;
