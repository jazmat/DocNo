// src/utils/envValidator.js
const logger = require('./logger');

const REQUIRED_ENV_VARS = [
  'JWT_SECRET',
  'DB_HOST',
  'DB_PORT',
  'DB_NAME',
  'DB_USER',
  'DB_PASSWORD',
  'EMAIL_HOST',
  'EMAIL_PORT',
  'EMAIL_USER',
  'EMAIL_PASSWORD',
];

const validateEnvironment = () => {
  const missingVars = [];

  REQUIRED_ENV_VARS.forEach((envVar) => {
    if (!process.env[envVar]) {
      missingVars.push(envVar);
    }
  });

  // Check for production-unsafe defaults
  if (process.env.NODE_ENV === 'production') {
    if (
      process.env.JWT_SECRET === 'your_jwt_secret_key' ||
      process.env.JWT_SECRET === 'your_super_secret_jwt_key_change_in_production'
    ) {
      missingVars.push('JWT_SECRET (using default value - UNSAFE FOR PRODUCTION)');
    }
  }

  if (missingVars.length > 0) {
    logger.error(`Missing or invalid environment variables:\n${missingVars.join('\n')}`);
    return false;
  }

  logger.info('Environment validation passed');
  return true;
};

module.exports = {
  validateEnvironment,
};
