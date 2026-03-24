const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const db = require("../config/db");
const authMiddleware = require("../middleware/authMiddleware");

/*
LOGIN
*/

router.post("/login", async (req, res) => {

  try {

    const { email, password } = req.body;

    console.log("LOGIN ATTEMPT:", email);

    const [rows] = await db.execute(
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
      console.log("❌ USER NOT FOUND");
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const user = rows[0];

    const match = await bcrypt.compare(
      password,
      user.password_hash
    );

    if (!match) {
      console.log("❌ PASSWORD FAILED");
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({
      id: user.id,
      email: user.email,
      full_name: user.full_name,
      is_admin: user.is_admin,
      is_super_admin: user.is_super_admin
    }, process.env.JWT_SECRET);
    console.log("✅ LOGIN SUCCESS");

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        full_name: user.full_name,
        is_admin: user.is_admin,
        is_super_admin: user.is_super_admin
      }
    });

  } catch (err) {

    console.error("LOGIN ERROR:", err);

    res.status(500).json({
      error: "Server error"
    });

  }

});
/* =========================
   REGISTER REQUEST
========================= */

router.post("/register-request", async (req, res) => {

  try {

    const {
      full_name,
      email,
      department_id,
      requested_role
    } = req.body;

    if (!full_name || !email || !department_id) {
      return res.status(400).json({
        error: "Missing required fields"
      });
    }

    /* check if email already exists */

    const [existing] = await db.execute(
      "SELECT id FROM users WHERE email=?",
      [email]
    );

    if (existing.length > 0) {
      return res.status(400).json({
        error: "Email already registered"
      });
    }

    /* insert pending user */

/* CHECK ALLOWED EMAIL DOMAIN */
    const domain = email.split("@")[1];

    const [allowedDomains] = await db.execute(
      "SELECT * FROM allowed_email_domains WHERE domain=? AND is_active=1",
      [domain]
    );

    if (!allowedDomains.length) {
      return res.status(400).json({
        error: "Email domain not allowed"
      });
    }

if (!allowedDomains.length) {
  return res.status(400).json({
    error: "Email domain not allowed"
  });
}
    await db.execute(`
      INSERT INTO pending_users
      (full_name, email, department_id, requested_role)
      VALUES (?, ?, ?, ?)
    `, [
      full_name,
      email,
      department_id,
      requested_role || "user"
    ]);

    /* get department name */

    const [dept] = await db.execute(
      "SELECT name FROM departments WHERE id=?",
      [department_id]
    );

    const departmentName = dept.length ? dept[0].name : "Unknown";

    /* find department admin */

    let adminEmail = null;

    /* ADMIN REQUESTS MUST GO TO SUPER ADMIN */

    if (requested_role === "admin") {

      const [rows] = await db.execute(
        `SELECT email
     FROM users
     WHERE is_super_admin=1
     AND is_active=1
     LIMIT 1`
      );

      if (rows.length) adminEmail = rows[0].email;

    } else {

      const [rows] = await db.execute(
        `SELECT email
     FROM users
     WHERE
       (department_id=? AND role='admin')
       OR is_super_admin=1
     AND is_active=1
     ORDER BY role='admin' DESC
     LIMIT 1`,
        [department_id]
      );

      if (rows.length) adminEmail = rows[0].email;

    }

    if (!adminEmail) {
      return res.status(500).json({
        error: "No administrator available to receive registration request"
      });
    }

    const {
      sendRegistrationRequestEmail,
      sendRegistrationConfirmationEmail
    } = require("../services/emailService");

    /* send admin email (mandatory) */

    /* =========================
       FIND APPROVAL RECIPIENT
    ========================= */


    /* If requester asks for ADMIN role → SuperAdmin approval required */

    if (requested_role === "admin") {

      const [superAdmins] = await db.execute(
        `SELECT email FROM users
     WHERE is_super_admin=1
     LIMIT 1`
      );

      if (superAdmins.length) {
        adminEmail = superAdmins[0].email;
      }

    } else {

      /* Try department admin first */

      const [admins] = await db.execute(
        `SELECT email FROM users
     WHERE department_id=? 
     AND role='admin'
     AND is_active=1
     LIMIT 1`,
        [department_id]
      );

      if (admins.length) {

        adminEmail = admins[0].email;

      } else {

        /* fallback to super admin */

        const [superAdmins] = await db.execute(
          `SELECT email FROM users
       WHERE is_super_admin=1
       LIMIT 1`
        );

        if (superAdmins.length) {
          adminEmail = superAdmins[0].email;
        }

      }

    }

    /* Safety check */

    if (!adminEmail) {
      throw new Error("No administrator available to approve registration");
    }

console.log("Registration approval request sent to:", adminEmail);

await sendRegistrationRequestEmail({
  adminEmail,
  full_name,
  email,
  department: departmentName,
  requested_role
});
    /* send requester confirmation (optional) */

    try {

      await sendRegistrationConfirmationEmail({
        email: email,
        full_name: full_name,
        department: departmentName
      });

    } catch (err) {

      console.warn("Requester confirmation email failed:", err.message);

    }

    res.json({ success: true });

  } catch (err) {

    console.error("REGISTER REQUEST ERROR:", err);

    res.status(500).json({
      error: "Registration request failed"
    });

  }

});
/*
CHANGE PASSWORD (PROFILE PAGE)
*/

router.post("/change-password", authMiddleware, async (req, res) => {

  try {

    const userId = req.user.id;

    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        error: "Missing password"
      });
    }

    const [rows] = await db.execute(
      "SELECT password_hash FROM users WHERE id=?",
      [userId]
    );

    if (!rows.length) {
      return res.status(404).json({
        error: "User not found"
      });
    }

    const match = await bcrypt.compare(
      currentPassword,
      rows[0].password_hash
    );

    if (!match) {
      return res.status(400).json({
        error: "Current password incorrect"
      });
    }

    const hash = await bcrypt.hash(newPassword, 10);

    await db.execute(
      `
      UPDATE users
      SET password_hash=?
      WHERE id=?
      `,
      [hash, userId]
    );

    console.log("Password updated for user:", userId);

    res.json({ success: true });

  } catch (err) {

    console.error("CHANGE PASSWORD ERROR:", err);

    res.status(500).json({
      error: "Server error"
    });

  }

});


/*
VERIFY TOKEN
*/

router.get("/verify", authMiddleware, (req, res) => {

  res.json({
    valid: true,
    user: req.user
  });

});


module.exports = router;