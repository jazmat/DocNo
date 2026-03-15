// backend/middleware/requireAdmin.js

const requireAdmin = (req, res, next) => {

    try {

        if (!req.user) {
            return res.status(401).json({
                error: "Authentication required"
            });
        }

        if (!req.user.is_admin) {
            return res.status(403).json({
                error: "Admin privileges required"
            });
        }

        next();

    } catch (error) {

        console.error("Admin authorization error:", error);

        res.status(500).json({
            error: "Authorization failure"
        });
    }
};

module.exports = requireAdmin;