"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const userController_1 = __importDefault(require("../controllers/userController"));
const credentialsController_1 = __importDefault(require("../controllers/aws/credentialsController"));
// Give our express app the ability define routes, handle requests, and configure the router by creating an instance of an Express Router
const router = express.Router();
// handle post requests sent to /login endpoint from the client 
router.post('/login', userController_1.default.verifyUser, (req, res) => {
    // Redirect to the dashboard here? What do we want to send to the front end
    // if (res.locals.email === false) res.redirect('/signup');
    // what should happen here on successful log in?
    // else res.redirect('/dashboard');
    return res.status(200).send({
        email: res.locals.email,
        success: true,
        token: res.locals.token
    });
});
// userController.assignJWT, 
// Handle post request sent to /signup endpoint
router.post('/register', credentialsController_1.default.getCredentials, userController_1.default.createUser, (req, res) => {
    // Redirect to the dashboard here? What do we want to send to the front end
    return res.status(200).json(res.locals.user);
});
module.exports = router;
