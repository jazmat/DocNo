const nodemailer = require("nodemailer");
console.log("SMTP_HOST:", process.env.SMTP_HOST);
/* -----------------------------
   EMAIL TRANSPORT
------------------------------ */

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT || 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});
async function safeSendEmail(fn, data, label) {

  try {

    await fn(data);

    console.log(`📧 ${label} email sent`);

  } catch (err) {

    console.error(`❌ ${label} email failed:`, err.message);

  }

}
/* -----------------------------
UNIVERSAL EMAIL SENDER
------------------------------ */

async function sendEmail({ to, subject, html }) {

  if (!to) {
    throw new Error("Email recipient missing");
  }

  await transporter.sendMail({
    from: `"DocNo System" <${process.env.SMTP_USER}>`,
    to,
    subject,
    html
  });

}
/* -----------------------------
   REGISTRATION REQUEST EMAIL-TO ADMINSTRATOR
------------------------------ */
async function sendRegistrationRequestEmail(data) {

  const { adminEmail, full_name, email, department, requested_role } = data;

  await sendEmail({
    to: adminEmail,
    subject: "New Registration Request",
    html: `
      <h3>New User Registration Request</h3>
      <p><h3>User Details:</h3></p>
      <p><b>Name:</b> ${full_name}</p>
      <p><b>Email:</b> ${email}</p>
      <p><b>Department:</b> ${department.toUpperCase()}</p>
      <p><b>Requested Role:</b> ${requested_role.toUpperCase()}</p>
    `
  });

}
/* -----------------------------
REGISTRATION CONFIRMATION EMAIL-TO REQUESTER
------------------------------ */
async function sendRegistrationConfirmationEmail(data) {

  const { email, full_name, department } = data;

  await sendEmail({
    to: email,
    subject: "Registration Request Received",
    html: `
      <p>Dear ${full_name},</p>

      <p>Your registration request for <b>${department.toUpperCase()} department</b> has been received.</p>

      <p>An administrator will review your request shortly.</p>

      <p>You will receive another email once approved.</p>

      <br>
      <p>DocNo System</p>
    `
  });

}

/* -----------------------------
REGISTRATION APPROVAL EMAIL-TO REQUESTER
------------------------------ */
async function sendRegistrationApprovedEmail(data) {

  const { email, full_name, token } = data;

  const link = `${process.env.FRONTEND_URL}/set-password?token=${token}`;

  await sendEmail({
    to: email,
    subject: "Your DocNo Account Has Been Approved",
    html: `
      <p>Dear ${full_name},</p>

      <p>Your account has been approved.</p>

      <p>Please create your password using the link below:</p>

      <p><a href="${link}">Set Password</a></p>

      <p>This link expires in 24 hours.</p>
    `
  });

}

/* -----------------------------
   PASSWORD RESET EMAIL
------------------------------ */
async function sendPasswordResetEmail(data) {

  const { email, token } = data;

  const link = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;

  await sendEmail({
    to: email,
    subject: "Reset Your Password",
    html: `
      <p>You requested a password reset.</p>

      <p><a href="${link}">Reset Password</a></p>

      <p>This link expires in 1 hour.</p>
    `
  });

}
module.exports = {
  sendRegistrationRequestEmail,
  sendRegistrationConfirmationEmail,
  sendRegistrationApprovedEmail,
  sendPasswordResetEmail,
  safeSendEmail
};
