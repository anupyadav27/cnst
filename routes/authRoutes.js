const express = require('express');
const router = express.Router();

// Example authentication route
router.get('/login', (req, res) => {
  res.send('Login Page');
});

// Export the router
module.exports = router;
