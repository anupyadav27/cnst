// controllers/mysqlController.js

const mysqlConnection = require('../services/mysqlService');

exports.testMySQL = (req, res) => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS test_table (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL
    )
  `;

  const insertDataQuery = `
    INSERT INTO test_table (name) VALUES ('Test Name')
  `;

  const selectDataQuery = `
    SELECT * FROM test_table
  `;

  mysqlConnection.query(createTableQuery, (err) => {
    if (err) {
      console.error('Error creating table:', err);
      return res.status(500).json({ error: 'Error creating table' });
    }
    console.log('Test table created or already exists.');

    mysqlConnection.query(insertDataQuery, (err) => {
      if (err) {
        console.error('Error inserting data:', err);
        return res.status(500).json({ error: 'Error inserting data' });
      }
      console.log('Data inserted into test_table.');

      mysqlConnection.query(selectDataQuery, (err, results) => {
        if (err) {
          console.error('Error selecting data:', err);
          return res.status(500).json({ error: 'Error selecting data' });
        }
        console.log('Data retrieved from test_table:', results);
        res.json({
          message: 'MySQL test successful',
          data: results,
        });
      });
    });
  });
};
