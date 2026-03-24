const db = require("../config/db");

/*
  Audit Logging Service
  Logs important system actions into audit_logs table
*/

async function logAudit(userId, action, entityType = null, entityId = null, details = null) {

    try {

        await db.execute(
            `
      INSERT INTO audit_logs
      (user_id, action, entity_type, entity_id, details, created_at)
      VALUES (?, ?, ?, ?, ?, NOW())
      `,
            [
                userId || null,
                action,
                entityType,
                entityId,
                details
            ]
        );

    } catch (error) {

        console.error("Audit logging failed:", error.message);

    }

}

module.exports = logAudit;