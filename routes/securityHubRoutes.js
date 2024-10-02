// routes/securityHubRoutes.js

const express = require('express');
const router = express.Router();
const securityHubController = require('../controllers/securityHubController');

// Define routes
router.get('/findings', securityHubController.getFindings);

module.exports = router;
