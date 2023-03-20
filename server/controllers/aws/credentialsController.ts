import { STSClient, AssumeRoleCommand } from "@aws-sdk/client-sts";
import { AwsCredentialIdentity } from "@aws-sdk/types";
import { Request, Response, NextFunction } from "express";
import dotenv from 'dotenv';
dotenv.config();

const AWS = require('aws-sdk');
AWS.config.update({region: process.env.AWS_REGION});
const dynamodb = new AWS.DynamoDB.DocumentClient();

const credentials: AwsCredentialIdentity = {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_KEY,
};

const region = process.env.AWS_REGION;

// Create Amazon Cloudwatch Logs service client object
const client = new STSClient({ region, credentials });

// Establish relationship between Nimbus AWS account and client's account
const credentialsController = {
  // Get credentials for client's account from AWS and store in res.locals
  async getCredentials(req: Request, res: Response, next: NextFunction) {
    const roleDetails = {
      RoleArn: req.body.arn, //example: 'arn:aws:iam::588640996282:role/NimbusDelegationRole',
      RoleSessionName: 'NimbusSession'
    };
  
    try {
      // Granting ourselves permission to client's account
      const assumedRole = await client.send(new AssumeRoleCommand(roleDetails));
      const accessKeyId = assumedRole?.Credentials?.AccessKeyId;
      const secretAccessKey = assumedRole?.Credentials?.SecretAccessKey;
      const sessionToken = assumedRole?.Credentials?.SessionToken;
      const expiration = assumedRole?.Credentials?.Expiration;
      res.locals.credentials = { accessKeyId, secretAccessKey, sessionToken, expiration };
      res.locals.arnValidation = {validated: true};
      return next();
    } 
    // If the ARN user input is invalid, send info to front end so that field will be highlighted red
    catch (err) { 
      console.log(err);
      res.locals.arnValidation = {validated: false};
      return next();
    }
  },

  // Get credentials for client's account from database and store in res.locals
  // This function is used when grabbing information from Lambda, Gateway, etc
  async getCredentialsFromDB(req: Request, res: Response, next: NextFunction) {
    const { email } = res.locals;

    const params = {
      TableName: process.env.TABLE_NAME,
      Key: {
        'email' : email,
      },
    };

    const user: any = await dynamodb.get(params).promise();

    if (user) {
      res.locals.arn = user.Item.arn;
      res.locals.region = user.Item.region;
    }
    
    const roleDetails = {
      RoleArn: res.locals.arn, //example: 'arn:aws:iam::588640996282:role/NimbusDelegationRole',
      RoleSessionName: 'NimbusSession'
    };
  
    try {
      // Granting ourselves permission to client's account
      const assumedRole = await client.send(new AssumeRoleCommand(roleDetails));
      const accessKeyId = assumedRole?.Credentials?.AccessKeyId;
      const secretAccessKey = assumedRole?.Credentials?.SecretAccessKey;
      const sessionToken = assumedRole?.Credentials?.SessionToken;
      res.locals.credentials = { accessKeyId, secretAccessKey, sessionToken };
      return next();
    } 
    catch (err) { 
      console.log(err);
      return next({
        log: "Error caught in credentialsController.getCredentialsFromDB middleware function",
        status: 500,
        message: {errMessage: `Error assigning assumed role to the provided ARN`, errors: err}
      });
    }
  }
};

export default credentialsController;
