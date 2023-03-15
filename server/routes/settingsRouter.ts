const express = require('express') ;
const router = express.Router();
import { Request, Response } from 'express';
import credentialsController from '../controllers/aws/credentialsController';
import userController from '../controllers/userController';


//Handles GET/POST requests to the Settings Tab
router.get('/userDetails', userController.getUser, (req: Request, res: Response) => {
    return res.status(200).json(res.locals.user);
});

router.post('/updateProfile', credentialsController.getCredentials, userController.updateUserProfile, (req: Request, res: Response) => {
    return res.status(200).json(res.locals.user);
});

router.post('/updatePassword', userController.updateUserPassword, (req: Request, res: Response) => {
    return res.status(200).json(res.locals.success);
});


module.exports = router;