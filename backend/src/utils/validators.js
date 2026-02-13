// src/utils/validators.js
const Joi = require("joi");

const registerSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .min(8)
    .pattern(
      new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z0-9@$!%*?&]{8,}$"),
    )
    .required()
    .messages({
      "string.pattern.base":
        "Password must contain at least one uppercase letter, one lowercase letter, and one number",
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
    .valid(
      "Report",
      "Template",
      "Presentation",
      "Invoice",
      "Contract",
      "Proposal",
      "Memo",
      "Other",
    )
    .required(),
  department: Joi.string().required(),
  notes: Joi.string().allow(""),
});

const statusUpdateSchema = Joi.object({
  status: Joi.string().valid("generated", "in_use", "archived").required(),
});

// Valid status transitions
const VALID_STATUS_TRANSITIONS = {
  generated: ["in_use", "archived"],
  in_use: ["archived", "generated"],
  archived: [], // archived is final state
};

const validateStatusTransition = (currentStatus, newStatus) => {
  const validTransitions = VALID_STATUS_TRANSITIONS[currentStatus];
  return validTransitions && validTransitions.includes(newStatus);
};

const validateRegister = (data) => registerSchema.validate(data);
const validateLogin = (data) => loginSchema.validate(data);
const validateDocument = (data) => documentSchema.validate(data);
const validateStatusUpdate = (data) => statusUpdateSchema.validate(data);

module.exports = {
  validateRegister,
  validateLogin,
  validateDocument,
  validateStatusUpdate,
  validateStatusTransition,
  VALID_STATUS_TRANSITIONS,
};
