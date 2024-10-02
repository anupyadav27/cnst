// Create a temporary script or add a route to trigger the fetch manually.

const dashboardService = require('./services/dashboardService');

dashboardService.fetchSecurityScore()
  .then(score => {
    console.log('Manual fetch successful. Security Score:', score);
  })
  .catch(error => {
    console.error('Manual fetch failed:', error);
  });
