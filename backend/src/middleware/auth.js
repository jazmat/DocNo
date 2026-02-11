// src/middleware/auth.js
const jwt = require('jsonwebtoken');
const logger = require('../utils/logger');
const { ErrorCodes, AppError } = require('../utils/errors');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        logger.warn('No token provided');
        return res.status(401).json({ 
            error: 'Access token required',
            errorCode: ErrorCodes.UNAUTHORIZED,
        });
    }

    const secret = process.env.JWT_SECRET;
    if (!secret || secret === 'your_jwt_secret_key') {
        logger.error('JWT_SECRET not properly configured');
        return res.status(500).json({ 
            error: 'Server configuration error',
            errorCode: 'CONFIG_ERROR',
        });
    }

    jwt.verify(token, secret, (err, user) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                logger.warn(`Token expired for user: ${err.decoded?.id}`);
                return res.status(403).json({ 
                    error: 'Token has expired',
                    errorCode: ErrorCodes.EXPIRED_TOKEN,
                });
            }
            logger.warn('Token verification failed:', err.message);
            return res.status(403).json({ 
                error: 'Invalid or expired token',
                errorCode: ErrorCodes.INVALID_TOKEN,
            });
        }
        req.user = user;
        next();
    });
};

const requireAdmin = (req, res, next) => {
    if (!req.user || !req.user.is_admin) {
        logger.warn(`Unauthorized admin access attempt by user ${req.user?.id}`);
        return res.status(403).json({ 
            error: 'Admin access required',
            errorCode: ErrorCodes.FORBIDDEN,
        });
    }
    next();
};

module.exports = {
    authenticateToken,
    requireAdmin,
};