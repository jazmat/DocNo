const express = require("express");
const router = express.Router();

const db = require("../config/db"); 
const authMiddleware = require("../middleware/authMiddleware");

/*
=================================
GET ALL CATEGORIES
=================================
*/

router.get("/", authMiddleware, async (req, res) => {

    try {

        const [rows] = await db.execute(`
            SELECT
                id,
                name,
                prefix,
                is_active
            FROM categories
            ORDER BY name
        `);

        res.json(rows);

    } catch (err) {

        console.error("CATEGORIES FETCH ERROR:", err);

        res.status(500).json({
            error: "Failed to load categories"
        });

    }

});

/*
=================================
CREATE CATEGORY
=================================
*/

router.post("/", authMiddleware, async (req, res) => {

    try {

        const { name, code } = req.body;

        if (!name || !code) {

            return res.status(400).json({
                error: "Name and code are required"
            });

        }

        await db.execute(`
            INSERT INTO categories
            (
                name,
                code,
                is_active
            )
            VALUES (?, ?, 1)
        `, [name, code]);

        res.json({
            success: true
        });

    } catch (err) {

        console.error("CATEGORY CREATE ERROR:", err);

        res.status(500).json({
            error: "Failed to create category"
        });

    }

});

/*
=================================
UPDATE CATEGORY
=================================
*/

router.put("/:id", authMiddleware, async (req, res) => {

    try {

        const id = req.params.id;

        const { name, code, is_active } = req.body;

        await db.execute(`
            UPDATE categories
            SET
                name=?,
                code=?,
                is_active=?
            WHERE id=?
        `, [
            name,
            code,
            is_active ? 1 : 0,
            id
        ]);

        res.json({
            success: true
        });

    } catch (err) {

        console.error("CATEGORY UPDATE ERROR:", err);

        res.status(500).json({
            error: "Failed to update category"
        });

    }

});

module.exports = router;