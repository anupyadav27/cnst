// config/dbConfig.js
const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.MYSQL_DATABASE || 'testdb',
  process.env.MYSQL_USER || 'root',
  process.env.MYSQL_PASSWORD || 'my-secret-pw',
  {
    host: process.env.MYSQL_HOST || 'mysql', // Use Docker service name
    dialect: 'mysql',
    port: 3306,
    logging: false,
  }
);

// Optional: Test the connection
sequelize.authenticate()
  .then(() => {
    console.log('Sequelize connected to MySQL successfully.');
  })
  .catch((err) => {
    console.error('Sequelize connection error:', err);
  });

module.exports = sequelize;
