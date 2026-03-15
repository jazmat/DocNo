const express = require("express");
const router = express.Router();

const db = require("../config/db");
const authMiddleware = require("../middleware/authMiddleware");

/*
=================================
SEQUENCE INTEGRITY CHECK
=================================
*/

router.get("/", authMiddleware, async (req, res) => {

    try {

        const [rows] = await db.execute(`
            SELECT
                s.department_id,
                s.category_id,
                s.year,
                s.current_sequence,

                MAX(
                    CAST(
                        SUBSTRING_INDEX(d.document_number, '-', -1) AS UNSIGNED
                    )
                ) AS highest_document_sequence

            FROM numbering_sequences s

            LEFT JOIN documents d
                ON d.department_id = s.department_id
                AND d.category_id = s.category_id
                AND d.document_number LIKE CONCAT('%-', s.year, '-%')

            GROUP BY
                s.department_id,
                s.category_id,
                s.year,
                s.current_sequence

            ORDER BY
                s.year DESC
        `);

        res.json(rows);

    } catch (err) {

        console.error("SEQUENCE AUDIT ERROR:", err);

        res.status(500).json({
            error: "Failed to check sequence integrity"
        });

    }

});

module.exports = router;