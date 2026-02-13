// src/services/emailService.js
const nodemailer = require("nodemailer");
const logger = require("../utils/logger");
require("dotenv").config();
///////////////////
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || "smtp.gmail.com",
  port: process.env.EMAIL_PORT || 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
  debug: true,      // ADD THIS
  logger: true      // ADD THIS
});
///////////////////
/*const transporter = nodemailer.createTransport({
  //host: process.env.EMAIL_HOST || "smtp.company.com",
  host: process.env.EMAIL_HOST || "smtp.gmail.com",
port: process.env.EMAIL_PORT || 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});
*/
const sendDocumentConfirmation = async (email, documentData) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Document Number Generated: ${documentData.documentNumber}`,
      html: `
        <h2>Document Number Generated Successfully</h2>
        <p>Dear ${documentData.fullName},</p>
        <p>Your document has been generated with the following details:</p>
        <table style="border-collapse: collapse; width: 100%;">
          <tr>
            <td style="border: 1px solid #ddd; padding: 8px;"><strong>Document Number:</strong></td>
            <td style="border: 1px solid #ddd; padding: 8px;">${documentData.documentNumber}</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 8px;"><strong>Title:</strong></td>
            <td style="border: 1px solid #ddd; padding: 8px;">${documentData.documentTitle}</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 8px;"><strong>Category:</strong></td>
            <td style="border: 1px solid #ddd; padding: 8px;">${documentData.category}</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 8px;"><strong>Department:</strong></td>
            <td style="border: 1px solid #ddd; padding: 8px;">${documentData.department}</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 8px;"><strong>Generated Date:</strong></td>
            <td style="border: 1px solid #ddd; padding: 8px;">${documentData.generatedDate}</td>
          </tr>
        </table>
        <p>Thank you!</p>
      `,
    };
    
    await transporter.sendMail(mailOptions);
    logger.info(`Document confirmation email sent to ${email}`);
  } catch (error) {
    logger.error("Error sending document confirmation email:", error);
    // Don't throw error to prevent blocking document generation
  }
};

const sendPasswordResetEmail = async (email, resetToken, resetLink) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset Request",
      html: `
        <h2>Password Reset Request</h2>
        <p>You requested a password reset. Click the link below to reset your password:</p>
        <p><a href="${resetLink}">${resetLink}</a></p>
        <p>This link will expire in 1 hour.</p>
        <p>If you didn't request this, please ignore this email.</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    logger.info(mailOptions);
    logger.info(`Password reset email sent to ${email}`);
  } catch (error) {
    logger.error("Error sending password reset email:", error);
    // Don't throw error for password reset emails to prevent blocking
  }
};

const sendWelcomeEmail = async (email, fullName) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Welcome to Document Number Generator",
      html: `
        <h2>Welcome to DocNo!</h2>
        <p>Hi ${fullName},</p>
        <p>Your account has been created successfully. You can now log in and start generating document numbers.</p>
        <h3>Getting Started:</h3>
        <ul>
          <li>Log in with your credentials</li>
          <li>Complete your profile</li>
          <li>Start generating document numbers</li>
        </ul>
        <p>If you have any questions, please contact our support team.</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    logger.info(`Welcome email sent to ${email}`);
  } catch (error) {
    logger.error("Error sending welcome email:", error);
    // Don't throw error to prevent blocking user registration
  }
};

module.exports = {
  sendDocumentConfirmation,
  sendPasswordResetEmail,
  sendWelcomeEmail,
};
