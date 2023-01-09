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
Object.defineProperty(exports, "__esModule", { value: true });
const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;
const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../models/userModel');
const authController = {
    generateJWT(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email } = req.body;
                // Grab user from database
                res.locals.user = {
                    email
                };
                // Generate an access and refresh token for user
                const accessToken = jwt.sign(res.locals.user, ACCESS_TOKEN_SECRET, { expiresIn: '10s' });
                const refreshToken = jwt.sign(res.locals.user, REFRESH_TOKEN_SECRET);
                // Store refresh token in cookies
                res.cookie('refreshToken', refreshToken, { secure: true, httpOnly: true, sameSite: 'strict' });
                console.log('refresh token stored in cookies', refreshToken);
                res.locals.accessToken = accessToken;
                // res.locals.refreshToken = refreshToken; 
                return next();
            }
            catch (err) {
                return next({
                    log: "Error caught in userController.generateJWT middleware function",
                    status: 500,
                    message: { err: `Error generating JWT for user` }
                });
            }
        });
    },
    verifyToken(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { authorization } = req.headers;
            // Token should be 'BEARER TOKEN NUMBER' so slice the string to grab only the token number
            const token = authorization && authorization.slice(7);
            // Check if user has an access token
            if (token) {
                // Verify if token is valid
                let user;
                try {
                    user = jwt.verify(token, ACCESS_TOKEN_SECRET);
                }
                catch (err) {
                    console.log(err);
                }
                if (user) {
                    res.locals.accessToken = token;
                    res.locals.email = user.email;
                }
                else {
                    // If the user's token was not verified, check for refresh token
                    // const { refresh } = req.headers;
                    const refreshToken = req.cookies.refreshToken;
                    console.log('obtained refresh token stored in cookies', refreshToken);
                    // const refreshToken = refresh && refresh.slice(7);
                    try {
                        // Verify if user's refresh token is valid
                        const user = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);
                        if (user) {
                            // Generate new access token
                            user.iat = Date.now();
                            const newAccessToken = jwt.sign(user, ACCESS_TOKEN_SECRET, { expiresIn: '10s' });
                            res.locals.accessToken = newAccessToken;
                            res.locals.email = user.email;
                        }
                    }
                    catch (err) {
                        console.log(err);
                    }
                }
            }
            return next();
        });
    }
};
exports.default = authController;
