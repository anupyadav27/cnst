// controllers/dynamoDBController.js

const dynamoDBService = require('../services/dynamoDBService');

exports.testDynamoDB = async (req, res) => {
  const tableName = 'TestTable';

  const item = {
    Id: '1',
    Name: 'Test Item',
  };

  try {
    // Create the table if it doesn't exist
    await dynamoDBService.createTableIfNotExists(tableName);

    // Put the item into the table
    await dynamoDBService.putItem(tableName, item);
    console.log('Item inserted into DynamoDB');

    // Get the item back from the table
    const result = await dynamoDBService.getItem(tableName, { Id: '1' });
    console.log('Item retrieved from DynamoDB:', result.Item);

    res.json({
      message: 'DynamoDB test successful',
      data: result.Item,
    });
  } catch (error) {
    console.error('DynamoDB test error:', error);
    res.status(500).json({ error: 'DynamoDB test failed', details: error.message });
  }
};
