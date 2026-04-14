
const express = require("express");
const router = express.Router();
console.log("🔥 AUTH ROUTES LOADED");
const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middleware/authMiddleware");

// ✅ CENTRALIZED AUDIT LOGGER
const logAction = require("../utils/auditLogger");

/* =========================
   LOGIN
========================= */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    //console.log("LOGIN ATTEMPT:", email);

    const [rows] = await db.query(
      `
      SELECT
        id,
        email,
        full_name,
        password_hash,
        is_admin,
        is_super_admin
      FROM users
      WHERE email=?
      `,
      [email]
    );

    if (!rows.length) {
      //console.log("❌ USER NOT FOUND");
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const user = rows[0];

    const match = await bcrypt.compare(password, user.password_hash);

    if (!match) {
      //console.log("❌ PASSWORD FAILED");
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        full_name: user.full_name,
        is_admin: user.is_admin,
        is_super_admin: user.is_super_admin,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    //console.log("✅ LOGIN SUCCESS");

    // ✅ AUDIT LOG
    await logAction({
      user_id: user.id,
      action: "LOGIN",
    });

    return res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        full_name: user.full_name,
        is_admin: user.is_admin,
        is_super_admin: user.is_super_admin,
      },
    });

  } catch (err) {
    console.error("LOGIN ERROR:", err);
    return res.status(500).json({ error: "Server error" });
  }
});

/* =========================
   CHANGE PASSWORD
========================= */
router.post("/change-password", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ error: "Missing password" });
    }

    const [rows] = await db.query(
      "SELECT password_hash FROM users WHERE id=?",
      [userId]
    );

    if (!rows.length) {
      return res.status(404).json({ error: "User not found" });
    }

    const match = await bcrypt.compare(
      currentPassword,
      rows[0].password_hash
    );

    if (!match) {
      return res.status(400).json({ error: "Current password incorrect" });
    }

    const hash = await bcrypt.hash(newPassword, 10);

    await db.query(
      `
      UPDATE users
      SET password_hash=?
      WHERE id=?
      `,
      [hash, userId]
    );

    //console.log("🔐 PASSWORD CHANGED:", userId);

    // ✅ AUDIT LOG
    await logAction({
      user_id: userId,
      action: "CHANGE_PASSWORD",
    });

    res.json({ success: true });

  } catch (err) {
    console.error("CHANGE PASSWORD ERROR:", err);
    res.status(500).json({ error: "Server error" });
  }
});

/* =========================
   VERIFY TOKEN
========================= */
router.get("/verify", authMiddleware, (req, res) => {
  res.json({
    valid: true,
    user: req.user,
  });
});
const {
  sendRegistrationRequestEmail,
  sendRegistrationConfirmationEmail
} = require("../services/emailService");

router.post("/register-request", async (req, res) => {
  console.log("REGISTER REQUEST HIT");
  try {
    const data = req.body;

    console.log("REGISTER REQUEST (AUTH ROUTE):", data.email);

    // 🔥 Find department admin for sending approval email
    let adminEmail;

    // 🔥 STEP 1 — If requester wants ADMIN role → go to SuperAdmin
    if (data.requested_role === "admin") {

      const [superAdmins] = await db.query(
        `SELECT email FROM users WHERE is_super_admin = 1 LIMIT 1`
      );

      adminEmail = superAdmins[0].email;
      console.log("Admin Email-user admin role:", adminEmail);


    } else {

      // 🔥 STEP 2 — Try department admin
      const [admins] = await db.query(
        `SELECT email FROM users 
     WHERE department_id = ? AND is_admin = 1 
     LIMIT 1`,
        [data.department_id]
      );

      if (admins.length > 0) {
        adminEmail = admins[0].email;
        console.log("Admin Email-user role:", adminEmail);

      } else {
        // 🔥 STEP 3 — fallback to SuperAdmin
        const [superAdmins] = await db.query(
          `SELECT email FROM users WHERE is_super_admin = 1 LIMIT 1`
        );

        adminEmail = superAdmins[0].email;
        console.log("Admin Email-No Admin so S. Admin email:", adminEmail);

      }
    }
    // ✅ Save to DB
    await db.query(
      `INSERT INTO pending_users (full_name, email, department_id, requested_role)
   VALUES (?, ?, ?, ?)`,
      [
        data.full_name,
        data.email,
        data.department_id,
        data.requested_role
      ]
    );

    // ✅ Email to admin (🔥 THIS WAS MISSING)
    await sendRegistrationRequestEmail({
      adminEmail: adminEmail,
      full_name: data.full_name,
      email: data.email,
      department: data.department,
      requested_role: data.requested_role
    });

    // ✅ Email to requester
    await sendRegistrationConfirmationEmail(data);

    res.json({ success: true });

  } catch (err) {
    console.error("REGISTER EMAIL ERROR:", err);
    res.status(500).json({ error: "Email failed" });
  }
});
module.exports = router;