// config/mysqlConfig.js
require('dotenv').config();

module.exports = {
  host: process.env.MYSQL_HOST || 'mysql',
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || 'my-secret-pw',
  database: process.env.MYSQL_DATABASE || 'testdb',
};
