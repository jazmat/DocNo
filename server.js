// server.js
const app = require('./src/app');
const db = require('./config/database');
const logger = require('./src/utils/logger');

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

app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
});