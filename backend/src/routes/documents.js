/**
 * File: backend/src/routes/documents.js
 * Purpose: Document generation + history
 */

const express = require("express");
const router = express.Router();

const authMiddleware = require("../../middleware/authMiddleware");
const db = require("../config/db");
const { sendDocumentEmail } = require("../services/emailService");

const departmentMap = {
  HR: 1,
  Finance: 2,
  IT: 3,
  Marketing: 4,
  Operations: 5,
};

const categoryMap = {
  Report: 1,
  Template: 2,
  Presentation: 3,
  Invoice: 4,
  Contract: 5,
  Proposal: 6,
  Memo: 7,
  Other: 8,
};

/* =====================================================
   GENERATE DOCUMENT
===================================================== */
router.post("/generate", authMiddleware, async (req, res) => {
  try {
    const user = req.user;

    const {
      document_title,
      document_category,
      department,
      notes,
    } = req.body;

    const department_id = departmentMap[department];
    const category_id = categoryMap[document_category];

    const documentNumber = `DOC-${Date.now()}`;

    await db.execute(
      `INSERT INTO documents
       (title, document_number, department_id, category_id, user_id)
       VALUES (?, ?, ?, ?, ?)`,
      [
        document_title,
        documentNumber,
        department_id,
        category_id,
        user.id,
      ]
    );

    await sendDocumentEmail(user.email, documentNumber)
      .catch(err => console.error("EMAIL FAILURE:", err.message));

    res.status(201).json({
      success: true,
      documentNumber,
      document_title,
      document_category,
      department,
      notes,
    });

  } catch (error) {
    console.error("DOCUMENT ERROR:", error);
    res.status(500).json({ error: "Failed to generate document" });
  }
});

/* =====================================================
   DOCUMENT HISTORY
===================================================== */
router.get("/history", authMiddleware, async (req, res) => {
  try {
    const user = req.user;

    const [rows] = await db.execute(
      `
      SELECT
        d.id,
        d.document_number,
        d.title,
        d.created_at,
        d.department_id,
        d.category_id
      FROM documents d
      WHERE d.user_id = ?
      ORDER BY d.created_at DESC
      `,
      [user.id]
    );

    res.json({
      success: true,
      documents: rows,
    });

  } catch (error) {
    console.error("HISTORY ERROR:", error);
    res.status(500).json({ error: "Failed to fetch history" });
  }
});

module.exports = router;