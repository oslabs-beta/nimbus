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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import { nextTick } from "process";
const userModel_1 = __importDefault(require("../models/userModel"));
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const jwt = require('jsonwebtoken');
require('dotenv').config();
const userController = {
    // Middleware for user login
    verifyUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            try {
                // Find user with input email from database
                const user = yield userModel_1.default.findOne({ email });
                // If the user does not exist in the database, invoke global error handler
                if (!user) {
                    return next({
                        log: "Error caught in userController.verifyUser middleware function",
                        status: 500,
                        message: { err: 'User not in database' }
                    });
                }
                // If user exists with cooresponding email, compare password from client with password in database
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
                // All other errors, invoke global error handler
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
    // Middleware for user registration
    createUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, firstName, lastName, password, confirmation, arn, region } = req.body;
            const { arnValidation } = res.locals;
            // Declare an array to store errors
            const errors = [];
            // Validate email:
            if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email) === false) {
                errors.push("email");
            }
            // Check if user left any input fields empty
            // Front end will highlight input fields if errors occur
            for (const key in req.body) {
                if (req.body[key].length === 0)
                    errors.push(key);
            }
            ;
            // Check if password matches confirmation
            if (password !== confirmation)
                errors.push("password", "confirmation");
            // Check if arn is validated
            if (!arnValidation.validated)
                errors.push("arn");
            // Send errors array to the front end if they exist
            if (errors.length > 0) {
                return next({
                    log: "Error caught in userController.createUser middleware function",
                    status: 500,
                    message: { errMessage: `Error found in user input`, errors: errors }
                });
            }
            // If the registration form was successfully filled out, create a new user in the database
            try {
                const hashedPass = yield bcrypt.hash(password, SALT_WORK_FACTOR);
                const user = yield userModel_1.default.create({
                    firstName,
                    lastName,
                    email,
                    password: hashedPass,
                    arn,
                    region
                });
                res.locals.user = user;
                return next();
                // Invoke global error handler if a DB error occurs
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
    // Middleware for grabbing user info on Settings tab
    getUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email } = res.locals;
            const user = yield userModel_1.default.findOne({ email });
            res.locals.user = {
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                arn: user.arn,
                region: user.region
            };
            return next();
        });
    },
    // Middleware for updating user settings
    updateUserProfile(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const originalEmail = res.locals.email;
            const { firstName, lastName, arn, region } = req.body;
            const { arnValidation } = res.locals;
            // Declare an array to store errors
            const errors = [];
            // Check if input fields are empty
            for (const key in req.body) {
                if (req.body[key].length === 0)
                    errors.push(key);
            }
            //Check if arn is validated
            if (!arnValidation.validated)
                errors.push("arn");
            // Send errors array to the front end
            if (errors.length > 0) {
                return next({
                    log: "Error caught in userController.createUser middleware function",
                    status: 500,
                    message: { errMessage: `Error found in user input`, errors: errors }
                });
            }
            try {
                // Update user in database with hashedPass as password
                const updatedUser = yield userModel_1.default.findOneAndUpdate({
                    email: originalEmail
                }, {
                    firstName,
                    lastName,
                    arn,
                    region
                }, {
                    new: true
                });
                res.locals.user = updatedUser;
                return next();
            }
            catch (err) {
                return next({
                    log: "Error caught in userController.updateUserProfile middleware function",
                    status: 500,
                    message: { errMessage: `Error updating user's profile`, errors: errors }
                });
            }
        });
    },
    updateUserPassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const originalEmail = res.locals.email;
            const { password, confirmation } = req.body;
            // Declare an array to store errors
            const errors = [];
            // Check if input fields are empty
            for (const key in req.body) {
                if (req.body[key].length === 0)
                    errors.push(key);
            }
            // Check if password matches confirmation
            if (password !== confirmation)
                errors.push("password", "confirmation");
            // Send errors array back to front end
            if (errors.length > 0) {
                return next({
                    log: "Error caught in userController.createUser middleware function",
                    status: 500,
                    message: { errMessage: `Error found in user input`, errors: errors }
                });
            }
            try {
                const hashedPass = yield bcrypt.hash(password, SALT_WORK_FACTOR);
                // create a new user in database with hashedPass as password
                const updatedUser = yield userModel_1.default.findOneAndUpdate({
                    email: originalEmail
                }, {
                    password: hashedPass,
                }, {
                    new: true
                });
                res.locals.success = { successMessage: 'Password updated!' };
                return next();
            }
            catch (err) {
                return next({
                    log: "Error caught in userController.updateUserPassword middleware function",
                    status: 500,
                    message: { errMessage: `Error updating the password`, errors: errors }
                });
            }
        });
    },
};
exports.default = userController;
