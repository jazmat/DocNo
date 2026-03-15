/**
 * Admin & Super Admin Controls
 */

const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const db = require("../config/db");

/* ================= ADMIN GUARD ================= */
const adminOnly = (req, res, next) => {
    if (!req.user || req.user.role !== "admin") {
        return res.status(403).json({ error: "Admin required" });
    }
    next();
};

/* ============== SUPER ADMIN GUARD ============== */
const superAdminOnly = (req, res, next) => {
    if (!req.user?.is_super_admin) {
        return res.status(403).json({
            error: "Super Admin privileges required",
        });
    }
    next();
};

/* =====================================================
   GET DEPARTMENTS
===================================================== */
router.get(
    "/departments",
    authMiddleware,
    adminOnly,
    async (req, res) => {
        const [rows] = await db.execute(
            `SELECT id, name, is_active
       FROM departments
       ORDER BY name`
        );

        res.json(rows);
    }
);

/* =====================================================
   CREATE DEPARTMENT
===================================================== */
router.post(
    "/departments",
    authMiddleware,
    superAdminOnly,
    async (req, res) => {
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({
                error: "Department name required",
            });
        }

        await db.execute(
            `INSERT INTO departments (name)
       VALUES (?)`,
            [name]
        );

        res.json({ success: true });
    }
);

/* =====================================================
   TOGGLE ACTIVE STATUS
===================================================== */
router.patch(
    "/departments/:id/status",
    authMiddleware,
    superAdminOnly,
    async (req, res) => {
        const id = req.params.id;

        const [rows] = await db.execute(
            `SELECT is_active FROM departments WHERE id=?`,
            [id]
        );

        const newStatus = rows[0].is_active ? 0 : 1;

        await db.execute(
            `UPDATE departments
       SET is_active=?
       WHERE id=?`,
            [newStatus, id]
        );

        res.json({ success: true });
    }
);

module.exports = router;