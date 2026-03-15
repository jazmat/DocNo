const express = require("express");
const router = express.Router();
const pool = require("../config/db");
const bcrypt = require("bcryptjs");
const authMiddleware = require("../middleware/authMiddleware");

/* ======================================================
   GET ALL PENDING USERS
====================================================== */
router.get("/pending-users", authMiddleware, async (req, res) => {
    try {
        if (!req.user.is_admin) {
            return res.status(403).json({ error: "Admin only" });
        }

        const [rows] = await pool.execute(`
      SELECT 
        pu.id,
        pu.full_name,
        pu.email,
        d.name AS department,
        pu.created_at
      FROM pending_users pu
      LEFT JOIN departments d ON d.id = pu.department_id
      WHERE pu.status='pending'
      ORDER BY pu.created_at DESC
    `);

        res.json({ data: rows });
    } catch (error) {
        console.error("PENDING USERS ERROR:", error);
        res.status(500).json({ error: "Failed to load pending users" });
    }
});

/* ======================================================
   APPROVE USER
====================================================== */
router.post("/pending-users/:id/approve", authMiddleware, async (req, res) => {
    try {
        if (!req.user.is_admin) {
            return res.status(403).json({ error: "Admin only" });
        }

        const pendingId = req.params.id;

        const [rows] = await pool.execute(
            `SELECT * FROM pending_users WHERE id=?`,
            [pendingId]
        );

        if (!rows.length) {
            return res.status(404).json({ error: "User not found" });
        }

        const pending = rows[0];

        const password_hash = await bcrypt.hash(pending.password_hash, 10);

        // create real user
        await pool.execute(
            `
      INSERT INTO users
      (full_name, email, password_hash, department, is_active, is_admin)
      VALUES (?,?,?,?,1,0)
      `,
            [
                pending.full_name,
                pending.email,
                password_hash,
                pending.department_id,
            ]
        );

        // update status
        await pool.execute(
            `UPDATE pending_users SET status='approved' WHERE id=?`,
            [pendingId]
        );

        res.json({ success: true });
    } catch (error) {
        console.error("APPROVE ERROR:", error);
        res.status(500).json({ error: "Approval failed" });
    }
});

/* ======================================================
   REJECT USER
====================================================== */
router.post("/pending-users/:id/reject", authMiddleware, async (req, res) => {
    try {
        if (!req.user.is_admin) {
            return res.status(403).json({ error: "Admin only" });
        }

        await pool.execute(
            `UPDATE pending_users SET status='rejected' WHERE id=?`,
            [req.params.id]
        );

        res.json({ success: true });
    } catch (error) {
        console.error("REJECT ERROR:", error);
        res.status(500).json({ error: "Reject failed" });
    }
});

module.exports = router;