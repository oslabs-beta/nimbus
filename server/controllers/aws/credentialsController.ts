import { STSClient, AssumeRoleCommand } from "@aws-sdk/client-sts";
import { AwsCredentialIdentity } from "@aws-sdk/types";
import { Request, Response, NextFunction } from "express";
import dotenv from 'dotenv';
dotenv.config();

const credentials: AwsCredentialIdentity = {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  };

const region = process.env.AWS_REGION;

// Create Amazon Cloudwatch Logs service client object
const client = new STSClient({ region, credentials });

// Establish relationship between Nimbus AWS account and client's account
// Grab the client's credentials
// This F(n) is used when grabbing information from Lambda, Gateway, etc

const credentialsController = {
  async getCredentials(req: Request, res: Response, next: NextFunction) {
    console.log('hitting credentials controller');
    console.log(req.body.arn);
    const roleDetails = {
      RoleArn: req.body.arn, //example: 'arn:aws:iam::588640996282:role/NimbusDelegationRole',
      RoleSessionName: 'NimbusSession'
    };
  
    try {
      const assumedRole = await client.send(new AssumeRoleCommand(roleDetails));
      const accessKeyId = assumedRole?.Credentials?.AccessKeyId;
      const secretAccessKey = assumedRole?.Credentials?.SecretAccessKey;
      const sessionToken = assumedRole?.Credentials?.SessionToken;
      const expiration = assumedRole?.Credentials?.Expiration;
      res.locals.credentials = { accessKeyId, secretAccessKey, sessionToken, expiration };
      res.locals.arnValidation = {validated: true};
      console.log(res.locals.credentials);
      return next();
      console.log(assumedRole);
    } catch (err) { 
      console.log(err);
      // If the ARN user input is invalid, send info to front end so that field will be highlighted red
      res.locals.arnValidation = {validated: false};
      return next();
    }
  }
};

export default credentialsController;
