const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const db = require("../config/db");

/* =====================================================
   LOGIN
===================================================== */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const [users] = await db.execute(
      `
      SELECT
        id,
        email,
        full_name,
        password_hash,
        department,
        is_active,
        is_admin,
        is_super_admin
      FROM users
      WHERE email = ?
      `,
      [email]
    );

    if (!users.length) {
      return res.status(401).json({
        error: "Invalid credentials",
      });
    }

    const user = users[0];

    if (!user.is_active) {
      return res.status(403).json({
        error: "Account inactive",
      });
    }

    const passwordMatch = await bcrypt.compare(
      password,
      user.password_hash
    );

    if (!passwordMatch) {
      return res.status(401).json({
        error: "Invalid credentials",
      });
    }

    /* ===== JWT PAYLOAD ===== */
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        is_admin: !!user.is_admin,
        is_super_admin: !!user.is_super_admin,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRY || "24h" }
    );

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        full_name: user.full_name,
        department: user.department,
        is_admin: !!user.is_admin,
        is_super_admin: !!user.is_super_admin,
      },
    });

  } catch (error) {
    console.error("LOGIN ERROR:", error);
    res.status(500).json({
      error: "Login failed",
    });
  }
});

module.exports = router;