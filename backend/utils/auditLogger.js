const db = require("../config/db");

async function logAction({
    user_id,
    action,
    entity_type = null,
    entity_id = null,
    details = null,
}) {
    try {
        await db.query(
            `
      INSERT INTO audit_logs
      (user_id, action, entity_type, entity_id, details)
      VALUES (?, ?, ?, ?, ?)
      `,
            [user_id, action, entity_type, entity_id, details]
        );
    } catch (err) {
        console.error("❌ AUDIT LOG FAILED:", err);
    }
}

module.exports = logAction;