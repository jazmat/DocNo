// server.js
require('dotenv').config();
const app = require('./src/app');
const db = require('./config/database');
const logger = require('./src/utils/logger');
const { validateEnvironment } = require('./src/utils/envValidator');

// Validate environment variables
if (!validateEnvironment()) {
  logger.error('Environment validation failed. Exiting.');
  process.exit(1);
}

const PORT = process.env.PORT || 3000;

// Test database connection
db.authenticate()
    .then(() => {
        logger.info('Database connection established');
    })
    .catch((err) => {
        logger.error('Unable to connect to database:', err);
        process.exit(1);
    });

// Sync database models
db.sync({ alter: process.env.NODE_ENV === 'development' })
    .then(() => {
        logger.info('Database models synchronized');
    })
    .catch((err) => {
        logger.error('Error syncing database:', err);
    });

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  logger.error('Unhandled Rejection:', err);
  process.exit(1);
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  logger.error('Uncaught Exception:', err);
  process.exit(1);
});

app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
});