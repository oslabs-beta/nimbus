const express = require('express') 
import { Request, Response } from 'express'
import apiController from '../controllers/aws/apiController';
const router = express.Router()
const authController = require('../controllers/authController');
import credentialsController from '../controllers/aws/credentialsController';
import lambdaController from '../controllers/aws/lambdaController';
import logsController from '../controllers/aws/logsController';


// All routes verify JWT Token to get email
    // Email is used to query the database for ARN
    // ARN is used to get credentials from client's AWS account
    // Credentials used to grab matrics

// router.post('/home', authController.verifyToken, credentialsController.getCredentialsFromDB, (req: Request, res: Response) => {
//     return res.status(200).json();
// });

router.post('/functions', authController.verifyToken, credentialsController.getCredentialsFromDB, lambdaController.getFunctions,  (req: Request, res: Response) => {
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

router.post('/apiRelations', credentialsController.getCredentialsFromDB, lambdaController.getFunctions, apiController.getAPIRelations, (req: Request, res: Response) => {
    return res.status(200).json({
        apiRelations: res.locals.apiRelations
    });
});


// router.post('/settings', authController.verifyToken, (req: Request, res: Response) => {
//     return res.status(200).json();
// });

module.exports = router