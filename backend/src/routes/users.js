// src/routes/users.js
const express = require('express');
const User = require('../models/User');
const { hashPassword, comparePassword } = require('../utils/passwordHash');
const { authenticateToken } = require('../middleware/auth');
const { logAction } = require('../services/auditService');
const logger = require('../utils/logger');

const router = express.Router();

// Get Profile
router.get('/profile', authenticateToken, async (req, res, next) => {
    try {
        const user = await User.findByPk(req.user.id, {
            attributes: { exclude: ['password_hash', 'reset_token'] },
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        next(error);
    }
});

// Update Profile
router.put('/profile', authenticateToken, async (req, res, next) => {
    try {
        const { full_name, department } = req.body;

        const user = await User.findByPk(req.user.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const oldValues = { full_name: user.full_name, department: user.department };
        await user.update({ full_name, department });

        await logAction(
            req.user.id,
            'UPDATE_PROFILE',
            'users',
            user.id,
            oldValues,
            { full_name, department },
            req.ip,
            req.get('user-agent')
        );

        logger.info(`Profile updated for user: ${user.email}`);
        res.json({ message: 'Profile updated successfully', user });
    } catch (error) {
        next(error);
    }
});

// Change Password
router.put('/change-password', authenticateToken, async (req, res, next) => {
    try {
        const { oldPassword, newPassword } = req.body;

        const user = await User.findByPk(req.user.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const isPasswordValid = await comparePassword(oldPassword, user.password_hash);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Current password is incorrect' });
        }

        const password_hash = await hashPassword(newPassword);
        await user.update({ password_hash });

        await logAction(
            req.user.id,
            'CHANGE_PASSWORD',
            'users',
            user.id,
            null,
            null,
            req.ip,
            req.get('user-agent')
        );

        logger.info(`Password changed for user: ${user.email}`);
        res.json({ message: 'Password changed successfully' });
    } catch (error) {
        next(error);
    }
});

module.exports = router;