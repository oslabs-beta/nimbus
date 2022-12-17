const express = require('express') 
import { Request, Response } from 'express'
const router = express.Router()
const authController = require('../controllers/authController')


// All routes should invoke verifyToken middleware in order to get email
// 2nd middleware should: Query the database for the ARN
// Grab AWS credentials from the ARN


router.post('/home', authController.verifyToken, (req: Request, res: Response) => {
    return res.status(200).send();
});

router.post('/functions', authController.verifyToken, (req: Request, res: Response) => {
    return res.status(200).send();
});

router.post('/logs', authController.verifyToken, (req: Request, res: Response) => {
    return res.status(200).send();
});

router.post('/apis', authController.verifyToken, (req: Request, res: Response) => {
    return res.status(200).send();
});

router.post('/settings', authController.verifyToken, (req: Request, res: Response) => {
    return res.status(200).send();
});




