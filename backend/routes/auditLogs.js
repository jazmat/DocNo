const express = require("express");
const router = express.Router();

const db = require("../config/db");
const authMiddleware = require("../middleware/authMiddleware");

/*
GET AUDIT LOGS
Admin only
*/

router.get("/", authMiddleware, async (req, res) => {

    try {

        const [rows] = await db.execute(`
            SELECT 
                a.id,
                a.action,
                a.entity_type,
                a.entity_id,
                a.details,
                a.created_at,
                u.email as user_email
            FROM audit_logs a
            LEFT JOIN users u ON u.id = a.user_id
            ORDER BY a.created_at DESC
            LIMIT 200
        `);

        res.json(rows);

    } catch (err) {

        console.error("Audit logs error:", err);

        res.status(500).json({
            error: "Failed to load audit logs"
        });

    }

});

module.exports = router;