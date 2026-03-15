// src/utils/errors.js
const ErrorCodes = {
  USER_NOT_FOUND: 'USER_NOT_FOUND',
  EMAIL_EXISTS: 'EMAIL_EXISTS',
  USERNAME_EXISTS: 'USERNAME_EXISTS',
  INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',
  INVALID_TOKEN: 'INVALID_TOKEN',
  EXPIRED_TOKEN: 'EXPIRED_TOKEN',
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  DOCUMENT_NOT_FOUND: 'DOCUMENT_NOT_FOUND',
  INVALID_STATUS_TRANSITION: 'INVALID_STATUS_TRANSITION',
  DATABASE_ERROR: 'DATABASE_ERROR',
  EMAIL_NOT_SENT: 'EMAIL_NOT_SENT',
  RATE_LIMIT_EXCEEDED: 'RATE_LIMIT_EXCEEDED',
};

class AppError extends Error {
  constructor(message, statusCode, errorCode) {
    super(message);
    this.statusCode = statusCode || 500;
    this.errorCode = errorCode || 'INTERNAL_SERVER_ERROR';
  }
}

const ERROR_MESSAGES = {
  [ErrorCodes.USER_NOT_FOUND]: 'User not found',
  [ErrorCodes.EMAIL_EXISTS]: 'Email is already registered',
  [ErrorCodes.USERNAME_EXISTS]: 'Username is already taken',
  [ErrorCodes.INVALID_CREDENTIALS]: 'Invalid email or password',
  [ErrorCodes.INVALID_TOKEN]: 'Invalid token',
  [ErrorCodes.EXPIRED_TOKEN]: 'Token has expired',
  [ErrorCodes.UNAUTHORIZED]: 'Unauthorized access',
  [ErrorCodes.FORBIDDEN]: 'Forbidden access',
  [ErrorCodes.VALIDATION_ERROR]: 'Validation error',
  [ErrorCodes.DOCUMENT_NOT_FOUND]: 'Document not found',
  [ErrorCodes.INVALID_STATUS_TRANSITION]: 'Invalid status transition',
  [ErrorCodes.DATABASE_ERROR]: 'Database error occurred',
  [ErrorCodes.EMAIL_NOT_SENT]: 'Failed to send email',
  [ErrorCodes.RATE_LIMIT_EXCEEDED]: 'Too many requests, please try again later',
};

module.exports = {
  ErrorCodes,
  AppError,
  ERROR_MESSAGES,
};
