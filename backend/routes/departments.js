const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
/*const pool = require("../config/db");*/
const db = require("../config/db");
/*
PUBLIC ROUTE
Used by:
- Register page
- Admin forms
*/

router.get("/", async (req, res) => {

  try {

    const [rows] = await pool.execute(`
      SELECT id, name
      FROM departments
      ORDER BY name
    `);

    res.json(rows);

  } catch (err) {

    console.error("Departments fetch error:", err);

    res.status(500).json({
      error: "Failed to load departments"
    });

  }

});
router.get("/", authMiddleware, async (req, res) => {

  try {

    const [rows] = await db.execute(`
      SELECT id, name, prefix
      FROM departments
      WHERE is_active = 1
      ORDER BY name
    `);

    res.json(rows);

  } catch (err) {

    console.error("Departments load error:", err);

    res.status(500).json({
      error: "Failed loading departments"
    });

  }

});
module.exports = router;