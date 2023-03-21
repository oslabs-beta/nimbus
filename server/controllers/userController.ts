import { Request, Response, NextFunction } from "express";
import { userController , KeyType, KeyTypeSettings, KeyTypePassword } from '../types';
require('dotenv').config();
const AWS = require('aws-sdk');
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const jwt = require('jsonwebtoken');

AWS.config.update({region: process.env.AWS_REGION});
const dynamodb = new AWS.DynamoDB.DocumentClient(); 

const userController: userController = {

  // Middleware for user login
  async verifyUser(req, res, next) {
    const { email, password } = req.body;

    const params = {
      TableName: process.env.TABLE_NAME,
      Key: {
        'email' : email,
      },
    };

    try {
      const user: any = await dynamodb.get(params).promise();

      // If the user does not exist in the database, invoke global error handler
      if (!user) {
          return next({
            log: "Error caught in userController.verifyUser middleware function",
            status: 500,
            message: {err: 'User not in database'}
          });
      };

      // If user exists with cooresponding email, compare password from client with password in database
      const isValid: boolean = await bcrypt.compare(password, user.Item.password);

      if (!isValid) {
        return next({
          log: "Error caught in userController.verifyUser middleware function",
          status: 500,
          message: {err: 'Wrong password'}
        });
      };

      res.locals.email = email;
      return next(); 
      // All other errors, invoke global error handler
    } catch (err) {
      return next({
        log: "Error caught in userController.verifyUser middleware function",
        status: 500,
        message: {err: `Error logging in`}
      })
    }
},

// Middleware for user registration
 async createUser (req, res, next) {
    const { email, firstName, lastName, password, confirmation, arn, region } = req.body;
    const { arnValidation } = res.locals;

    // Declare an array to store errors
    const errors: Array<"email" | "firstName" | "lastName" | "password" | "confirmation" | "arn" | "region"> = [];
    
    // Validate email:
    if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email) === false) {
      errors.push("email");
    }

    // Check if user left any input fields empty
      // Front end will highlight input fields if errors occur
    for (const key in req.body) {
      if (req.body[key as KeyType].length === 0) errors.push(key as KeyType);
    };

    // Check if password matches confirmation
    if (password !== confirmation) errors.push("password", "confirmation");
  
    // Check if arn is validated
    if (!arnValidation.validated) errors.push("arn");

    // Send errors array to the front end if they exist
    if (errors.length > 0) {
      return next({
        log: "Error caught in userController.createUser middleware function",
        status: 500,
        message: {errMessage: `Error found in user input`, errors: errors}
      })
    };

    // If the registration form was successfully filled out, create a new user in the database
    try {
      const hashedPass = await bcrypt.hash(password, SALT_WORK_FACTOR);

      const params = {
        TableName: process.env.TABLE_NAME,
        Item: {
          'email' : email , 
          'firstName' : firstName , 
          'lastName' : lastName , 
          'password' : hashedPass , 
          'arn' : arn , 
          'region' : region , 
        },
      };

      const user = await dynamodb.put(params).promise();

      res.locals.user = user;
      return next();
      // Invoke global error handler if a DB error occurs
    } catch (err) {
      return next({
        log: "Error caught in userController.signupUser middleware function",
        status: 500,
        message: {errMessage: `Error inserting user to database`, errors: errors}
      })
    }
  },

  // Middleware for grabbing user info on Settings tab
  async getUser(req, res, next) {
    const { email } = res.locals;

    const params = {
      TableName: process.env.TABLE_NAME,
      Key: {
        'email' : email
      },
    };

    const user: any = await dynamodb.get(params).promise();

    res.locals.user = {
      email: user.Item.email,
      firstName: user.Item.firstName,
      lastName: user.Item.lastName,
      arn: user.Item.arn,
      region: user.Item.region
    }
    return next();
  },

  // Middleware for updating user settings
  async updateUserProfile(req, res, next) {
    const originalEmail = res.locals.email;
    const { firstName, lastName, arn, region } = req.body;
    const { arnValidation } = res.locals;
    // Declare an array to store errors
    const errors: Array<"firstName" | "lastName" | "arn" | "region"> = [];
    
    // Check if input fields are empty
    for (const key in req.body) {
      if (req.body[key as KeyTypeSettings].length === 0) errors.push(key as KeyTypeSettings);
    }

    //Check if arn is validated
    if (!arnValidation.validated) errors.push("arn");

    // Send errors array to the front end
    if (errors.length > 0) {
      return next({
        log: "Error caught in userController.updateUserProfile middleware function",
        status: 500,
        message: {errMessage: `Error found in user input`, errors: errors}
      })
    };

    const originalUserParams = {
      TableName: process.env.TABLE_NAME,
      Key: {
        'email' : originalEmail,
      },
    }

    try {
      const params = {
        TableName: process.env.TABLE_NAME,
        Key: {
          'email' : originalEmail
        },
        UpdateExpression: 'set firstName = :value1, lastName = :value2',
        ExpressionAttributeValues: {
          ':value1' : firstName, 
           ':value2' : lastName, 
        },
        ReturnValues: 'ALL_NEW'
      };

      // Update user in database with hashedPass as password
      const updatedUser = await dynamodb.update(params).promise();
      
      res.locals.user = {
        'email' : originalEmail , 
        'firstName' : firstName , 
        'lastName' : lastName , 
        'arn' : arn , 
        'region' : region , 
      };

      return next();
    } catch (err) {
      return next({
        log: "Error caught in userController.updateUserProfile middleware function" + err,
        status: 500,
        message: {errMessage: `Error updating user's profile`, errors: errors}
      })
    }
  },

  async updateUserPassword(req, res, next) {
    const originalEmail = res.locals.email;
    const { password, confirmation } = req.body;
    // Declare an array to store errors
    const errors: Array< "password" | "confirmation" > = [];

    // Check if input fields are empty
    for (const key in req.body) {
      if (req.body[key as KeyTypePassword].length === 0) errors.push(key as KeyTypePassword);
      
     }
    // Check if password matches confirmation
    if (password !== confirmation) errors.push("password", "confirmation");

    // Send errors array back to front end
    if (errors.length > 0) {
      return next({
        log: "Error caught in userController.updateUserPassword middleware function",
        status: 500,
        message: {errMessage: `Error found in user input`, errors: errors}
      })
    };

    try {
      const hashedPass = await bcrypt.hash(password, SALT_WORK_FACTOR);

      const params = {
        TableName: process.env.TABLE_NAME,
        Key: {
          'email' : originalEmail
        },
        UpdateExpression: `set password = :value1`,
        ExpressionAttributeValues: {
          ':value1' : hashedPass
        },
      };

      // create a new user in database with hashedPass as password
      const updatedUser = await dynamodb.update(params).promise();

      res.locals.success = {successMessage: 'Password updated!'};
      return next();
    } catch (err) {
      return next({
        log: "Error caught in userController.updateUserPassword middleware function",
        status: 500,
        message: {errMessage: `Error updating the password`, errors: errors}
      })
    }
  },
};

export default userController;
