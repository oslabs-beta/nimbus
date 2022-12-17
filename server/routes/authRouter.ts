const express = require('express') 
const path = require('path')
// import Request and Response types from express library
import { Request, Response } from 'express'
import userController from '../controllers/userController'
import credentialsController from '../controllers/aws/credentialsController'
const authController = require('../controllers/authController')
// Give our express app the ability define routes, handle requests, and configure the router by creating an instance of an Express Router
const router = express.Router()

// handle post requests sent to /login endpoint from the client 
router.post('/login', userController.verifyUser, authController.generateJWT, (req: Request, res: Response) => {
    return res.status(200).send({
        email: res.locals.email,
        success: res.locals.success,
        accessToken: res.locals.accessToken,
        refreshToken: res.locals.refreshToken
    });
})

// Handle post request sent to /signup endpoint
router.post('/register', credentialsController.getCredentials, userController.createUser, authController.generateJWT, (req: Request, res: Response) => {
    // Redirect to the dashboard here? What do we want to send to the front end
    return res.status(200).json({
        accessToken: res.locals.accessToken,
        refreshToken: res.locals.refreshToken
    })
})

// MUST USE FOR EVERY ROUTE: authController.verifyToken adds user's email to res.locals
router.get('/verifyToken', authController.verifyToken, (req: Request, res: Response) => {
    return res.status(200).json({
        message: res.locals.accessToken ? 'YOU ARE AUTHENTICATED' : 'NOT AUTHENTICATED',
        accessToken: res.locals.accessToken,
    });
})

module.exports = router