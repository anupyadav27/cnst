// app.js

// Load environment variables
require('dotenv').config();

// Import Dependencies
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const path = require('path');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const csrf = require('csurf');
const cookieParser = require('cookie-parser');
const cors = require('cors');



// Import Custom Modules
const logger = require('./utils/logger'); // Logger using winston
const sequelize = require('./config/dbConfig'); // Sequelize instance

// Import Routes
const dynamoDBRoutes = require('./routes/dynamoDBRoutes');
const mysqlRoutes = require('./routes/mysqlRoutes');
const securityHubRoutes = require('./routes/securityHubRoutes');
const authRoutes = require('./routes/authRoutes');
const homeRoutes = require('./routes/homeRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');



// Initialize Express App
const app = express();

// Middleware Setup

// Security Middleware
app.use(helmet());

// CORS Configuration (Adjust the origin as per your frontend)
app.use(cors({
  origin: 'http://localhost:4200', // Replace with your frontend's URL
  credentials: true,
}));

// Body Parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie Parser
app.use(cookieParser());

// Session Configuration
app.use(session({
  secret: process.env.SESSION_SECRET || 'default_session_secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  },
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Load Passport Configuration
require('./config/passport');

// CSRF Protection
const csrfProtection = csrf({ cookie: true });
app.use(csrfProtection);

// Handle CSRF Token Errors
app.use((err, req, res, next) => {
  if (err.code !== 'EBADCSRFTOKEN') return next(err);

  // CSRF token errors
  res.status(403).json({ error: 'Form tampered with' });
});



// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again after 15 minutes',
});
app.use(limiter);

// Routes Setup
app.use('/api/v1/security-hub', securityHubRoutes);
app.use('/dynamodb', dynamoDBRoutes);
app.use('/mysql', mysqlRoutes);
app.use('/', homeRoutes);
app.use('/auth', authRoutes);
app.use('/api/v1/dashboard', dashboardRoutes);


// Root Route
app.get('/', (req, res) => {
  res.send('Welcome to the Cloud Security Platform Backend!');
});

// Start the Server After Syncing the Database
sequelize.sync({ alter: true })
  .then(() => {
    logger.info('Database synchronized');
    const port = process.env.PORT || 3000;
    app.listen(port, '0.0.0.0', () => {
      logger.info(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    logger.error(`Database synchronization error: ${error.message}`);
  });
