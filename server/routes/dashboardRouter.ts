const express = require('express') 
import { Request, Response } from 'express'
const router = express.Router()
import authController from '../controllers/authController';
import credentialsController from '../controllers/aws/credentialsController';
import lambdaController from '../controllers/aws/lambdaController';
import logsController from '../controllers/aws/logsController';
import metricsController from '../controllers/aws/metricsController';
import userController from '../controllers/userController';

// All routes verify JWT Token to get email
    // Email is used to query the database for ARN
    // ARN is used to get credentials from client's AWS account
    // Credentials used to grab matrics

router.get('/allMetrics', 
    authController.verifyToken, 
    credentialsController.getCredentialsFromDB, 
    metricsController.getAllMetrics, 
    (req: Request, res: Response) => {
        return res.status(200).json({
            metrics: res.locals.metrics,
        });
});

router.post('/metricsByFunc', 
    authController.verifyToken, 
    credentialsController.getCredentialsFromDB, 
    lambdaController.getFunctions, 
    metricsController.getMetricsByFunc, 
    (req: Request, res: Response) => {
        return res.status(200).json({
            metrics: res.locals.metrics,
        });
});

router.get('/functions', 
    authController.verifyToken, 
    credentialsController.getCredentialsFromDB, 
    lambdaController.getFunctions, 
    (req: Request, res: Response) => {
        return res.status(200).json({
            functions: res.locals.functions
        });
});

router.post('/allLogs', authController.verifyToken, credentialsController.getCredentialsFromDB, logsController.getAllLogs, (req: Request, res: Response) => {
    return res.status(200).json({
        logs: res.locals.logs
    });
});

router.post('/filteredLogs', authController.verifyToken, credentialsController.getCredentialsFromDB, logsController.getFilteredLogs, (req: Request, res: Response) => {
    return res.status(200).json({
        filteredLogs: res.locals.filteredLogs
    });
});

// // Add middleware for API Gateway
// router.post('/apis', authController.verifyToken, credentialsController.getArnFromDB, (req: Request, res: Response) => {
//     return res.status(200).json();
// });

//Settings
router.get('/userDetails', authController.verifyToken, userController.getUser, (req: Request, res: Response) => {
    return res.status(200).json(res.locals.user);
});

router.post('/updateProfile', authController.verifyToken, credentialsController.getCredentials, userController.updateUserProfile, (req: Request, res: Response) => {
    return res.status(200).json(res.locals.user);
});

router.post('/updatePassword', authController.verifyToken, userController.updateUserPassword, (req: Request, res: Response) => {
    return res.status(200).json(res.locals.success);
});

module.exports = router