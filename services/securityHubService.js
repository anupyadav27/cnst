// services/securityHubService.js

const AWS = require('../config/awsConfig');
const securityhub = new AWS.SecurityHub();

exports.getFindings = async () => {
  const params = {
    // Define parameters as needed
  };

  try {
    const data = await securityhub.getFindings(params).promise();
    return data.Findings;
  } catch (error) {
    console.error('Error in securityHubService:', error);
    throw error;
  }
};
