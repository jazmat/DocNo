const express = require("express");
const router = express.Router();

const db = require("../config/db");
const authMiddleware = require("../middleware/authMiddleware");

// GET audit logs with filters
router.get("/", authMiddleware, async (req, res) => {
  try {
    let {
      search,
      action,
      startDate,
      endDate,
      page = 1,
      limit = 20,
    } = req.query;

    // ✅ Normalize inputs
    search = search?.trim() || "";
    action = action || "";
    startDate = startDate?.trim() || "";
    endDate = endDate?.trim() || "";

    const offset = (page - 1) * limit;

    let whereClauses = [];
    let values = [];

    // 🔍 Search filter
    if (search !== "") {
      whereClauses.push(`(al.details LIKE ? OR al.action LIKE ?)`);
      values.push(`%${search}%`, `%${search}%`);
    }

    // 🎯 Action filter
    if (action !== "") {
      whereClauses.push(`al.action = ?`);
      values.push(action);
    }

    // 📅 Date range filter
    if (startDate !== "" && endDate !== "") {
      whereClauses.push(`al.created_at BETWEEN ? AND ?`);
      values.push(
        `${startDate} 00:00:00`,
        `${endDate} 23:59:59`
      );
    }

    const whereSQL =
      whereClauses.length > 0
        ? `WHERE ${whereClauses.join(" AND ")}`
        : "";

    // 🔥 MAIN QUERY
    const [rows] = await db.query(
      `
      SELECT 
        al.id,
        al.created_at,
        al.action,
        al.details,

        d.title,
        dep.name AS department,
        cat.name AS category,

        u.full_name

      FROM audit_logs al

      LEFT JOIN documents d 
        ON al.entity_id = d.id
        AND al.entity_type = 'DOCUMENT'

      LEFT JOIN departments dep 
        ON d.department_id = dep.id

      LEFT JOIN categories cat 
        ON d.category_id = cat.id

      LEFT JOIN users u 
        ON al.user_id = u.id

      ${whereSQL}

      ORDER BY al.created_at DESC
      LIMIT ? OFFSET ?
      `,
      [...values, Number(limit), Number(offset)]
    );

    // 🔢 COUNT QUERY
    const [countRows] = await db.query(
      `
      SELECT COUNT(*) as total
      FROM audit_logs al
      ${whereSQL}
      `,
      values
    );

    res.json({
      data: rows,
      total: countRows[0].total,
      page: Number(page),
      limit: Number(limit),
    });

  } catch (err) {
    console.error("Audit Logs Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// 🚪 LOGOUT logging
router.post("/logout", authMiddleware, async (req, res) => {
  try {
    const logAction = require("../utils/auditLogger");

    await logAction({
      user_id: req.user.id,
      action: "LOGOUT",
    });

    res.json({ success: true });

  } catch (err) {
    console.error("Logout log error:", err);
    res.status(500).json({ message: "Logout logging failed" });
  }
});

module.exports = router;