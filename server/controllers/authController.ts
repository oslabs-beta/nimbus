import { Request, Response, NextFunction } from "express";
const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;
const jwt = require('jsonwebtoken')
require('dotenv').config();
const User = require('../models/userModel')

type authController = {
  verifyToken: (req: getUserToken, res: Response, next: NextFunction) => Promise<void>;
  generateJWT: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}

// Created an interface for verifyToken to store the token into the request
interface getUserToken extends Request {
  token: string;
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
      console.log(accessToken, "ACCESS TOKEN");
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

  async verifyToken (req, res, next) {
    try {
      const { authorization } = req.headers
      // token should be BEARER TOKEN NUMBER so we want to split bearer and token number and take the token if it exists in our req.headers
      const token = authorization
      if (token !== undefined) {
        req.token = token;
      } else {
        return next({
          log: "Error caught in userController.verifyJWT middleware function",
          status: 500,
          message: {err: `Error idenfying JWT`}
        })
      }
      const user = jwt.verify(token, ACCESS_TOKEN_SECRET)
      if (user) {
        const userWithRefreshToken = await User.findOne({refreshToken: res.locals.refreshToken})
        if (userWithRefreshToken) {
          // JWT SIGN NOT WORKING
          const newAccessToken = jwt.sign(userWithRefreshToken, ACCESS_TOKEN_SECRET, { expiresIn: '30s'})
          res.locals.accessToken = newAccessToken;
        }
      }
      return next();
    } catch (err) {
      return next({
        log: "Error caught in userController.verifyJWT middleware function",
        status: 500,
        message: {err: `Error verifying JWT`}
      })
    }
  } 
}

module.exports = authController;