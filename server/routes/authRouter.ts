const express = require('express');
const path = require('path');
import { Request, Response } from 'express'
import userController from '../controllers/userController'
import credentialsController from '../controllers/aws/credentialsController'
import authController from '../controllers/authController'
import metricsController  from '../controllers/aws/metricsController'
const router = express.Router();

// Handle post requests sent to /login endpoint from the client 
router.post('/login', userController.verifyUser, authController.generateJWT, (req: Request, res: Response) => {
    return res.status(200).send({
        email: res.locals.email,
        success: res.locals.success,
        accessToken: res.locals.accessToken,
    });   
});

// Handle post requests sent to /signup endpoint
router.post('/register', credentialsController.getCredentials, userController.createUser, authController.generateJWT, (req: Request, res: Response) => {
    return res.status(200).json({
        accessToken: res.locals.accessToken,
    })
});

router.get('/verifyToken', authController.verifyToken, (req: Request, res: Response) => {
    return res.status(200).json({
        message: res.locals.accessToken ? 'YOU ARE AUTHENTICATED' : 'NOT AUTHENTICATED',
        accessToken: res.locals.accessToken,
    });
});

router.get('/logout', authController.removeToken, (req: Request, res: Response) => {
    return res.status(200).json({
        message: 'YOU ARE LOGGED OUT'
    });
});

module.exports = router;
