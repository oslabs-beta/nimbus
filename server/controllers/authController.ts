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
      res.locals.user = {
        email
      }
      // Generate an access and refresh token for user
      const accessToken = jwt.sign(res.locals.user, ACCESS_TOKEN_SECRET, { expiresIn: '10s'})
      const refreshToken = jwt.sign(res.locals.user, REFRESH_TOKEN_SECRET)
      res.locals.accessToken = accessToken;
      res.locals.refreshToken = refreshToken;
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
      const { authorization } = req.headers
      // Token should be 'BEARER TOKEN NUMBER' so slice the string to grab only the token number
      const token = authorization && authorization.slice(7)
      // Check if user has an access token
      if (token) {
        // Verify if token is valid
        let user;
        try {
          user = jwt.verify(token, ACCESS_TOKEN_SECRET)
        } catch (err) {
          console.log(err);
        }
        if (user) {
          res.locals.accessToken = token;
          res.locals.email = user.email
        }
        else {
          // If the user's token was not verified, check for refresh token
          const { refresh } = req.headers
          const refreshToken = refresh && refresh.slice(7);
          try {
            // Verify if user's refresh token is valid
            const user = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);
            if (user) {
              // Generate new access token
              user.iat = Date.now()
              const newAccessToken = jwt.sign(user, ACCESS_TOKEN_SECRET, { expiresIn: '10s'})
              res.locals.accessToken = newAccessToken;
              res.locals.email = user.email
            } 
          } catch (err) {
            console.log(err)
          }
        }
      } 
      return next();
  } 
}

export default authController;