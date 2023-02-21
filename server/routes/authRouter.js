"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const path = require('path');
const userController_1 = __importDefault(require("../controllers/userController"));
const credentialsController_1 = __importDefault(require("../controllers/aws/credentialsController"));
const authController_1 = __importDefault(require("../controllers/authController"));
const router = express.Router();
// Handle post requests sent to /login endpoint from the client 
router.post('/login', userController_1.default.verifyUser, authController_1.default.generateJWT, (req, res) => {
    return res.status(200).send({
        email: res.locals.email,
        success: res.locals.success,
        accessToken: res.locals.accessToken,
    });
});
// Handle post requests sent to /signup endpoint
router.post('/register', credentialsController_1.default.getCredentials, userController_1.default.createUser, authController_1.default.generateJWT, (req, res) => {
    return res.status(200).json({
        accessToken: res.locals.accessToken,
    });
});
router.get('/verifyToken', authController_1.default.verifyToken, (req, res) => {
    return res.status(200).json({
        message: res.locals.accessToken ? 'YOU ARE AUTHENTICATED' : 'NOT AUTHENTICATED',
        accessToken: res.locals.accessToken,
    });
});
module.exports = router;
