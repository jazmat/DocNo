const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

const db = require("../config/db");
const authMiddleware = require("../middleware/authMiddleware");

/* UPDATE USER PROFILE */

router.put("/profile", authMiddleware, async (req, res) => {

    try {

        const { full_name } = req.body;

        await db.execute(
            "UPDATE users SET full_name=? WHERE id=?",
            [full_name, req.user.id]
        );

        res.json({ success: true });

    } catch (err) {

        console.error("Profile update error:", err);

        res.status(500).json({
            error: "Failed to update profile"
        });

    }

});


/* =====================================================
   CHANGE PASSWORD
===================================================== */

router.post(
    "/change-password",
    authMiddleware,
    async (req, res) => {
        try {
            const userId = req.user.id;

            const {
                current_password,
                new_password,
                confirm_password,
            } = req.body;

            if (!current_password || !new_password) {
                return res.status(400).json({
                    error: "Missing required fields",
                });
            }

            if (new_password !== confirm_password) {
                return res.status(400).json({
                    error: "Passwords do not match",
                });
            }

            /* FETCH CURRENT HASH */
            const [rows] = await db.execute(
                `SELECT password_hash FROM users WHERE id=?`,
                [userId]
            );

            if (!rows.length) {
                return res.status(404).json({
                    error: "User not found",
                });
            }

            const valid = await bcrypt.compare(
                current_password,
                rows[0].password_hash
            );

            if (!valid) {
                return res.status(401).json({
                    error: "Current password incorrect",
                });
            }

            /* HASH NEW PASSWORD */
            const newHash = await bcrypt.hash(new_password, 10);

            await db.execute(
                `UPDATE users SET password_hash=? WHERE id=?`,
                [newHash, userId]
            );

            res.json({
                message: "Password updated successfully",
            });

        } catch (error) {
            console.error("PASSWORD CHANGE ERROR:", error);
            res.status(500).json({
                error: "Failed to change password",
            });
        }
    }
);
router.get("/me", authMiddleware, async (req, res) => {

    const [rows] = await db.execute(
        `SELECT id, email, full_name, department_id
     FROM users
     WHERE id = ?`,
        [req.user.id]
    );

    res.json(rows[0]);

});
module.exports = router;