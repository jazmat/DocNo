// frontend/src/services/authService.js
import api from './api';

const register = (userData) => api.post('/auth/register', userData);
const login = (email, password) => api.post('/auth/login', { email, password });
const logout = () => api.post('/auth/logout');
const resetPassword = (token, password) => api.post('/auth/reset-password', { token, password });
const forgotPassword = (email) => api.post('/auth/forgot-password', { email });

export default {
    register,
    login,
    logout,
    resetPassword,
    forgotPassword,
};