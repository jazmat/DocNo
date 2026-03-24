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
    dpt.name AS department_name,
    s.category_id,
    cat.name AS category_name,
    s.year,
    s.current_sequence,

    COALESCE(MAX(
        CAST(SUBSTRING_INDEX(d.document_number, '-', -1) AS UNSIGNED)
    ), 0) AS highest_document_sequence

FROM numbering_sequences s

LEFT JOIN departments dpt ON dpt.id = s.department_id
LEFT JOIN categories cat ON cat.id = s.category_id

LEFT JOIN documents d
    ON d.department_id = s.department_id
    AND d.category_id = s.category_id
    AND d.year = s.year   -- ✅ BEST FIX

GROUP BY
    s.department_id,
    dpt.name,
    s.category_id,
    cat.name,
    s.year,
    s.current_sequence
ORDER BY s.year DESC;
        `);
        /*        console.log("AUDIT SEQUENCES RESULT:", rows);*/
        res.json(rows);
        /*console.log("AUDIT SEQUENCES SENT TO FRONTEND:", rows);*/
    } catch (err) {

        console.error("SEQUENCE AUDIT ERROR:", err);

        res.status(500).json({
            error: "Failed to check sequence integrity"
        });

    }

});

module.exports = router;