// routes/dynamoDBRoutes.js

const express = require('express');
const router = express.Router();
const dynamoDBController = require('../controllers/dynamoDBController');

router.get('/test', dynamoDBController.testDynamoDB);

module.exports = router;
