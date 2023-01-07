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
const client_sts_1 = require("@aws-sdk/client-sts");
const userModel_1 = __importDefault(require("../../models/userModel"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// interface User {
//  firstName: string,
//  lastName: string,
//  email: string,
//  password: string,
//  refreshToken?: string,
//  arn: string, 
//  region: string, 
// }
const credentials = {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_KEY,
};
const region = process.env.AWS_REGION;
// Create Amazon Cloudwatch Logs service client object
const client = new client_sts_1.STSClient({ region, credentials });
// Establish relationship between Nimbus AWS account and client's account
const credentialsController = {
    // Get credentials for client's account from AWS and store in res.locals
    getCredentials(req, res, next) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function* () {
            console.log('hitting credentials controller');
            console.log(req.body.arn);
            const roleDetails = {
                RoleArn: req.body.arn,
                RoleSessionName: 'NimbusSession'
            };
            try {
                // Granting ourselves permission to client's account
                const assumedRole = yield client.send(new client_sts_1.AssumeRoleCommand(roleDetails));
                const accessKeyId = (_a = assumedRole === null || assumedRole === void 0 ? void 0 : assumedRole.Credentials) === null || _a === void 0 ? void 0 : _a.AccessKeyId;
                const secretAccessKey = (_b = assumedRole === null || assumedRole === void 0 ? void 0 : assumedRole.Credentials) === null || _b === void 0 ? void 0 : _b.SecretAccessKey;
                const sessionToken = (_c = assumedRole === null || assumedRole === void 0 ? void 0 : assumedRole.Credentials) === null || _c === void 0 ? void 0 : _c.SessionToken;
                const expiration = (_d = assumedRole === null || assumedRole === void 0 ? void 0 : assumedRole.Credentials) === null || _d === void 0 ? void 0 : _d.Expiration;
                res.locals.credentials = { accessKeyId, secretAccessKey, sessionToken, expiration };
                res.locals.arnValidation = { validated: true };
                console.log(res.locals.credentials);
                return next();
            }
            // If the ARN user input is invalid, send info to front end so that field will be highlighted red
            catch (err) {
                console.log(err);
                res.locals.arnValidation = { validated: false };
                return next();
            }
        });
    },
    // Get credentials for client's account from database and store in res.locals
    // This function is used when grabbing information from Lambda, Gateway, etc
    getCredentialsFromDB(req, res, next) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            console.log('hitting credentials controller');
            const { email } = res.locals;
            const user = yield userModel_1.default.findOne({ email });
            console.log(user);
            if (user) {
                res.locals.arn = user.arn;
                res.locals.region = user.region;
            }
            const roleDetails = {
                RoleArn: res.locals.arn,
                RoleSessionName: 'NimbusSession'
            };
            try {
                // Granting ourselves permission to client's account
                const assumedRole = yield client.send(new client_sts_1.AssumeRoleCommand(roleDetails));
                const accessKeyId = (_a = assumedRole === null || assumedRole === void 0 ? void 0 : assumedRole.Credentials) === null || _a === void 0 ? void 0 : _a.AccessKeyId;
                const secretAccessKey = (_b = assumedRole === null || assumedRole === void 0 ? void 0 : assumedRole.Credentials) === null || _b === void 0 ? void 0 : _b.SecretAccessKey;
                const sessionToken = (_c = assumedRole === null || assumedRole === void 0 ? void 0 : assumedRole.Credentials) === null || _c === void 0 ? void 0 : _c.SessionToken;
                res.locals.credentials = { accessKeyId, secretAccessKey, sessionToken };
                console.log(res.locals.credentials);
                return next();
            }
            catch (err) {
                console.log(err);
                return next({
                    log: "Error caught in credentialsController.getCredentialsFromDB middleware function",
                    status: 500,
                    message: { errMessage: `Error assigning assumed role to the provided ARN`, errors: err }
                });
            }
        });
    }
};
exports.default = credentialsController;
