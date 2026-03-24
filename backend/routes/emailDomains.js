const express = require("express");
const router = express.Router();

const db = require("../config/db");
const authMiddleware = require("../middleware/authMiddleware");

/* ===============================
   LIST DOMAINS
================================ */

router.get("/", authMiddleware, async (req, res) => {

    const [rows] = await db.execute(
        "SELECT * FROM allowed_email_domains ORDER BY domain"
    );

    res.json(rows);

});

/* ===============================
   ADD DOMAIN
================================ */

router.post("/", authMiddleware, async (req, res) => {

    const { domain } = req.body;

    if (!domain) {
        return res.status(400).json({
            error: "Domain required"
        });
    }

    await db.execute(
        "INSERT INTO allowed_email_domains (domain) VALUES (?)",
        [domain]
    );

    res.json({ success: true });

});

/* ===============================
   TOGGLE ACTIVE
================================ */

router.patch("/:id/toggle", authMiddleware, async (req, res) => {

    await db.execute(
        `UPDATE allowed_email_domains
     SET is_active = NOT is_active
     WHERE id=?`,
        [req.params.id]
    );

    res.json({ success: true });

});

module.exports = router;