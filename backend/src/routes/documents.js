/**
 * File: backend/src/routes/documents.js
 * Stable version – document generation + history
 */

const express = require("express");
const router = express.Router();

const authMiddleware = require("../../middleware/authMiddleware");
const db = require("../config/db");
const { sendDocumentEmail } = require("../services/emailService");

/* =====================================================
   GENERATE DOCUMENT
===================================================== */
router.post("/generate", authMiddleware, async (req, res) => {
  try {
    const user = req.user;

    const document_title = req.body.document_title;
    const category_id = Number(req.body.category_id);
    const department_id = Number(req.body.department_id);

    if (!document_title || !category_id || !department_id) {
      return res.status(400).json({
        error: "Invalid department or category",
      });
    }

    const documentNumber = `DOC-${Date.now()}`;

    await db.execute(
      `
      INSERT INTO documents
      (title, document_number, department_id, category_id, user_id)
      VALUES (?, ?, ?, ?, ?)
      `,
      [
        document_title,
        documentNumber,
        department_id,
        category_id,
        user.id,
      ]
    );

    console.log("✅ Document saved:", documentNumber);

    // fire-and-forget email
    sendDocumentEmail(user.email, documentNumber)
      .catch(err => console.error("EMAIL FAILURE:", err.message));

    res.status(201).json({
      success: true,
      documentNumber,
    });

  } catch (error) {
    console.error("DOCUMENT ERROR:", error);
    res.status(500).json({
      error: "Failed to generate document",
    });
  }
});

/* =====================================================
   HISTORY
===================================================== */
router.get("/history", authMiddleware, async (req, res) => {
  try {

    const [rows] = await db.execute(
      `
      SELECT
        d.id,
        d.document_number,
        d.title,
        d.created_at,
        dep.name AS department_name,
        cat.name AS category_name
      FROM documents d
      LEFT JOIN departments dep
        ON dep.id = d.department_id
      LEFT JOIN document_categories cat
        ON cat.id = d.category_id
      WHERE d.user_id = ?
      ORDER BY d.created_at DESC
      `,
      [req.user.id]
    );

    const documents = rows.map(r => ({
      id: r.id,
      document_number: r.document_number,
      title: r.title,
      created_at: r.created_at,
      department: r.department_name || "Unknown",
      category: r.category_name || "Unknown",
    }));
    console.log("HISTORY RESULT:", documents);
    res.json({
      success: true,
      documents,
    });

  } catch (error) {
    console.error("HISTORY ERROR:", error);
    res.status(500).json({
      error: "Failed to fetch history",
    });
  }
});

module.exports = router;