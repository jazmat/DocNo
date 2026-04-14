const requireAdmin = require("../middleware/requireAdmin");
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const db = require("../config/db");
const pool = require("../config/db");

/* =========================
   PENDING USERS
========================= */
router.get("/pending-users", authMiddleware, requireAdmin, async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM pending_users");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* =========================
   APPROVE USER
========================= */
router.post("/approve-user/:id", authMiddleware, requireAdmin, async (req, res) => {
  const { id } = req.params;

  try {
    const [user] = await db.query(
      "SELECT * FROM pending_users WHERE id = ?",
      [id]
    );

    if (!user.length) {
      return res.status(404).json({ message: "User not found" });
    }

    const u = user[0];

    await db.query(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [u.name, u.email, u.password]
    );

    await db.query("DELETE FROM pending_users WHERE id = ?", [id]);

    res.json({ message: "User approved" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* =========================
   USERS LIST
========================= */
router.get("/users", authMiddleware, requireAdmin, async (req, res) => {
  try {
    const [rows] = await db.query("SELECT id, name, email FROM users");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* =========================
   DEPARTMENTS
========================= */
router.get("/departments", async (req, res) => {
  try {
    const [rows] = await pool.execute(`
      SELECT id, name, prefix, sequence_length, year_digits, is_active
      FROM departments
      ORDER BY name
    `);
    res.json(rows);
  } catch (err) {
    console.error("Departments load error:", err);
    res.status(500).json({ error: "Failed to load departments" });
  }
});

router.post("/departments", authMiddleware, async (req, res) => {
  try {
    const { name, prefix } = req.body;

    if (!name || !prefix) {
      return res.status(400).json({ error: "Name and prefix required" });
    }

    await pool.execute(
      `INSERT INTO departments (name, prefix) VALUES (?, ?)`,
      [name, prefix]
    );

    res.json({ success: true });
  } catch (err) {
    console.error("Create department error:", err);
    res.status(500).json({ error: "Failed to create department" });
  }
});

/* =========================
   CATEGORIES
========================= */
router.get("/categories", authMiddleware, async (req, res) => {
  try {
    const [rows] = await pool.execute(`
      SELECT id, name, prefix, is_active
      FROM categories
      ORDER BY name
    `);
    res.json(rows);
  } catch (err) {
    console.error("Categories load error:", err);
    res.status(500).json({ error: "Failed to load categories" });
  }
});

/* =========================
   AUDIT LOG VIEWER (FIXED)
========================= */
router.get("/audit", authMiddleware, async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      search = "",
      action = "",
      startDate,
      endDate,
    } = req.query;

    let query = `
      SELECT a.*, u.full_name
      FROM audit_logs a
      LEFT JOIN users u ON a.user_id = u.id
      WHERE 1=1
    `;

    const params = [];

    // 🔍 Search
    if (search) {
      query += ` AND (a.details LIKE ? OR a.action LIKE ?)`;
      params.push(`%${search}%`, `%${search}%`);
    }

    // 🎯 Action
    if (action) {
      query += ` AND a.action = ?`;
      params.push(action);
    }

    // ✅ FIXED DATE FILTER (IMPORTANT)

    let conditions = [];
    let values = [];

    // ✅ PURE DATE COMPARISON (FINAL FIX)
    // ✅ APPLY DATE FILTER DIRECTLY
    if (startDate) {
      query += ` AND DATE(a.created_at) >= ?`;
      params.push(startDate);
    }

    if (endDate) {
      query += ` AND DATE(a.created_at) <= ?`;
      params.push(endDate);
    }
    
    query += ` ORDER BY a.created_at DESC LIMIT ? OFFSET ?`;
    params.push(Number(limit), (Number(page) - 1) * Number(limit));
    const [rows] = await db.query(query, params);

    res.json(rows);
    //console.log("QUERY:", query);
    //console.log("PARAMS:", params);
  } catch (err) {
    console.error("AUDIT FETCH ERROR:", err);
    res.status(500).json({ error: "Failed to fetch audit logs" });
  }

});

/* =========================
   DASHBOARD STATS
========================= */
router.get("/dashboard-stats", authMiddleware, async (req, res) => {
  try {
    const [[documents]] = await db.execute("SELECT COUNT(*) as total FROM documents");
    const [[pending]] = await db.execute("SELECT COUNT(*) as total FROM pending_users WHERE status='pending'");
    const [[departments]] = await db.execute("SELECT COUNT(*) as total FROM departments");
    const [[categories]] = await db.execute("SELECT COUNT(*) as total FROM categories");
    const [[users]] = await db.execute("SELECT COUNT(*) as total FROM users WHERE is_active = 1");

    res.json({
      documents: documents.total,
      pending: pending.total,
      departments: departments.total,
      categories: categories.total,
      users: users.total
    });

  } catch (err) {
    console.error("Dashboard stats error:", err);
    res.status(500).json({ error: "Failed to load dashboard stats" });
  }
});

module.exports = router;