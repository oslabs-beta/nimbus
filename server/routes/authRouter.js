"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const path = require('path');
const userController_1 = __importDefault(require("../controllers/userController"));
const credentialsController_1 = __importDefault(require("../controllers/aws/credentialsController"));
const authController = require('../controllers/authController');
const metricsController_1 = __importDefault(require("../controllers/aws/metricsController"));
// Give our express app the ability define routes, handle requests, and configure the router by creating an instance of an Express Router
const router = express.Router();
// handle post requests sent to /login endpoint from the client 
router.post('/login', userController_1.default.verifyUser, metricsController_1.default.getMetricsByFunc, authController.generateJWT, (req, res) => {
    return res.status(200).send({
        email: res.locals.email,
        success: res.locals.success,
        accessToken: res.locals.accessToken,
        refreshToken: res.locals.refreshToken
    });
});
// Handle post request sent to /signup endpoint
router.post('/register', credentialsController_1.default.getCredentials, userController_1.default.createUser, authController.generateJWT, (req, res) => {
    // Redirect to the dashboard here? What do we want to send to the front end
    return res.status(200).json({
        accessToken: res.locals.accessToken,
        refreshToken: res.locals.refreshToken
    });
});
router.get('/verifyToken', authController.verifyToken, (req, res) => {
    return res.status(200).json({
        message: res.locals.accessToken ? 'YOU ARE AUTHENTICATED' : 'NOT AUTHENTICATED',
        accessToken: res.locals.accessToken,
    });
});
module.exports = router;
