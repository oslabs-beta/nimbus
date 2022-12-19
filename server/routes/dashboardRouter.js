"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
// All routes should invoke verifyToken middleware in order to get email
// 2nd middleware should: Query the database for the ARN
// Grab AWS credentials from the ARN
router.post('/home', authController.verifyToken, (req, res) => {
    return res.status(200).send();
});
router.post('/functions', authController.verifyToken, (req, res) => {
    return res.status(200).send();
});
router.post('/logs', authController.verifyToken, (req, res) => {
    return res.status(200).send();
});
router.post('/apis', authController.verifyToken, (req, res) => {
    return res.status(200).send();
});
router.post('/settings', authController.verifyToken, (req, res) => {
    return res.status(200).send();
});
