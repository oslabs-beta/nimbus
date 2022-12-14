const { STSClient, AssumeRoleCommand } = require("@aws-sdk/client-sts");
require('dotenv').config();

const credentials = {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  };

const region = process.env.AWS_REGION;

// Create Amazon Cloudwatch Logs service client object
const client = new STSClient({ region, credentials });

// Establish relationship between Nimbus AWS account and client's account
// Grab the client's credentials
// This F(n) is used when grabbing information from Lambda, Gateway, etc
const getCredentials = async (req, res, next) => {
  const roleDetails = {
    // This is hardcoded for now, should be input field from FrontEnd *******
    RoleArn: 'arn:aws:iam::588640996282:role/NimbusDelegationRole',
    RoleSessionName: 'NimbusSession'
  };

  try {
    const assumedRole = await client.send(new AssumeRoleCommand(roleDetails));
    const accessKeyId = assumedRole.Credentials.AccessKeyId;
    const secretAccessKey = assumedRole.Credentials.SecretAccessKey;
    const sessionToken = assumedRole.Credentials.SessionToken;
    const expiration = assumedRole.Credentials.Expiration;
    res.locals.credentials = { accessKeyId, secretAccessKey, sessionToken, expiration };
    res.locals.arnValidation = {validated: true};
    return next();
    console.log(assumedRole);
  } catch (err) { 
    console.log(err);
    // If the ARN user input is invalid, send info to front end so that field will be highlighted red
    res.locals.arnValidation = {validated: false};
   return next(err);
  }

module.exports = getCredentials;
