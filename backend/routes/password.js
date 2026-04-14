const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const db = require("../config/db");

const { sendPasswordResetEmail } =
    require("../services/emailService");


/*
FORGOT PASSWORD
*/

router.post("/forgot", async (req, res) => {

    try {

        const { email } = req.body;

        const [rows] = await db.execute(
            "SELECT id, email FROM users WHERE email=?",
            [email]
        );

        if (!rows.length) {
            return res.status(404).json({
                error: "Email not found"
            });
        }
        const token = crypto.randomBytes(32).toString("hex");

        await db.execute(`
      UPDATE users
      SET
        reset_token=?, reset_token_expiry=DATE_ADD(NOW(), INTERVAL 1 HOUR)
      WHERE email=?
      `,
            [token, email]
        );
        const resetLink =
            `http://localhost:3001/reset-password?token=${token}`;

        await sendPasswordResetEmail({
            email,
            token
        });
        res.json({ success: true });

    } catch (err) {

        console.error("FORGOT PASSWORD ERROR:", err);

        res.status(500).json({
            error: "Failed to send reset email"
        });

    }

});


/*
RESET PASSWORD
*/

router.post("/reset", async (req, res) => {

    try {

        const { token, password } = req.body;

        if (!token || !password) {
            return res.status(400).json({
                error: "Invalid request"
            });
        }

        const [rows] = await db.execute(`
      SELECT id
      FROM users
      WHERE reset_token=?
      AND reset_token_expiry > NOW()
    `, [token]);

        if (!rows.length) {
            return res.status(400).json({
                error: "Invalid or expired link"
            });
        }

        const hash = await bcrypt.hash(password, 10);

        await db.execute(`
      UPDATE users
      SET
        password_hash=?,
        reset_token=NULL,
        reset_token_expiry=NULL
      WHERE id=?
    `, [hash, rows[0].id]);

        res.json({ success: true });

    } catch (err) {

        console.error("RESET PASSWORD ERROR:", err);

        res.status(500).json({
            error: "Failed to update password"
        });

    }

});


module.exports = router;