backend/
├── app.js
├── package.json
├── Dockerfile
├── docker-compose.yml
├── config/
│   ├── awsConfig.js
│   ├── dbConfig.js
│   ├── cacheConfig.js
│   └── dotenvConfig.js
├── routes/
│   ├── securityHubRoutes.js
│   ├── inspectorRoutes.js
│   └── ... (other route files)
├── controllers/
│   ├── securityHubController.js
│   └── ... (other controller files)
├── services/
│   ├── securityHubService.js
│   └── ... (other service files)
├── models/
│   ├── securityScoreModel.js
│   └── ... (other model files)
├── utils/
│   ├── dataProcessor.js
│   └── ... (other utility files)
├── middlewares/
│   ├── authMiddleware.js
│   └── ... (other middleware files)
├── tests/
│   ├── controllers/
│   ├── services/
│   └── utils/
├── .env
├── .gitignore
└── README.md
