// src/services/auditService.js
const AuditLog = require('../models/AuditLog');
const logger = require('../utils/logger');

const logAction = async (userId, action, tableName, recordId, oldValues, newValues, ipAddress, userAgent) => {
    try {
        await AuditLog.create({
            user_id: userId,
            action,
            table_name: tableName,
            record_id: recordId,
            old_values: oldValues,
            new_values: newValues,
            ip_address: ipAddress,
            user_agent: userAgent,
        });
    } catch (error) {
        logger.error('Error logging audit action:', error);
    }
};

module.exports = {
    logAction,
};