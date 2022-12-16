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
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const jwt = require('jsonwebtoken');
require('dotenv').config();
const userController = {
    verifyUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            try {
                // find user with input email from database
                const user = yield User.findOne({ email });
                if (!user) {
                    return next({
                        log: "Error caught in userController.verifyUser middleware function",
                        status: 500,
                        message: { err: 'User not in database' }
                    });
                }
                // if user exists, compare password from client with password in database
                const isValid = yield bcrypt.compare(password, user.password);
                if (!isValid) {
                    return next({
                        log: "Error caught in userController.verifyUser middleware function",
                        status: 500,
                        message: { err: 'Wrong password' }
                    });
                }
                res.locals.email = email;
                return next();
                // all other errors, invoke global error handler
            }
            catch (err) {
                return next({
                    log: "Error caught in userController.verifyUser middleware function",
                    status: 500,
                    message: { err: `Error logging in` }
                });
            }
        });
    },
    createUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, firstName, lastName, password, confirmation, arn, region } = req.body;
            const { arnValidation } = res.locals;
            console.log(arn, arnValidation);
            // Declare an array to store errors
            const errors = [];
            // Validate email:
            if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email) === false) {
                errors.push("email");
            }
            // Check if input fields are empty
            for (const key in req.body) {
                if (req.body[key].length === 0) {
                    errors.push(key);
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
                    log: "Error caught in userController.signupUser middleware function",
                    status: 500,
                    message: { errMessage: `Error found in user input`, errors: errors }
                });
            }
            try {
                const hashedPass = yield bcrypt.hash(password, SALT_WORK_FACTOR);
                // create a new user in database with hashedPass as password
                const user = yield User.create({
                    firstName,
                    lastName,
                    email,
                    password: hashedPass,
                    arn,
                    region
                });
                console.log(user);
                res.locals.user = user;
                return next();
            }
            catch (err) {
                return next({
                    log: "Error caught in userController.signupUser middleware function",
                    status: 500,
                    message: { errMessage: `Error inserting user to database`, errors: errors }
                });
            }
        });
    },
    generateJWT(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Grab user from database
                const user = User.findOne({
                    email: req.body.email
                });
                const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '365d' });
                res.locals.token = accessToken;
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
};
exports.default = userController;
