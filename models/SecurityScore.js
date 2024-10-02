const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');

const SecurityScore = sequelize.define('SecurityScore', {
  score: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  timestamp: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

module.exports = SecurityScore;
