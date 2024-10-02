// controllers/dashboardController.js
const dashboardService = require('../services/dashboardService');

exports.getSecurityScore = async (req, res) => {
  try {
    const score = await dashboardService.fetchSecurityScore();

    // If the score is a message indicating no insights are available
    if (typeof score === 'object' && score.message) {
      return res.status(200).json(score);
    }

    res.json({ securityScore: score });
  } catch (error) {
    console.error('Error fetching security score:', error);
    res.status(500).json({ error: 'Failed to fetch security score' });
  }
};
