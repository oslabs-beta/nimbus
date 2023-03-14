const express = require('express') ;
import { Request, Response } from 'express';
import apiController from '../controllers/aws/apiController';
const router = express.Router();
const settingsRouter = require('./settingsRouter');

import authController from '../controllers/authController';
import credentialsController from '../controllers/aws/credentialsController';
import lambdaController from '../controllers/aws/lambdaController';
import logsController from '../controllers/aws/logsController';
import metricsController from '../controllers/aws/metricsController';
import userController from '../controllers/userController';
import apiMetricsController from '../controllers/aws/apiMetricsController'

// All routes verify JWT Token to get email
    // Email is used to query the database for ARN
    // ARN is used to get credentials from client's AWS account
    // Credentials used to grab metrics

router.use(authController.verifyToken, credentialsController.getCredentialsFromDB);

router.get('/allMetrics', metricsController.getAllMetrics, lambdaController.getFunctions, metricsController.getMetricsByFunc, metricsController.getCostProps, (req: Request, res: Response) => {
    return res.status(200).json({
        allFuncMetrics: res.locals.allFuncMetrics,
        cost: res.locals.cost
    });
});

router.get('/funcmetrics', lambdaController.getFunctions, metricsController.getMetricsByFunc, (req: Request, res: Response) => {
    return res.status(200).json({
        eachFuncMetrics: res.locals.eachFuncMetrics,
    });
});

router.get('/functions', lambdaController.getFunctions, (req: Request, res: Response) => {
    return res.status(200).json({
        functions: res.locals.functions
    });
});

// Handles POST Requests to get Logs for all functions and the ability to filter
router.post('/allLogs', logsController.getAllLogs, (req: Request, res: Response) => {
    return res.status(200).json({
        logs: res.locals.logs
    });
});

router.post('/filteredLogs', logsController.getFilteredLogs, (req: Request, res: Response) => {
    return res.status(200).json({
        filteredLogs: res.locals.filteredLogs
    });
});

// Handles GET/POST Requests to grab API Metrics + Relationships
router.post('/apiRelations', lambdaController.getFunctions, apiController.getAPIRelations, (req: Request, res: Response) => {
    return res.status(200).json({
        apiRelations: res.locals.apiRelations
    });
});


router.get('/apiList', apiController.getAPIList, (req: Request, res: Response) => {
    return res.status(200).json({
        apiList: res.locals.apiList
    });
});

router.get('/apiMetrics', apiController.getAPIList, apiMetricsController.getAPIMetrics, (req: Request, res: Response) => {
    return res.status(200).json({
        allApiMetrics: res.locals.allApiMetrics
    });
});

router.get('/apiList', apiController.getAPIList, (req: Request, res: Response) => {
    return res.status(200).json({
        apiList: res.locals.apiList
    });
});

router.use('/settings', settingsRouter);

module.exports = router;