// src/utils/validators.js
const Joi = require('joi');

const registerSchema = Joi.object({
    username: Joi.string().alphanum().min(3).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string()
        .min(8)
        .pattern(new RegExp('^[a-zA-Z0-9@$!%*?&]{8,}$'))
        .required()
        .messages({
            'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, and one number',
        }),
    full_name: Joi.string().max(100).required(),
    department: Joi.string().max(50),
});

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

const documentSchema = Joi.object({
    document_title: Joi.string().max(255).required(),
    document_category: Joi.string()
        .valid('Report', 'Template', 'Presentation', 'Invoice', 'Contract', 'Proposal', 'Memo', 'Other')
        .required(),
    department: Joi.string().required(),
    notes: Joi.string().allow(''),
});

const validateRegister = (data) => registerSchema.validate(data);
const validateLogin = (data) => loginSchema.validate(data);
const validateDocument = (data) => documentSchema.validate(data);

module.exports = {
    validateRegister,
    validateLogin,
    validateDocument,
};