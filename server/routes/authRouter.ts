const express = require('express') 
// import Request and Response types from express library
import { Request, Response } from 'express'
const userController = require('../controllers/userController')
const authController = require('../controllers/authController')
// Give our express app the ability define routes, handle requests, and configure the router by creating an instance of an Express Router
const router = express.Router()

// handle post requests sent to /login endpoint from the client 
router.post('/login', userController.verifyUser, authController.generateJWT, (req: Request, res: Response) => {
    // Redirect to the dashboard here? What do we want to send to the front end
    // if (res.locals.email === false) res.redirect('/signup');
    // what should happen here on successful log in?
    // else res.redirect('/dashboard');
    return res.status(200).send({
        email: res.locals.email,
        success: true,
        accessToken: res.locals.accessToken,
        refreshToken: res.locals.refreshToken
    });
})

// userController.assignJWT, 
// Handle post request sent to /signup endpoint
router.post('/register', userController.createUser, (req: Request, res: Response) => {
    // Redirect to the dashboard here? What do we want to send to the front end
    return res.status(200).json(res.locals.user)
})

router.get('/verifyToken', authController.verifyToken, (req: Request, res: Response) => {
    return res.status(200).json({
        token: res.locals.token
    })
})

module.exports = router