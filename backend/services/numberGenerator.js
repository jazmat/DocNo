const db = require("../config/db");

async function generateDocumentNumber(department_id, category_id) {

    const year = new Date().getFullYear();

    const connection = await db.getConnection();

    try {

        await connection.beginTransaction();

        /* LOCK SEQUENCE ROW */

        const [rows] = await connection.execute(
            `
      SELECT * FROM numbering_sequences
      WHERE department_id=? AND category_id=? AND year=?
      FOR UPDATE
      `,
            [department_id, category_id, year]
        );

        let nextValue;

        /* CREATE SEQUENCE IF NOT EXISTS */

        if (rows.length === 0) {

            nextValue = 1;

            await connection.execute(
                `
        INSERT INTO numbering_sequences
        (department_id, category_id, year, current_sequence)
        VALUES (?, ?, ?, ?)
        `,
                [department_id, category_id, year, nextValue]
            );

        } else {

            nextValue = rows[0].current_value + 1;

            await connection.execute(
                `
        UPDATE numbering_sequences
        SET current_sequence=?
        WHERE id=?
        `,
                [nextValue, rows[0].id]
            );

        }

        /* GET PREFIXES */

        const [[dep]] = await connection.execute(
            `SELECT prefix, sequence_length FROM departments WHERE id=?`,
            [department_id]
        );

        const [[cat]] = await connection.execute(
            `SELECT prefix FROM categories WHERE id=?`,
            [category_id]
        );

        const padded = String(nextValue).padStart(dep.sequence_length, "0");

        const documentNumber =
            `${dep.prefix}-${cat.prefix}-${year}-${padded}`;

        await connection.commit();

        return documentNumber;

    } catch (err) {

        await connection.rollback();
        throw err;

    } finally {

        connection.release();

    }

}

module.exports = generateDocumentNumber;