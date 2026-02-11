// src/models/AuditLog.js
const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const User = require('./User');

const AuditLog = sequelize.define(
    'AuditLog',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: User,
                key: 'id',
            },
        },
        action: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        table_name: {
            type: DataTypes.STRING(50),
        },
        record_id: {
            type: DataTypes.INTEGER,
        },
        old_values: {
            type: DataTypes.JSON,
        },
        new_values: {
            type: DataTypes.JSON,
        },
        ip_address: {
            type: DataTypes.STRING(45),
        },
        user_agent: {
            type: DataTypes.TEXT,
        },
    },
    {
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: false,
        indexes: [
            { fields: ['user_id'] },
            { fields: ['action'] },
            { fields: ['created_at'] },
        ],
    }
);

AuditLog.belongsTo(User, { foreignKey: 'user_id' });

module.exports = AuditLog;