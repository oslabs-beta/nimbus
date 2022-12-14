"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// require in express 
const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();
// handle login endpoint
router.post('/login', userController.verifyUser, (req, res) => {
    // Redirect to the dashboard here? What do we want to send to the front end
    // if (res.locals.email === false) res.redirect('/signup');
    // what should happen here on successful log in?
    // else res.redirect('/dashboard');
    return res.status(200).send({ email: res.locals.email, success: true });
});
// Handle signup endpoint
router.post('/signup', userController.signupUser, (req, res) => {
    // Redirect to the dashboard here? What do we want to send to the front end
    return res.status(200);
});
module.exports = router;
