// services/dynamoDBService.js

const AWS = require('../config/awsConfig');
const dynamoDB = new AWS.DynamoDB.DocumentClient();
const dynamoDBRaw = new AWS.DynamoDB();

exports.createTableIfNotExists = async (tableName) => {
  const params = {
    TableName: tableName,
    AttributeDefinitions: [
      { AttributeName: 'Id', AttributeType: 'S' },
    ],
    KeySchema: [
      { AttributeName: 'Id', KeyType: 'HASH' },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 5,
      WriteCapacityUnits: 5,
    },
  };

  try {
    await dynamoDBRaw.describeTable({ TableName: tableName }).promise();
    console.log(`Table "${tableName}" already exists.`);
  } catch (err) {
    if (err.code === 'ResourceNotFoundException') {
      await dynamoDBRaw.createTable(params).promise();
      console.log(`Table "${tableName}" created.`);
      // Wait for the table to become active
      await dynamoDBRaw.waitFor('tableExists', { TableName: tableName }).promise();
    } else {
      throw err;
    }
  }
};

exports.putItem = async (tableName, item) => {
  const params = {
    TableName: tableName,
    Item: item,
  };
  return dynamoDB.put(params).promise();
};

exports.getItem = async (tableName, key) => {
  const params = {
    TableName: tableName,
    Key: key,
  };
  return dynamoDB.get(params).promise();
};
