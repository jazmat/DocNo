/**
 * File: backend/server.js
 */

require('dotenv').config(); // MUST BE FIRST

const app = require('./src/app');

const PORT = process.env.PORT || 7050;

console.log("SMTP HOST:", process.env.SMTP_HOST);
console.log("SMTP PORT:", process.env.SMTP_PORT);

app.listen(PORT, () => {
    console.log(`🚀 Server running on ${PORT}`);
});