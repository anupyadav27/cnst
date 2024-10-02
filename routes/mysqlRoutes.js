// routes/mysqlRoutes.js

const express = require('express');
const router = express.Router();
const mysqlController = require('../controllers/mysqlController');

router.get('/test', mysqlController.testMySQL);

module.exports = router;
