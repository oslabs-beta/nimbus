const express = require('express') 
import { Request, Response } from 'express'
import apiController from '../controllers/aws/apiController';
const router = express.Router()
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
    // Credentials used to grab matrics

router.get('/allMetrics', 
    authController.verifyToken, 
    credentialsController.getCredentialsFromDB, 
    metricsController.getAllMetrics, 
    lambdaController.getFunctions,
    metricsController.getMetricsByFunc, 
    metricsController.getCostProps,
    (req: Request, res: Response) => {
        return res.status(200).json({
            allFuncMetrics: res.locals.allFuncMetrics,
            cost: res.locals.cost
        });
});

router.get('/funcmetrics', 
    authController.verifyToken, 
    credentialsController.getCredentialsFromDB, 
    lambdaController.getFunctions, 
    metricsController.getMetricsByFunc, 
    (req: Request, res: Response) => {
        return res.status(200).json({
            eachFuncMetrics: res.locals.eachFuncMetrics,
        });
});

router.get('/functions', 
    authController.verifyToken, 
    credentialsController.getCredentialsFromDB, 
    lambdaController.getFunctions, 
    // metricsController.getMetricsByFunc, 
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

router.post('/apiRelations', authController.verifyToken, credentialsController.getCredentialsFromDB, lambdaController.getFunctions, apiController.getAPIRelations, (req: Request, res: Response) => {
    return res.status(200).json({
        apiRelations: res.locals.apiRelations
    });
});


router.get('/apiList', authController.verifyToken, credentialsController.getCredentialsFromDB, apiController.getAPIList, (req: Request, res: Response) => {
    return res.status(200).json({
        apiList: res.locals.apiList
    });
});

// body: period
router.get('/apiMetrics', 
    authController.verifyToken, 
    credentialsController.getCredentialsFromDB, 
    apiController.getAPIList, 
    apiMetricsController.getAPIMetrics, 
    (req: Request, res: Response) => {
        return res.status(200).json({
            allApiMetrics: res.locals.allApiMetrics
        });
});



router.get('/apiList', authController.verifyToken, credentialsController.getCredentialsFromDB, apiController.getAPIList, (req: Request, res: Response) => {
    return res.status(200).json({
        apiList: res.locals.apiList
    });
});

// // body: period
// router.get('/apiMetrics', 
//     authController.verifyToken, 
//     credentialsController.getCredentialsFromDB, 
//     apiController.getAPIList, 
//     apiMetricsController.getAPIMetrics, 
//     (req: Request, res: Response) => {
//         return res.status(200).json({
//             allApiMetrics: res.locals.allApiMetrics
//         });
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