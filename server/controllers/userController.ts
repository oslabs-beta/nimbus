// import built-in Request, Response and NextFunction types from express module
import { Request, Response, NextFunction } from "express";
import { nextTick } from "process";
const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const SALT_WORK_FACTOR = 10;
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const jwt = require('jsonwebtoken')
require('dotenv').config();

// create a usercontroller type
type userController = {
    verifyUser: (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
    createUser: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    generateJWT: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}

const userController: userController = {

  async verifyUser(req, res, next) {
    const {email, password} = req.body
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
      res.locals.email = email
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
    const { email, firstName, lastName, password, confirmation } = req.body;
    // Declare an array to store errors
    const errors: Array<"email" | "firstName" | "lastName" | "password" | "confirmation"> = [];
    
    // Validate email:
    if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email) === false) {
      errors.push("email");
    }
    type KeyType = "email" | "firstName" | "lastName" | "password" | "confirmation";
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
        log: "Error caught in userController.signupUser middleware function",
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
          password: hashedPass
      })
      res.locals.user = user;
      return next();

    } catch (err) {
      return next({
        log: "Error caught in userController.signupUser middleware function",
        status: 500,
        message: {err: `Error inserting user to database`}
      })
    }
  },
  
  async generateJWT (req, res, next) {
    try {
      // Grab user from database
      const user = User.findOne({
        email: req.body.email
      })
      const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '365d'})
      res.locals.token = accessToken;
      return next();
    } catch (err) {
      return next({
        log: "Error caught in userController.generateJWT middleware function",
        status: 500,
        message: {err: `Error generating JWT for user`}
      })
    }
  },
};

module.exports = userController;
