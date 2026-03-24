const express = require("express");
const router = express.Router();
const pool = require("../config/db");
const authMiddleware = require("../middleware/authMiddleware");
const db = require("../config/db");
/* =========================
   PUBLIC: DEPARTMENTS LIST
   Used by registration page
========================= */

router.get("/departments", async (req, res) => {

    try {

        const [rows] = await pool.execute(`
      SELECT
        id,
        name,
        prefix,
        sequence_length,
        year_digits,
        year_digits,
        is_active
      FROM departments
      ORDER BY name
    `);

        res.json(rows);

    } catch (err) {

        console.error("Departments load error:", err);

        res.status(500).json({
            error: "Failed to load departments"
        });

    }

});
/* =========================
   CREATE DEPARTMENT
========================= */

router.post("/departments", authMiddleware, async (req, res) => {

  try {

    const {
      name,
      prefix,
    } = req.body;

    if (!name || !prefix) {
      return res.status(400).json({
        error: "Name and prefix required"
      });
    }

    await pool.execute(`
      INSERT INTO departments
      (name, prefix)
      VALUES (?, ?)
    `,
      [
        name,
        prefix,
      ]);

    res.json({ success: true });

  } catch (err) {

    console.error("Create department error:", err);

    res.status(500).json({
      error: "Failed to create department"
    });

  }

});
/* =========================
   UPDATE DEPARTMENT
========================= */

router.put("/departments/:id", authMiddleware, async (req, res) => {

  try {

    const id = req.params.id;

    const {
      name,
      prefix,
      sequence_length,
      yearly_reset,
      is_active
    } = req.body;

    await pool.execute(`
      UPDATE departments
      SET
        name=?,
        prefix=?,
        sequence_length=?,
        yearly_reset=?,
        is_active=?
      WHERE id=?
    `,
      [
        name,
        prefix,
        sequence_length,
        yearly_reset ? 1 : 0,
        is_active ? 1 : 0,
        id
      ]);

    res.json({ success: true });

  } catch (err) {

    console.error("Department update error:", err);

    res.status(500).json({
      error: "Failed to update department"
    });

  }

});
/* =========================
   PUBLIC: CATEGORIES LIST
   Used by registration page
========================= */
router.get("/categories", authMiddleware, async (req, res) => {

  try {

    const [rows] = await pool.execute(`
      SELECT
        id,
        name,
        prefix,
        is_active
      FROM categories
      ORDER BY name
    `);

    res.json(rows);

  } catch (err) {

    console.error("Categories load error:", err);

    res.status(500).json({
      error: "Failed to load categories"
    });

  }

});
/* =========================
   CREATE CATEGORY
========================= */

router.post("/categories", authMiddleware, async (req, res) => {

  try {

    const { name, prefix } = req.body;

    if (!name || !prefix) {
      return res.status(400).json({
        error: "Name and prefix required"
      });
    }

    await pool.execute(`
      INSERT INTO categories
      (name, prefix)
      VALUES (?, ?)
    `,
      [
        name,
        prefix
      ]);

    res.json({ success: true });

  } catch (err) {

    console.error("Create category error:", err);

    res.status(500).json({
      error: "Failed to create category"
    });

  }

});
/* =========================
   UPDATE CATEGORY
========================= */

router.put("/categories/:id", authMiddleware, async (req, res) => {

  try {

    const id = req.params.id;

    const {
      name,
      prefix,
      is_active
    } = req.body;

    await pool.execute(`
      UPDATE categories
      SET
        name=?,
        prefix=?,
        is_active=?
      WHERE id=?
    `,
      [
        name,
        prefix,
        is_active ? 1 : 0,
        id
      ]);

    res.json({ success: true });

  } catch (err) {

    console.error("Category update error:", err);

    res.status(500).json({
      error: "Failed to update category"
    });

  }

});
/* =========================
   SEQUENCE DASHBOARD
========================= 

router.get("/sequences", authMiddleware, async (req, res) => {

    try {

        const [rows] = await pool.execute(`
      SELECT
        d.name AS department,
        ns.year,
        ns.current_sequence
      FROM numbering_sequences ns
      JOIN departments d
        ON ns.department_id = d.id
      ORDER BY d.name
    `);

        res.json(rows);

    } catch (err) {

        console.error("Sequence dashboard error:", err);

        res.status(500).json({
            error: "Failed to load sequences"
        });

    }

});
*/

/* =========================
   AUDIT LOG VIEWER
========================= */

router.get("/audit", authMiddleware, async (req, res) => {

    try {

        const [rows] = await pool.execute(`
      SELECT
        a.id,
        u.full_name,
        a.action,
        a.entity_type,
        a.entity_id,
        a.details,
        a.created_at
      FROM audit_logs a
      LEFT JOIN users u
        ON a.user_id = u.id
      ORDER BY a.created_at DESC
      LIMIT 200
    `);

        res.json(rows);

    } catch (err) {

        console.error("Audit log error:", err);

        res.status(500).json({
            error: "Failed to load audit logs"
        });

    }

});
router.get("/dashboard-stats", authMiddleware, async (req, res) => {

  try {

    const [[documents]] = await db.execute(
      "SELECT COUNT(*) as total FROM documents"
    );

    const [[users]] = await db.execute(
      "SELECT COUNT(*) as total FROM users WHERE is_active = 1"
    );

    const [[pending]] = await db.execute(
      "SELECT COUNT(*) as total FROM pending_users WHERE status='pending'"
    );

    res.json({
      documents: documents.total,
      users: users.total,
      pending: pending.total
    });

  } catch (err) {

    console.error("Dashboard stats error:", err);

    res.status(500).json({
      error: "Failed to load dashboard stats"
    });

  }

});

module.exports = router;