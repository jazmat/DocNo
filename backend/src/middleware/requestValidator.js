// src/middleware/requestValidator.js
const { AppError, ErrorCodes } = require('../utils/errors');

const validateRequest = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      const details = error.details.map((detail) => ({
        field: detail.path.join('.'),
        message: detail.message,
      }));

      return res.status(400).json({
        error: 'Validation error',
        errorCode: ErrorCodes.VALIDATION_ERROR,
        details,
      });
    }

    req.validatedData = value;
    next();
  };
};

const validateQuery = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.query, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      const details = error.details.map((detail) => ({
        field: detail.path.join('.'),
        message: detail.message,
      }));

      return res.status(400).json({
        error: 'Query validation error',
        errorCode: ErrorCodes.VALIDATION_ERROR,
        details,
      });
    }

    req.validatedQuery = value;
    next();
  };
};

module.exports = {
  validateRequest,
  validateQuery,
};
