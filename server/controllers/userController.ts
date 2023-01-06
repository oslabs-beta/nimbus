// import built-in Request, Response and NextFunction types from express module
import { Request, Response, NextFunction } from "express";
import { nextTick } from "process";
import User from '../models/userModel';
const bcrypt = require('bcrypt')
const SALT_WORK_FACTOR = 10;
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const jwt = require('jsonwebtoken')
import * as dotenv from "dotenv";
require('dotenv').config();

// create a usercontroller type
type userController = {
    verifyUser: (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
    createUser: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getUser: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    updateUserProfile: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    updateUserPassword: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}

const userController: userController = {
  async verifyUser(req, res, next) {
    const { email, password } = req.body;

    try {
      // find user with input email from database
      const user: any = await User.findOne({email})
      
      if (!user) {
          return next({
            log: "Error caught in userController.verifyUser middleware function",
            status: 500,
            message: {err: 'User not in database'}
          });
      }
      // if user exists, compare password from client with password in database
      const isValid: any = await bcrypt.compare(password, user.password)

      if (!isValid) {
        return next({
          log: "Error caught in userController.verifyUser middleware function",
          status: 500,
          message: {err: 'Wrong password'}
        });
      } 
      res.locals.email = email;
      return next(); 
      // all other errors, invoke global error handler
    } catch (err) {
      return next({
        log: "Error caught in userController.verifyUser middleware function",
        status: 500,
        message: {err: `Error logging in`}
      })
    }
},

 async createUser (req, res, next) {
    const { email, firstName, lastName, password, confirmation, arn, region } = req.body;
    const { arnValidation } = res.locals;
    console.log(arn, arnValidation);
    // Declare an array to store errors
    const errors: Array<"email" | "firstName" | "lastName" | "password" | "confirmation" | "arn" | "region"> = [];
    
    // Validate email:
    if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email) === false) {
      errors.push("email");
    }
    type KeyType = "email" | "firstName" | "lastName" | "password" | "confirmation" | "arn" | "region";
    // Check if input fields are empty
    for (const key in req.body) {
      if (req.body[key as KeyType].length === 0) {
        errors.push(key as KeyType);
      }
     }
    // Check if password matches confirmation
    if (password !== confirmation) {
      errors.push("password", "confirmation");
    }

    //Check if arn is validated
    if (!arnValidation.validated) {
      errors.push("arn");
    }

    // Send back errors
    if (errors.length > 0) {
      // res.locals.errors = errors;
      return next({
        log: "Error caught in userController.createUser middleware function",
        status: 500,
        message: {errMessage: `Error found in user input`, errors: errors}
      })
    }
    try {
      const hashedPass = await bcrypt.hash(password, SALT_WORK_FACTOR);
      // create a new user in database with hashedPass as password
      const user = await User.create({
          firstName,
          lastName,
          email,
          password: hashedPass,
          arn,
          region
      })
      console.log(user);
      res.locals.user = user;
      return next();
    } catch (err) {
      return next({
        log: "Error caught in userController.signupUser middleware function",
        status: 500,
        message: {errMessage: `Error inserting user to database`, errors: errors}
      })
    }
  },

  async getUser(req, res, next) {
    const { email } = res.locals;
    const user: any = await User.findOne({email});
    res.locals.user = {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      arn: user.arn,
      region: user.region
    }
    return next();
  },

  async updateUserProfile(req, res, next) {
    const originalEmail = res.locals.email;
    const { firstName, lastName, arn, region } = req.body;
    const { arnValidation } = res.locals;
    console.log(arn, arnValidation);
    // Declare an array to store errors
    const errors: Array<"firstName" | "lastName" | "arn" | "region"> = [];
    
    type KeyType = "firstName" | "lastName" | "arn" | "region";

    // Check if input fields are empty
    for (const key in req.body) {
      if (req.body[key as KeyType].length === 0) {
        errors.push(key as KeyType);
      }
    }

    //Check if arn is validated
    if (!arnValidation.validated) {
      errors.push("arn");
    }

    // Send back errors
    if (errors.length > 0) {
      // res.locals.errors = errors;
      return next({
        log: "Error caught in userController.createUser middleware function",
        status: 500,
        message: {errMessage: `Error found in user input`, errors: errors}
      })
    }
    try {
      // create a new user in database with hashedPass as password
      const updatedUser = await User.findOneAndUpdate({
          email: originalEmail
      },
      {
        firstName,
        lastName,
        arn,
        region
      }, 
      {
        new: true
      })
      console.log(updatedUser);
      res.locals.user = updatedUser;
      return next();
    } catch (err) {
      return next({
        log: "Error caught in userController.updateUserProfile middleware function",
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

    type KeyType = "password" | "confirmation" ;

    // Check if input fields are empty
    for (const key in req.body) {
      if (req.body[key as KeyType].length === 0) {
        errors.push(key as KeyType);
      }
     }
    // Check if password matches confirmation
    if (password !== confirmation) {
      errors.push("password", "confirmation");
    }

    // Send back errors
    if (errors.length > 0) {
      // res.locals.errors = errors;
      return next({
        log: "Error caught in userController.createUser middleware function",
        status: 500,
        message: {errMessage: `Error found in user input`, errors: errors}
      })
    }
    try {
      const hashedPass = await bcrypt.hash(password, SALT_WORK_FACTOR);
      // create a new user in database with hashedPass as password
      const updatedUser = await User.findOneAndUpdate({
          email: originalEmail
      },
      {
        password: hashedPass,
      }, 
      {
        new: true
      })
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
