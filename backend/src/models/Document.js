// src/models/Document.js
const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const User = require('./User');

const Document = sequelize.define(
    'Document',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        document_number: {
            type: DataTypes.STRING(50),
            unique: true,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: User,
                key: 'id',
            },
        },
        full_name: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        document_title: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        document_category: {
            type: DataTypes.ENUM('Report', 'Template', 'Presentation', 'Invoice', 'Contract', 'Proposal', 'Memo', 'Other'),
            allowNull: false,
        },
        department: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM('generated', 'in_use', 'archived'),
            defaultValue: 'generated',
        },
        last_used_at: {
            type: DataTypes.DATE,
        },
        metadata: {
            type: DataTypes.JSON,
        },
    },
    {
        timestamps: true,
        createdAt: 'generated_at',
        updatedAt: 'updated_at',
        indexes: [
            { fields: ['document_number'] },
            { fields: ['user_id'] },
            { fields: ['document_category'] },
            { fields: ['department'] },
            { fields: ['generated_at'] },
        ],
    }
);

Document.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(Document, { foreignKey: 'user_id' });

module.exports = Document;