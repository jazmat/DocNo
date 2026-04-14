const { logAudit } = require("../utils/auditLogger");
const express = require("express");
const router = express.Router();

const db = require("../config/db");

const authMiddleware = require("../middleware/authMiddleware");

const generateDocumentNumber = require("../services/numberGenerator");
const { sendDocumentEmail } = require("../services/emailService");
router.get("/preview", authMiddleware, async (req, res) => {

  try {

    const { department_id, category_id } = req.query;

    if (!department_id || !category_id) {
      return res.json({
        success: true,
        preview: ""
      });
    }

    const year = new Date().getFullYear();

    /* GET PREFIX DATA */

    const [deptRows] = await db.execute(
      `SELECT prefix, sequence_length 
             FROM departments 
             WHERE id = ?`,
      [department_id]
    );

    const [catRows] = await db.execute(
      `SELECT prefix 
             FROM categories 
             WHERE id = ?`,
      [category_id]
    );

    if (!deptRows.length || !catRows.length) {
      return res.status(400).json({
        error: "Invalid department or category"
      });
    }

    const deptPrefix = deptRows[0].prefix;
    const seqLength = deptRows[0].sequence_length || 4;
    const catPrefix = catRows[0].prefix;

    /* GET CURRENT SEQUENCE */

    const [seqRows] = await db.execute(
      `SELECT current_sequence
             FROM numbering_sequences
             WHERE department_id=? AND year=?`,
      [department_id, year]
    );

    let nextSeq = 1;

    if (seqRows.length) {
      nextSeq = seqRows[0].current_sequence + 1;
    }

    const padded = String(nextSeq).padStart(seqLength, "0");

    const preview = `${deptPrefix}-${catPrefix}-${year}-${padded}`;

    res.json({
      success: true,
      preview
    });

  } catch (err) {

    console.error("PREVIEW ERROR:", err);

    res.status(500).json({
      error: "Preview failed"
    });

  }

});
/* =====================================================
   GENERATE DOCUMENT NUMBER
===================================================== */

router.post("/generate", authMiddleware, async (req, res) => {

  try {

    const { title, department_id, category_id } = req.body;

    const userId = req.user.id;

    const documentNumber = await generateDocumentNumber(
      department_id,
      category_id
    );

    // ✅ INSERT DOCUMENT
    const [result] = await db.execute(
      `INSERT INTO documents
        (title, document_number, department_id, category_id, user_id)
        VALUES (?, ?, ?, ?, ?)`,
      [
        title,
        documentNumber,
        department_id,
        category_id,
        userId
      ]
    );

    const newDocumentId = result.insertId; // ✅ IMPORTANT

    // ✅ NEW STRUCTURED AUDIT LOG
    await logAudit({
      user_id: userId,
      action: "GENERATE_DOCUMENT",
      entity_type: "DOCUMENT",
      entity_id: newDocumentId,
      details: documentNumber
    });

    res.json({
      document_number: documentNumber
    });

  } catch (err) {

    console.error("DOCUMENT GENERATION ERROR:", err);

    res.status(500).json({
      error: "Failed to generate document"
    });

  }

});

/* =====================================================
   DOCUMENT HISTORY
===================================================== */
router.get("/history", authMiddleware, async (req, res) => {
//console.log("USER:", req.user);
  try {

let query = "";
let params = [];

// ✅ SUPER ADMIN → ALL DATA
if (req.user.is_super_admin == 1) {

  query = "SELECT * FROM documents ORDER BY created_at DESC";

}

// ✅ ADMIN → ALL DATA IN THEIR DEPARTMENT
else if (req.user.is_admin == 1) {

query = `
  SELECT d.*
  FROM documents d
  JOIN users u ON d.user_id = u.id
  WHERE u.department_id = ?
  ORDER BY d.created_at DESC
`;
params = [req.user.department_id];

}

// ✅ USER → ONLY OWN DATA
else {
query = `
  SELECT d.*
  FROM documents d
  JOIN users u ON d.user_id = u.id
  WHERE u.id = ?
  ORDER BY d.created_at DESC
`;
params = [req.user.id];

}
//  query = "SELECT * FROM documents WHERE created_by = ? ORDER BY created_at DESC";
//  params = [req.user.id];

//console.log("PARAMS:", params);
const [rows] = await db.execute(query, params);

    res.json(rows);

  } 
  catch (err) {

  console.error("History error FULL:", err);

  res.status(500).json({
    error: err.message   // 👈 IMPORTANT
  });

}

});



router.get("/history", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;

    const [rows] = await db.execute(
      `
      SELECT id, title, document_number, created_at
      FROM documents
      WHERE userId = ?
      ORDER BY created_at DESC
      `,
      [userId]
    );

    res.json(rows);

  } catch (err) {
    console.error("HISTORY ERROR:", err);
    res.status(500).json({
      error: "Failed to load history",
    });
  }
});
router.get("/recent", authMiddleware, async (req, res) => {

  try {

    const [rows] = await db.execute(`
      SELECT id, document_number, title, created_at
      FROM documents
      ORDER BY created_at DESC
      LIMIT 5
    `);

    res.json(rows);

  } catch (err) {

    console.error("Recent documents error:", err);

    res.status(500).json({
      error: "Failed to load recent documents"
    });

  }

});

/* =====================================================
   TEST EMAIL ROUTE
===================================================== */

router.get("/test-email", async (req, res) => {
  try {
    await sendDocumentEmail(
      process.env.EMAIL_USER,
      "TEST-EMAIL-1234"
    );

    res.json({ success: true });

  } catch (err) {
    console.error("TEST EMAIL ERROR:", err);
    res.status(500).json({ error: "Email failed" });
  }
});
router.get("/stats", authMiddleware, async (req, res) => {

  try {

    const userId = req.user.id;

    const [today] = await db.execute(
      `SELECT COUNT(*) as total
       FROM documents
       WHERE user_id = ?
       AND DATE(created_at) = CURDATE()`,
      [userId]
    );

    const [week] = await db.execute(
      `SELECT COUNT(*) as total
       FROM documents
       WHERE user_id = ?
       AND YEARWEEK(created_at,1) = YEARWEEK(CURDATE(),1)`,
      [userId]
    );

    const [month] = await db.execute(
      `SELECT COUNT(*) as total
       FROM documents
       WHERE user_id = ?
       AND YEAR(created_at) = YEAR(CURDATE())
       AND MONTH(created_at) = MONTH(CURDATE())`,
      [userId]
    );

    res.json({
      today: today[0].total,
      week: week[0].total,
      month: month[0].total
    });

  } catch (err) {

    console.error("Stats error:", err);

    res.status(500).json({
      error: "Stats failed"
    });

  }

});

module.exports = router;