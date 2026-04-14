const express = require("express");
const router = express.Router();

const db = require("../config/db");
const authMiddleware = require("../middleware/authMiddleware");
const crypto = require("crypto");

/*
=================================
ADMIN DASHBOARD STATISTICS
=================================
*/

router.get("/stats", authMiddleware, async (req, res) => {

    try {

        const [docs] = await db.execute(
            "SELECT COUNT(*) AS count FROM documents"
        );

        const [pending] = await db.execute(
            "SELECT COUNT(*) AS count FROM pending_users WHERE status='pending'"
        );

        const [depts] = await db.execute(
            "SELECT COUNT(*) AS count FROM departments"
        );

        const [cats] = await db.execute(
            "SELECT COUNT(*) AS count FROM categories"
        );

        res.json({
            documents: docs[0].count,
            pendingUsers: pending[0].count,
            departments: depts[0].count,
            categories: cats[0].count
        });

    } catch (err) {

        console.error("ADMIN STATS ERROR:", err);

        res.status(500).json({
            error: "Failed to load admin statistics"
        });

    }

});


/*
=================================
GET PENDING USERS
=================================
*/

router.get("/pending", authMiddleware, async (req, res) => {

    try {

        const [rows] = await db.execute(`
            SELECT
                p.id,
                p.full_name,
                p.email,
                p.department_id,
                d.name AS department_name,
                p.requested_role,
                p.requested_at
            FROM pending_users p
            LEFT JOIN departments d
                ON p.department_id = d.id
            WHERE p.status='pending'
            ORDER BY p.requested_at DESC
        `);

        res.json(rows);

    } catch (err) {

        console.error("PENDING USERS ERROR:", err);

        res.status(500).json({
            error: "Failed to load pending users"
        });

    }

});


/*
=================================
APPROVE USER (ADMIN PANEL)
=================================
*/

router.post("/approve/:id", authMiddleware, async (req, res) => {

    try {

        const id = req.params.id;

        const [rows] = await db.execute(
            "SELECT * FROM pending_users WHERE id=?",
            [id]
        );

        if (!rows.length) {
            return res.status(404).json({
                error: "Request not found"
            });
        }

        const user = rows[0];

        /* GENERATE PASSWORD SETUP TOKEN */

        const token = crypto.randomBytes(32).toString("hex");

        /* CREATE USER ACCOUNT */

        await db.execute(`
      INSERT INTO users
      (
        full_name,
        email,
        department_id,
        role,
        is_active,
        reset_token,
        reset_token_expiry
      )
      VALUES (?, ?, ?, ?, 1, ?, DATE_ADD(NOW(), INTERVAL 24 HOUR))
    `,
            [
                user.full_name,
                user.email,
                user.department_id,
                user.requested_role || "user",
                token
            ]
        );

        /* UPDATE PENDING STATUS */

        await db.execute(
            "UPDATE pending_users SET status='approved' WHERE id=?",
            [id]
        );

        /* SEND APPROVAL EMAIL */

        try {

            const { sendRegistrationApprovedEmail } =
                require("../services/emailService");

            await sendRegistrationApprovedEmail({
                full_name: user.full_name,
                email: user.email,
                token
            });

            //console.log("✅ Approval email sent");

        } catch (emailErr) {

            //console.error("❌ Approval email failed:", emailErr);

        }

        res.json({ success: true });

    } catch (err) {

        console.error("USER APPROVAL ERROR:", err);

        res.status(500).json({
            error: "Failed to approve user"
        });

    }

});


/*
=================================
APPROVE USER FROM EMAIL
=================================
*/

router.get("/email-approve/:id", async (req, res) => {

    const id = req.params.id;

    try {

        const [rows] = await db.execute(
            "SELECT * FROM pending_users WHERE id=?",
            [id]
        );

        if (!rows.length) {
            return res.send("Request not found");
        }

        const user = rows[0];

        const token = crypto.randomBytes(32).toString("hex");

        await db.execute(`
            INSERT INTO users
            (
                full_name,
                email,
                department_id,
                role,
                is_active,
                reset_token,
                reset_token_expiry
            )
            VALUES (?, ?, ?, ?, 1, ?, DATE_ADD(NOW(), INTERVAL 24 HOUR))
        `,
            [
                user.full_name,
                user.email,
                user.department_id,
                user.requested_role || "user",
                token
            ]);

        await db.execute(
            "UPDATE pending_users SET status='approved' WHERE id=?",
            [id]
        );

        res.send(`
            <h2>User Approved</h2>
            <p>The account has been approved.</p>
        `);

    } catch (err) {

        console.error(err);

        res.status(500).send("Approval failed");

    }

});


/*
=================================
REJECT USER
=================================
*/

router.post("/reject/:id", authMiddleware, async (req, res) => {

    try {

        const id = req.params.id;

        await db.execute(`
            UPDATE pending_users
            SET status='rejected'
            WHERE id=?
        `, [id]);

        res.json({ success: true });

    } catch (err) {

        console.error("USER REJECT ERROR:", err);

        res.status(500).json({
            error: "Failed to reject user"
        });

    }

});


/*
=================================
EMAIL REJECT
=================================
*/

router.post("/email-reject/:id", async (req, res) => {

    const id = req.params.id;
    const { reason } = req.body;

    try {

        await db.execute(`
            UPDATE pending_users
            SET status='rejected',
                rejection_reason=?
            WHERE id=?
        `, [reason, id]);

        res.json({ success: true });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            error: "Reject failed"
        });

    }

});


module.exports = router;