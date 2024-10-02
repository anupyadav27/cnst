const { SecurityHubClient, GetInsightsCommand } = require('@aws-sdk/client-securityhub');
const db = require('../models/SecurityScore');

const securityHubClient = new SecurityHubClient({ region: process.env.AWS_REGION });

exports.fetchSecurityScore = async () => {
  try {
    console.log("Connecting to AWS SecurityHub...");
    // Sync database (create table if it doesn't exist)
    await db.sync();

    // Fetch insights from Security Hub
    const command = new GetInsightsCommand({});
    try {
      const response = await securityHubClient.send(command);
      console.log("Response:", response); // Log entire response
    } catch (error) {
      console.error("Error:", error);
      if (error.$response) {
        console.error("Raw response:", error.$response); // Log raw error response
      }
    }
    const response = await securityHubClient.send(command);

    console.log("Raw AWS response:", response);

    if (!response.Insights || response.Insights.length === 0) {
      console.log("No insights available");
      return { message: "No insights available" }; // Return a default response
    }

    // Process and calculate the security score
    const score = calculateSecurityScore(response.Insights);

    // Store in the database
    await db.create({ score, timestamp: new Date() });

    return score;
  } catch (error) {
    if (error.$response) {
      console.error("Error raw response:", error.$response);
    }
    console.error("Error in fetchSecurityScore:", error);
    throw error;
  }
};

const calculateSecurityScore = (insights) => {
  // Implement your scoring algorithm here
  let computedScore = 0;
  // Logic to compute score based on insights
  return computedScore;
};
