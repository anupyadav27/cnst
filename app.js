// app.js

require('dotenv').config(); // Load environment variables from .env file

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
// Example route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Import and use your routes
// const securityHubRoutes = require('./routes/securityHubRoutes');
// app.use('/api/v1/security-hub', securityHubRoutes);

// Start the server and listen on all network interfaces
app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port ${port}`);
});
