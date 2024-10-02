// config/passport.js

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('./dbConfig'); // Adjust the path if necessary
const bcrypt = require('bcryptjs');

// Define the User model if not defined elsewhere
const User = sequelize.define('User', {
  googleId: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: true, // Allow null for users not using Google OAuth
  },
  username: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: true, // Allow null since Google-authenticated users might not have a password
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'user', // Roles like 'user', 'admin'
  },
}, {
  // Additional model options if needed
});

// Serialize user to store in session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user from session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

// Configure Google Strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
    // Uncomment and set to your Google Workspace domain to restrict authentication
    // hd: 'yourdomain.com',
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const googleId = profile.id;
      const email = profile.emails[0].value;
      const username = profile.displayName;

      // Optional: Restrict to your Google Workspace domain
      const domain = email.split('@')[1];
      if (domain !== 'yourdomain.com') { // Replace with your domain
        return done(null, false, { message: 'Unauthorized domain' });
      }

      // Find or create the user
      let user = await User.findOne({ where: { googleId } });

      if (!user) {
        // Check if a user with the same email exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
          // Link Google account to existing user
          existingUser.googleId = googleId;
          await existingUser.save();
          user = existingUser;
        } else {
          // Create a new user
          user = await User.create({
            googleId,
            username,
            email,
            password: null, // No password since using Google OAuth
          });
        }
      }

      return done(null, user);
    } catch (err) {
      return done(err, null);
    }
  }
));

module.exports = passport;
