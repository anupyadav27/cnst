// models/User.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig'); // Adjust the path as necessary
const bcrypt = require('bcryptjs');

const User = sequelize.define('User', {
  googleId: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: true,
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
    allowNull: true,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'user',
  },
}, {
  // Additional model options if needed
});

// Hash password before saving (if using password-based auth)
User.beforeCreate(async (user) => {
  if (user.password) {
    user.password = await bcrypt.hash(user.password, 10);
  }
});

module.exports = User;
