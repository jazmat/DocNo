// backend/routes/system.js

const express = require("express");
const router = express.Router();

const db = require("../config/db"); 


// ================= SYSTEM HEALTH CHECK =================

router.get("/health", async (req, res) => {

    try {

        const [[dbCheck]] = await db.query("SELECT 1 AS db_status");

        const [[documents]] = await db.query(
            "SELECT COUNT(*) AS count FROM documents"
        );

        const [[pendingUsers]] = await db.query(
            "SELECT COUNT(*) AS count FROM pending_users WHERE status='pending'"
        );

        const [[lastDocument]] = await db.query(
            "SELECT document_number FROM documents ORDER BY id DESC LIMIT 1"
        );

        const [[sequences]] = await db.query(
            "SELECT COUNT(*) AS count FROM numbering_sequences"
        );

        res.json({

            status: "OK",

            database: dbCheck.db_status === 1 ? "connected" : "error",

            statistics: {
                documents: documents.count,
                pendingUsers: pendingUsers.count,
                sequences: numbering_sequences.count
            },

            lastDocument: lastDocument
                ? lastDocument.document_number
                : null,

            timestamp: new Date()

        });

    } catch (error) {

        console.error("System health check failed:", error);

        res.status(500).json({

            status: "ERROR",

            message: "System health check failed",

            error: error.message,

            timestamp: new Date()

        });
    }

});


module.exports = router;