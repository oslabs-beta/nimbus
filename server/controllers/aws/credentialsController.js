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
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const credentials = {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_KEY,
};
const region = process.env.AWS_REGION;
// Create Amazon Cloudwatch Logs service client object
const client = new client_sts_1.STSClient({ region, credentials });
// Establish relationship between Nimbus AWS account and client's account
// Grab the client's credentials
// This F(n) is used when grabbing information from Lambda, Gateway, etc
const credentialsControllers = {
    getCredentials(req, res, next) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function* () {
            const roleDetails = {
                // This is hardcoded for now, should be input field from FrontEnd *******
                RoleArn: 'arn:aws:iam::588640996282:role/NimbusDelegationRole',
                RoleSessionName: 'NimbusSession'
            };
            try {
                const assumedRole = yield client.send(new client_sts_1.AssumeRoleCommand(roleDetails));
                const accessKeyId = (_a = assumedRole === null || assumedRole === void 0 ? void 0 : assumedRole.Credentials) === null || _a === void 0 ? void 0 : _a.AccessKeyId;
                const secretAccessKey = (_b = assumedRole === null || assumedRole === void 0 ? void 0 : assumedRole.Credentials) === null || _b === void 0 ? void 0 : _b.SecretAccessKey;
                const sessionToken = (_c = assumedRole === null || assumedRole === void 0 ? void 0 : assumedRole.Credentials) === null || _c === void 0 ? void 0 : _c.SessionToken;
                const expiration = (_d = assumedRole === null || assumedRole === void 0 ? void 0 : assumedRole.Credentials) === null || _d === void 0 ? void 0 : _d.Expiration;
                res.locals.credentials = { accessKeyId, secretAccessKey, sessionToken, expiration };
                res.locals.arnValidation = { validated: true };
                return next();
                console.log(assumedRole);
            }
            catch (err) {
                console.log(err);
                // If the ARN user input is invalid, send info to front end so that field will be highlighted red
                res.locals.arnValidation = { validated: false };
                return next(err);
            }
        });
    }
};
module.exports = credentialsControllers;
