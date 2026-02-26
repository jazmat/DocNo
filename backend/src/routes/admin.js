const express = require("express");
const router = express.Router();

const authMiddleware = require("../../middleware/authMiddleware");
const db = require("../config/db");

/* ================= GUARDS ================= */

const adminOnly = (req, res, next) => {
    if (!req.user?.is_admin)
        return res.status(403).json({ error: "Admin required" });
    next();
};

const superAdminOnly = (req, res, next) => {
    if (!req.user?.is_super_admin)
        return res.status(403).json({ error: "Super Admin required" });
    next();
};

/* =====================================================
   GENERIC HELPERS
===================================================== */

const toggleStatus = async (table, id) => {
    const [rows] = await db.execute(
        `SELECT is_active FROM ${table} WHERE id=?`,
        [id]
    );

    const newStatus = rows[0].is_active ? 0 : 1;

    await db.execute(
        `UPDATE ${table} SET is_active=? WHERE id=?`,
        [newStatus, id]
    );
};

const safeDelete = async (table, fkColumn, id) => {
    const [used] = await db.execute(
        `SELECT COUNT(*) AS count FROM documents WHERE ${fkColumn}=?`,
        [id]
    );

    if (used[0].count > 0) {
        throw new Error("Item is in use and cannot be deleted");
    }

    await db.execute(`DELETE FROM ${table} WHERE id=?`, [id]);
};

/* =====================================================
   DEPARTMENTS CRUD
===================================================== */

router.get("/departments", authMiddleware, adminOnly, async (req, res) => {
    const [rows] = await db.execute(
        `SELECT id, name, is_active FROM departments ORDER BY name`
    );
    res.json(rows);
});

router.post(
    "/departments",
    authMiddleware,
    superAdminOnly,
    async (req, res) => {
        await db.execute(
            `INSERT INTO departments (name) VALUES (?)`,
            [req.body.name]
        );
        res.json({ success: true });
    }
);

/* UPDATE NAME */
router.put(
    "/departments/:id",
    authMiddleware,
    superAdminOnly,
    async (req, res) => {
        await db.execute(
            `UPDATE departments SET name=? WHERE id=?`,
            [req.body.name, req.params.id]
        );

        res.json({ success: true });
    }
);

/* TOGGLE STATUS */
router.patch(
    "/departments/:id/status",
    authMiddleware,
    superAdminOnly,
    async (req, res) => {
        await toggleStatus("departments", req.params.id);
        res.json({ success: true });
    }
);

/* DELETE SAFE */
router.delete(
    "/departments/:id",
    authMiddleware,
    superAdminOnly,
    async (req, res) => {
        try {
            await safeDelete("departments", "department_id", req.params.id);
            res.json({ success: true });
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }
);

/* =====================================================
   CATEGORIES CRUD
===================================================== */

router.get("/categories", authMiddleware, adminOnly, async (req, res) => {
    const [rows] = await db.execute(
        `SELECT id, name, is_active FROM document_categories ORDER BY name`
    );
    res.json(rows);
});

router.post(
    "/categories",
    authMiddleware,
    superAdminOnly,
    async (req, res) => {
        await db.execute(
            `INSERT INTO document_categories (name) VALUES (?)`,
            [req.body.name]
        );
        res.json({ success: true });
    }
);

/* UPDATE */
router.put(
    "/categories/:id",
    authMiddleware,
    superAdminOnly,
    async (req, res) => {
        await db.execute(
            `UPDATE document_categories SET name=? WHERE id=?`,
            [req.body.name, req.params.id]
        );
        res.json({ success: true });
    }
);

/* TOGGLE */
router.patch(
    "/categories/:id/status",
    authMiddleware,
    superAdminOnly,
    async (req, res) => {
        await toggleStatus("document_categories", req.params.id);
        res.json({ success: true });
    }
);

/* DELETE SAFE */
router.delete(
    "/categories/:id",
    authMiddleware,
    superAdminOnly,
    async (req, res) => {
        try {
            await safeDelete(
                "document_categories",
                "category_id",
                req.params.id
            );
            res.json({ success: true });
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }
);

module.exports = router;