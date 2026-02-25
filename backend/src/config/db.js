/**
 * File: backend/src/config/db.js
 * Purpose: MySQL connection pool (MAMP compatible)
 */

const mysql = require("mysql2/promise");

const pool = mysql.createPool({
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 8889, // ✅ MAMP MySQL port
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "root",
    database: process.env.DB_NAME || "docno",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

console.log("✅ MySQL pool configured (MAMP)");

module.exports = pool;