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
const userController = {
    verifyUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // extract email and password from requeset body
            const { email, password } = req.body;
            try {
                // find user with input email from database
                const user = yield User.findOne({ email });
                // if user does not exist 
                if (!user) {
                    // go to next callback in auth router
                    return next({
                        log: "Error caught in userController.verifyUser middleware function",
                        status: 500,
                        message: { err: 'User not in database' }
                    });
                }
                // if user exists, compare password from client with password in database
                const isValid = yield bcrypt.compare(password, user.password);
                // if password exists, persists signedIn to be true
                if (!isValid) {
                    // go to next callback in auth router
                    return next({
                        log: "Error caught in userController.verifyUser middleware function",
                        status: 500,
                        message: { err: 'Wrong password' }
                    });
                    // if password does not exist, send an error message
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
            // extract out properties needed to sign up user 
            const { email, firstName, lastName, password, confirmPassword } = req.body;
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
            if (password !== confirmPassword) {
                errors.push("password", "confirmation");
            }
            // Send back errors
            if (errors.length > 0) {
                res.locals.errors = errors;
                return next({ err: "errors found in form inputs" });
            }
            try {
                // bcrypt.hash returns a promise that will resolve to a string containing the hashed password.
                const hashedPass = yield bcrypt.hash(password, SALT_WORK_FACTOR);
                // create a new user in database with hashedPass as password
                User.create({
                    email,
                    firstName,
                    lastName,
                    password: hashedPass
                });
                return next();
            }
            catch (err) {
                return next({
                    log: "Error caught in userController.signupUser middleware function",
                    status: 500,
                    message: { err: `Error inserting user to database` }
                });
            }
        });
    },
    assignJWT(res, req, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.body;
                const token = jwt.sign(id, ACCESS_TOKEN_SECRET, {
                    expiresIn: 
                });
            }
            catch (err) {
                return next({
                    log: "Error caught in userController.assignJWT middleware function",
                    status: 500,
                    message: { err: `Error assigning JWT to user` }
                });
            }
        });
    },
    verifyJWT(res, req, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // VERIFY THAT THE TOKEN IS IN THE REQ HEADERS
                const token = req.headers['x-access-token'];
                return next();
            }
            catch (err) {
                return next({
                    log: "Error caught in userController.verifyJWT middleware function",
                    status: 500,
                    message: { err: `Error verifying JWT` }
                });
            }
        });
    }
};
// Send signup information to database
// userController.createUser = 
