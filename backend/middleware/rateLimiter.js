// src/middleware/rateLimiter.js
const rateLimit = require('express-rate-limit');
const { AppError, ErrorCodes } = require('../utils/errors');

const createLimiter = (windowMs, max, message = 'Too many requests') => {
  return rateLimit({
    windowMs: windowMs * 60 * 1000,
    max,
    message,
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res) => {
      res.status(429).json({
        error: message,
        errorCode: ErrorCodes.RATE_LIMIT_EXCEEDED,
        retryAfter: req.rateLimit.resetTime,
      });
    },
  });
};

// General API limiter
const apiLimiter = createLimiter(
  process.env.RATE_LIMIT_WINDOW || 15,
  process.env.RATE_LIMIT_MAX || 100,
  'Too many requests from this IP'
);

// Auth-specific limiter (stricter)
const authLimiter = createLimiter(15, 5, 'Too many authentication attempts');

// Document generation limiter
const documentLimiter = createLimiter(60, 20, 'Too many document generation requests');

module.exports = {
  apiLimiter,
  authLimiter,
  documentLimiter,
  createLimiter,
};
