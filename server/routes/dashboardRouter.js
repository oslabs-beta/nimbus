"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const router = express.Router();
const authController_1 = __importDefault(require("../controllers/authController"));
const credentialsController_1 = __importDefault(require("../controllers/aws/credentialsController"));
const lambdaController_1 = __importDefault(require("../controllers/aws/lambdaController"));
const logsController_1 = __importDefault(require("../controllers/aws/logsController"));
const metricsController_1 = __importDefault(require("../controllers/aws/metricsController"));
// All routes verify JWT Token to get email
// Email is used to query the database for ARN
// ARN is used to get credentials from client's AWS account
// Credentials used to grab matrics
router.get('/allMetrics', authController_1.default.verifyToken, credentialsController_1.default.getCredentialsFromDB, metricsController_1.default.getAllMetrics, (req, res) => {
    return res.status(200).json({
        metrics: res.locals.metrics,
    });
});
router.post('/metricsByFunc', authController_1.default.verifyToken, credentialsController_1.default.getCredentialsFromDB, lambdaController_1.default.getFunctions, metricsController_1.default.getMetricsByFunc, (req, res) => {
    return res.status(200).json({
        metric: res.locals.metric,
    });
});
router.get('/functions', authController_1.default.verifyToken, credentialsController_1.default.getCredentialsFromDB, lambdaController_1.default.getFunctions, (req, res) => {
    return res.status(200).json({
        functions: res.locals.functions
    });
});
router.post('/allLogs', authController_1.default.verifyToken, credentialsController_1.default.getCredentialsFromDB, logsController_1.default.getAllLogs, (req, res) => {
    return res.status(200).json({
        logs: res.locals.logs
    });
});
router.post('/filteredLogs', authController_1.default.verifyToken, credentialsController_1.default.getCredentialsFromDB, logsController_1.default.getFilteredLogs, (req, res) => {
    return res.status(200).json({
        filteredLogs: res.locals.filteredLogs
    });
});
// // Add middleware for API Gateway
// router.post('/apis', authController.verifyToken, credentialsController.getArnFromDB, (req: Request, res: Response) => {
//     return res.status(200).json();
// });
// router.post('/settings', authController.verifyToken, (req: Request, res: Response) => {
//     return res.status(200).json();
// });
module.exports = router;
