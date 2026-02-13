// src/models/User.js
const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const User = sequelize.define(
    'User',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING(50),
            unique: true,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(100),
            unique: true,
            allowNull: false,
        },
        password_hash: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        full_name: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        department: {
            type: DataTypes.STRING(50),
        },
        is_active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
        is_admin: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        email_verified: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        verification_token: {
            type: DataTypes.STRING(100),
        },
        reset_token: {
            type: DataTypes.STRING(512),
        },
        reset_token_expiry: {
            type: DataTypes.DATE,
        },
    },
    {
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        indexes: [
            { fields: ['username'] },
            { fields: ['email'] },
        ],
    }
);

module.exports = User;