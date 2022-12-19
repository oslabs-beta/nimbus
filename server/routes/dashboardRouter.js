"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
<<<<<<< HEAD
const credentialsController = require('../controllers/aws/credentialsController');
const lambdaController = require('../controllers/aws/lambdaController');
const logsController = require('../controllers/aws/logsController');
=======
const credentialsController_1 = __importDefault(require("../controllers/aws/credentialsController"));
const lambdaController_1 = __importDefault(require("../controllers/aws/lambdaController"));
const logsController_1 = __importDefault(require("../controllers/aws/logsController"));
>>>>>>> dev
// All routes verify JWT Token to get email
// Email is used to query the database for ARN
// ARN is used to get credentials from client's AWS account
// Credentials used to grab matrics
<<<<<<< HEAD
router.post('/home', authController.verifyToken, credentialsController.getCredentialsFromDB, (req, res) => {
    return res.status(200).json();
});
router.post('/functions', authController.verifyToken, credentialsController.getCredentialsFromDB, lambdaController.getFunctions, (req, res) => {
    return res.status(200).json({
        functions: res.locals.functions
    });
});
router.post('/allLogs', authController.verifyToken, credentialsController.getCredentialsFromDB, logsController.getAllLogs, (req, res) => {
=======
// router.post('/home', authController.verifyToken, credentialsController.getCredentialsFromDB, (req: Request, res: Response) => {
//     return res.status(200).json();
// });
router.post('/functions', authController.verifyToken, credentialsController_1.default.getCredentialsFromDB, lambdaController_1.default.getFunctions, (req, res) => {
    return res.status(200).json({
        functions: res.locals.functions
    });
});
router.post('/allLogs', authController.verifyToken, credentialsController_1.default.getCredentialsFromDB, logsController_1.default.getAllLogs, (req, res) => {
>>>>>>> dev
    return res.status(200).json({
        logs: res.locals.logs
    });
});
<<<<<<< HEAD
router.post('/filteredLogs', authController.verifyToken, credentialsController.getCredentialsFromDB, logsController.getFilteredLogs, (req, res) => {
=======
router.post('/filteredLogs', authController.verifyToken, credentialsController_1.default.getCredentialsFromDB, logsController_1.default.getFilteredLogs, (req, res) => {
>>>>>>> dev
    return res.status(200).json({
        filteredLogs: res.locals.filteredLogs
    });
});
<<<<<<< HEAD
// Add middleware for API Gateway
router.post('/apis', authController.verifyToken, credentialsController.getArnFromDB, (req, res) => {
    return res.status(200).json();
});
// router.post('/settings', authController.verifyToken, (req: Request, res: Response) => {
//     return res.status(200).json();
// });
=======
// // Add middleware for API Gateway
// router.post('/apis', authController.verifyToken, credentialsController.getArnFromDB, (req: Request, res: Response) => {
//     return res.status(200).json();
// });
// router.post('/settings', authController.verifyToken, (req: Request, res: Response) => {
//     return res.status(200).json();
// });
module.exports = router;
>>>>>>> dev
