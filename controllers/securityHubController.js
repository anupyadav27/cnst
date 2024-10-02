// controllers/securityHubController.js

const securityHubService = require('../services/securityHubService');

exports.getFindings = async (req, res) => {
  try {
    const findings = await securityHubService.getFindings();
    res.json(findings);
  } catch (error) {
    console.error('Error fetching findings:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
