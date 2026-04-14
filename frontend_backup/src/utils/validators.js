// frontend/src/utils/validators.js
export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&])/;

export const validateEmail = (email) => {
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  if (password.length < 8) {
    return { valid: false, message: 'Password must be at least 8 characters' };
  }
  if (!passwordRegex.test(password)) {
    return {
      valid: false,
      message: 'Password must contain uppercase letter, number, and special character',
    };
  }
  return { valid: true };
};
