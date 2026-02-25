/**
 * File: backend/middleware/authMiddleware.js
 * Purpose: JWT authentication middleware for protected routes
 * Project: DocNo
 */

const jwt = require("jsonwebtoken");

/**
 * Middleware to verify JWT token
 * Expected Header:
 * Authorization: Bearer <token>
 */
const authMiddleware = (req, res, next) => {
    try {
        // Read authorization header
        const authHeader = req.headers.authorization;

        // Debug log (can be removed later)
        console.log("AUTH HEADER RECEIVED:", authHeader);

        // Validate header presence
        if (!authHeader) {
            return res.status(401).json({
                error: "No authorization header provided",
            });
        }

        // Validate Bearer format
        if (!authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                error: "Invalid authorization format",
            });
        }

        // Extract token
        const token = authHeader.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                error: "Token missing",
            });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach user payload to request
        req.user = decoded;

        next();
    } catch (error) {
        console.error("JWT VERIFY ERROR:", error.message);

        return res.status(401).json({
            error: "Invalid or expired token",
        });
    }
};

module.exports = authMiddleware;