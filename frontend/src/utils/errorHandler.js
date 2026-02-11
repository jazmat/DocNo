// frontend/src/utils/errorHandler.js
const ERROR_MESSAGES = {
  USER_NOT_FOUND: 'User not found',
  EMAIL_EXISTS: 'Email is already registered',
  USERNAME_EXISTS: 'Username is already taken',
  INVALID_CREDENTIALS: 'Invalid email or password',
  INVALID_TOKEN: 'Invalid token',
  EXPIRED_TOKEN: 'Token has expired',
  UNAUTHORIZED: 'Unauthorized access',
  FORBIDDEN: 'Forbidden access',
  VALIDATION_ERROR: 'Validation error',
  DOCUMENT_NOT_FOUND: 'Document not found',
  INVALID_STATUS_TRANSITION: 'Invalid status transition',
  DATABASE_ERROR: 'Database error occurred',
  EMAIL_NOT_SENT: 'Failed to send email',
  RATE_LIMIT_EXCEEDED: 'Too many requests, please try again later',
};

export const handleApiError = (error) => {
  if (error.response?.data?.errorCode) {
    return ERROR_MESSAGES[error.response.data.errorCode] || error.response.data.error;
  }
  
  if (error.response?.status === 429) {
    return ERROR_MESSAGES.RATE_LIMIT_EXCEEDED;
  }
  
  if (error.response?.status === 401) {
    return ERROR_MESSAGES.UNAUTHORIZED;
  }
  
  if (error.response?.status === 403) {
    return ERROR_MESSAGES.FORBIDDEN;
  }
  
  return error.response?.data?.error || 'An unexpected error occurred';
};
