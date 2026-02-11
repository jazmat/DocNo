// src/services/documentNumberService.js
const Document = require('../models/Document');
const logger = require('../utils/logger');

const CATEGORY_CODES = {
    'Report': 'RPT',
    'Template': 'TMP',
    'Presentation': 'PRE',
    'Invoice': 'INV',
    'Contract': 'CTR',
    'Proposal': 'PRO',
    'Memo': 'MEM',
    'Other': 'OTH',
};

const getDepartmentCode = (department) => {
    const codes = {
        'Human Resources': 'HR',
        'Finance': 'FIN',
        'Information Technology': 'IT',
        'Marketing': 'MKTG',
        'Operations': 'OPS',
        'Sales': 'SAL',
        'Legal': 'LEG',
    };
    return codes[department] || department.substring(0, 4).toUpperCase();
};

const getUserInitials = (fullName) => {
    const parts = fullName.trim().split(/\s+/);
    if (parts.length >= 2) {
        return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return fullName.substring(0, 2).toUpperCase();
};

const generateDocumentNumber = async (department, category, fullName) => {
    try {
        const now = new Date();
        const dateString = now.toISOString().slice(0, 10).replace(/-/g, '');

        const deptCode = getDepartmentCode(department);
        const catCode = CATEGORY_CODES[category] || category.substring(0, 3).toUpperCase();
        const userInitials = getUserInitials(fullName);

        // Get daily sequence
        const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const endOfDay = new Date(startOfDay.getTime() + 24 * 60 * 60 * 1000);

        const count = await Document.count({
            where: {
                document_number: {
                    [require('sequelize').Op.like]: `${deptCode}-${catCode}-${dateString}%`,
                },
            },
        });

        const sequence = String(count + 1).padStart(3, '0');

        return `${deptCode}-${catCode}-${dateString}-${sequence}-${userInitials}`;
    } catch (error) {
        logger.error('Error generating document number:', error);
        throw error;
    }
};

module.exports = {
    generateDocumentNumber,
    getDepartmentCode,
    getUserInitials,
    CATEGORY_CODES,
};