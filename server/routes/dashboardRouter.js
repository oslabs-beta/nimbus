"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
// Give our express app the ability define routes, handle requests, and configure the router by creating an instance of an Express Router
const router = express.Router();
router.post('/home', (req, res) => {
    return res.status(200).send();
});
router.post('/functions');
router.post('/getlogs');
router.post('/getmetrics');
router.post('/apis');
router.post('/settings');
