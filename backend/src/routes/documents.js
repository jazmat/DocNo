// src/routes/documents.js
const express = require('express');
const { Op } = require('sequelize');
const Document = require('../models/Document');
const User = require('../models/User');
const { generateDocumentNumber } = require('../services/documentNumberService');
const { validateDocument } = require('../utils/validators');
const { authenticateToken, requireAdmin } = require('../middleware/auth');
const { logAction } = require('../services/auditService');
const { sendDocumentConfirmation } = require('../services/emailService');
const logger = require('../utils/logger');

const router = express.Router();

// Generate Document Number
router.post('/generate', authenticateToken, async (req, res, next) => {
    try {
        const { error, value } = validateDocument(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const user = await User.findByPk(req.user.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const documentNumber = await generateDocumentNumber(
            value.department,
            value.document_category,
            user.full_name
        );

        const document = await Document.create({
            document_number: documentNumber,
            user_id: req.user.id,
            full_name: user.full_name,
            email: user.email,
            document_title: value.document_title,
            document_category: value.document_category,
            department: value.department,
            metadata: { notes: value.notes },
        });

        await logAction(
            req.user.id,
            'CREATE_DOCUMENT',
            'documents',
            document.id,
            null,
            { document_number: documentNumber },
            req.ip,
            req.get('user-agent')
        );

        const documentData = {
            documentNumber: document.document_number,
            fullName: document.full_name,
            email: document.email,
            documentTitle: document.document_title,
            category: document.document_category,
            department: document.department,
            generatedDate: document.generated_at,
        };

        await sendDocumentConfirmation(user.email, documentData);

        logger.info(`Document generated: ${documentNumber} by user ${user.email}`);
        res.status(201).json({
            message: 'Document number generated successfully',
            document: {
                id: document.id,
                documentNumber: document.document_number,
                documentTitle: document.document_title,
                category: document.document_category,
                department: document.department,
                status: document.status,
                generatedAt: document.generated_at,
            },
        });
    } catch (error) {
        next(error);
    }
});

// Get Document History
router.get('/history', authenticateToken, async (req, res, next) => {
    try {
        const { page = 1, limit = 10, status, category } = req.query;

        const where = { user_id: req.user.id };
        if (status) where.status = status;
        if (category) where.document_category = category;

        const documents = await Document.findAndCountAll({
            where,
            offset: (page - 1) * limit,
            limit: parseInt(limit),
            order: [['generated_at', 'DESC']],
        });

        res.json({
            total: documents.count,
            pages: Math.ceil(documents.count / limit),
            currentPage: page,
            documents: documents.rows,
        });
    } catch (error) {
        next(error);
    }
});

// Get Document by ID
router.get('/:id', authenticateToken, async (req, res, next) => {
    try {
        const document = await Document.findByPk(req.params.id);

        if (!document) {
            return res.status(404).json({ error: 'Document not found' });
        }

        if (document.user_id !== req.user.id && !req.user.is_admin) {
            return res.status(403).json({ error: 'Access denied' });
        }

        res.json(document);
    } catch (error) {
        next(error);
    }
});

// Update Document Status
router.put('/:id/status', authenticateToken, async (req, res, next) => {
    try {
        const { status } = req.body;

        const document = await Document.findByPk(req.params.id);
        if (!document) {
            return res.status(404).json({ error: 'Document not found' });
        }

        if (document.user_id !== req.user.id && !req.user.is_admin) {
            return res.status(403).json({ error: 'Access denied' });
        }

        const oldValues = { status: document.status };
        await document.update({ status, last_used_at: new Date() });

        await logAction(
            req.user.id,
            'UPDATE_DOCUMENT',
            'documents',
            document.id,
            oldValues,
            { status },
            req.ip,
            req.get('user-agent')
        );

        logger.info(`Document status updated: ${document.document_number} to ${status}`);
        res.json({ message: 'Document status updated', document });
    } catch (error) {
        next(error);
    }
});

// Search Documents (Admin)
router.get('/search', authenticateToken, requireAdmin, async (req, res, next) => {
    try {
        const { query, category, department, startDate, endDate } = req.query;

        const where = {};
        if (query) {
            where[Op.or] = [
                { document_number: { [Op.like]: `%${query}%` } },
                { document_title: { [Op.like]: `%${query}%` } },
                { full_name: { [Op.like]: `%${query}%` } },
            ];
        }
        if (category) where.document_category = category;
        if (department) where.department = department;

        if (startDate || endDate) {
            where.generated_at = {};
            if (startDate) where.generated_at[Op.gte] = new Date(startDate);
            if (endDate) where.generated_at[Op.lte] = new Date(endDate);
        }

        const documents = await Document.findAll({ where, limit: 100 });
        res.json(documents);
    } catch (error) {
        next(error);
    }
});

// Get Statistics (Admin)
router.get('/stats', authenticateToken, requireAdmin, async (req, res, next) => {
    try {
        const totalDocuments = await Document.count();
        const documentsByCategory = await Document.count({
            attributes: ['document_category'],
            group: ['document_category'],
            raw: true,
        });
        const documentsByDepartment = await Document.count({
            attributes: ['department'],
            group: ['department'],
            raw: true,
        });
        const documentsByStatus = await Document.count({
            attributes: ['status'],
            group: ['status'],
            raw: true,
        });

        res.json({
            totalDocuments,
            byCategory: documentsByCategory,
            byDepartment: documentsByDepartment,
            byStatus: documentsByStatus,
        });
    } catch (error) {
        next(error);
    }
});

module.exports = router;