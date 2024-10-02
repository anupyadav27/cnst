// routes/dashboardRoutes.js

const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/security-score', authMiddleware.verifyToken, dashboardController.getSecurityScore);

module.exports = router;


// routes/dashboardRoutes.js
console.log('Dashboard Controller:', dashboardController); // Should show the exported functions.
console.log('Auth Middleware:', authMiddleware); // Should show the verifyToken function.
