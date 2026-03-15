// src/utils/passwordHash.js
const bcrypt = require('bcryptjs');

const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
};

const comparePassword = async (password, passwordHash) => {
    return bcrypt.compare(password, passwordHash);
};

module.exports = {
    hashPassword,
    comparePassword,
};