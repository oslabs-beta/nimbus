import { Request, Response, NextFunction } from "express";
const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;
const jwt = require('jsonwebtoken')
require('dotenv').config();
const User = require('../models/userModel')

type authController = {
  verifyToken: (req: Request, res: Response, next: NextFunction) => Promise<void>;
  generateJWT: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}

const authController: authController = {
  async generateJWT (req, res, next) {
    try {
      const { email } = req.body;
      // Grab user from database
      const { firstName, lastName } = await User.findOne({ email })
      res.locals.user = {
        firstName,
        lastName,
        email
      }
      const accessToken = jwt.sign(res.locals.user, ACCESS_TOKEN_SECRET, { expiresIn: '30s'})
      const refreshToken = jwt.sign(res.locals.user, REFRESH_TOKEN_SECRET)
      res.locals.accessToken = accessToken;
      res.locals.refreshToken = refreshToken;
      await User.findOneAndUpdate(
        { email }, 
        { refreshToken },
        { upsert: true }
      )
      return next();
    } catch (err) {
      return next({
        log: "Error caught in userController.generateJWT middleware function",
        status: 500,
        message: {err: `Error generating JWT for user`}
      })
    }
  },

  async verifyToken (req, res, next):Promise<any> {
    try {
      const { authorization } = req.headers
      // token should be BEARER TOKEN NUMBER so we want to split bearer and token number and take the token if it exists in our req.headers
      const token = authorization && authorization.split(' ')[1]
      if (token === null) {
        console.log("TOKEN NOT FOUND")
        // Should we redirect back to the login page?
        return res.sendStatus(400).json({ message: 'Token no longer valid' })
      }
      // Figure out what jwt.verify returns
      console.log("BEFORE JWT VERIFY")
      // THE ISSUE IS HERE INVOKING MY GLOBAL ERROR HANDLER IF I DON'T USE THE CALLBACK FUNCTION
      await jwt.verify(token, ACCESS_TOKEN_SECRET, async (err: Error, user: {}) => {
        if (err) {
          const user = await User.findOne({refreshToken: res.locals.refreshToken})
          if (user) {
            console.log(res.locals.user, "USER");
            const accessToken = await jwt.sign(res.locals.user, ACCESS_TOKEN_SECRET, {expiresIn: '30s'})
            res.locals.accessToken = accessToken;
            console.log(accessToken, "ACCESS TOKEN")
            return next();
          }
        }
      })
      // If the request body doesn't have a token (expired)
      const refreshToken = req.body.token;
      // if (refreshToken) {
      //   const accessToken = await jwt.sign(user, ACCESS_TOKEN_SECRET, {expiresIn: '30s'})
      //   res.locals.token = accessToken;
      // }
      return next();
    } catch (err) {
      return next({
        log: "Error caught in userController.verifyJWT middleware function",
        status: 500,
        message: {err: `Error verifying JWT`}
      })
    }
  } 
  // async verifyToken (req, res, next):Promise<any> {
  //   const { refreshToken } = req.body;
  //   if (refreshToken === null) return res.sendStatus(404);
  //   const userRT = await User.findOne({ refreshToken })
  //   if (!userRT) return res.sendStatus(404);
  //   const user = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET)
  //   if (!user) return res.sendStatus(404)
  //   const accessToken = jwt.sign(res.locals.user, ACCESS_TOKEN_SECRET, {expiresIn: '15s'})
  //   res.locals.accessToken = accessToken;
  //   return next();
  // }
}

module.exports = authController;