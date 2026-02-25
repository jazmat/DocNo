/**
 * File: backend/src/routes/auth.js
 * Purpose: Authentication routes (Login)
 * Project: DocNo
 */

const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();

/**
 * POST /api/auth/login
 * Basic login endpoint
 *
 * NOTE:
 * This is a stabilization version.
 * Replace DB lookup later with MySQL query.
 */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Temporary validation (matches existing frontend expectations)
    if (!email || !password) {
      return res.status(400).json({
        error: "Email and password required",
      });
    }

    /**
     * TODO:
     * Replace with MySQL user validation
     * For now we simulate authenticated user
     */

    const user = {
      id: 1,
      email,
      role: "admin",
    };

    // Create JWT
    const token = jwt.sign(user, process.env.JWT_SECRET, {
      expiresIn: "8h",
    });

    return res.json({
      token,
      user,
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error);

    return res.status(500).json({
      error: "Login failed",
    });
  }
});

module.exports = router;