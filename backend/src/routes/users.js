/**
 * File: backend/src/routes/users.js
 * Purpose: User profile management
 */

const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

const authMiddleware = require("../../middleware/authMiddleware");
const db = require("../config/db");

/* ==========================================
   GET PROFILE
========================================== */
router.get("/profile", authMiddleware, async (req, res) => {
    try {
        const [rows] = await db.execute(
            `
      SELECT
        id,
        full_name,
        email,
        department,
        is_admin,
        is_active,
        created_at
      FROM users
      WHERE id = ?
      `,
            [req.user.id]
        );

        const user = rows[0];

        res.json({
            success: true,
            user: {
                ...user,
                role: user.is_admin ? "Administrator" : "User",
                status: user.is_active ? "Active" : "Inactive",
            },
        });

    } catch (error) {
        console.error("PROFILE FETCH ERROR:", error);
        res.status(500).json({ error: "Failed to load profile" });
    }
});

/* ==========================================
   UPDATE PROFILE
========================================== */
router.put("/profile", authMiddleware, async (req, res) => {
    try {
        const { full_name, department } = req.body;

        await db.execute(
            `UPDATE users SET full_name=?, department=? WHERE id=?`,
            [full_name, department, req.user.id]
        );

        res.json({ success: true });

    } catch (error) {
        console.error("PROFILE UPDATE ERROR:", error);
        res.status(500).json({ error: "Failed to update profile" });
    }
});

/* ==========================================
   CHANGE PASSWORD
========================================== */
router.put("/change-password", authMiddleware, async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;

        /**
         * IMPORTANT:
         * Your DB uses password_hash (NOT password)
         */
        const [rows] = await db.execute(
            `SELECT password_hash FROM users WHERE id=?`,
            [req.user.id]
        );

        if (!rows.length) {
            return res.status(404).json({ error: "User not found" });
        }

        const storedHash = rows[0].password_hash;

        const valid = await bcrypt.compare(
            currentPassword,
            storedHash
        );

        if (!valid) {
            return res.status(400).json({
                error: "Current password incorrect",
            });
        }

        const newHash = await bcrypt.hash(newPassword, 10);

        await db.execute(
            `UPDATE users SET password_hash=? WHERE id=?`,
            [newHash, req.user.id]
        );

        res.json({
            success: true,
            message: "Password changed successfully",
        });

    } catch (error) {
        console.error("PASSWORD CHANGE ERROR:", error);
        res.status(500).json({ error: "Failed to change password" });
    }
});

module.exports = router;