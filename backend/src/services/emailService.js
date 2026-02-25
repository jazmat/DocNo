/**
 * File: backend/src/services/emailService.js
 * Gmail SMTP using existing .env variables
 */

const nodemailer = require("nodemailer");

console.log("📧 Email service initializing...");

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  secure: false, // TLS upgrade (required for 587)
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendDocumentEmail(to, documentNumber) {
  console.log("📧 Attempting email send...");
  console.log("SMTP HOST:", process.env.EMAIL_HOST);
  console.log("SMTP PORT:", process.env.EMAIL_PORT);
  console.log("TO:", to);

  const info = await transporter.sendMail({
    from: `"DocNo" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Document Number Generated",
    html: `
      <h2>Document Created Successfully</h2>
      <p>Your document number:</p>
      <h3>${documentNumber}</h3>
    `,
  });

  console.log("✅ Email sent:", info.messageId);
}

module.exports = {
  sendDocumentEmail,
};