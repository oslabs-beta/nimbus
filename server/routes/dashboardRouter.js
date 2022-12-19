"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const credentialsController = require('../controllers/aws/credentialsController');
const lambdaController = require('../controllers/aws/lambdaController');
const logsController = require('../controllers/aws/logsController');
// All routes verify JWT Token to get email
// Email is used to query the database for ARN
// ARN is used to get credentials from client's AWS account
// Credentials used to grab matrics
router.post('/home', authController.verifyToken, credentialsController.getCredentialsFromDB, (req, res) => {
    return res.status(200).json();
});
router.post('/functions', authController.verifyToken, credentialsController.getCredentialsFromDB, lambdaController.getFunctions, (req, res) => {
    return res.status(200).json({
        functions: res.locals.functions
    });
});
router.post('/allLogs', authController.verifyToken, credentialsController.getCredentialsFromDB, logsController.getAllLogs, (req, res) => {
    return res.status(200).json({
        logs: res.locals.logs
    });
});
router.post('/filteredLogs', authController.verifyToken, credentialsController.getCredentialsFromDB, logsController.getFilteredLogs, (req, res) => {
    return res.status(200).json({
        filteredLogs: res.locals.filteredLogs
    });
});
// Add middleware for API Gateway
router.post('/apis', authController.verifyToken, credentialsController.getArnFromDB, (req, res) => {
    return res.status(200).json();
});
// router.post('/settings', authController.verifyToken, (req: Request, res: Response) => {
//     return res.status(200).json();
// });
