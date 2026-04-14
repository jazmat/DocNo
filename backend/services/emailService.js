const nodemailer = require("nodemailer");
//console.log("SMTP_HOST:", process.env.SMTP_HOST);
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

    //console.log(`📧 ${label} email sent`);

  } catch (err) {

    //console.error(`❌ ${label} email failed:`, err.message);

  }

}
/* -----------------------------
UNIVERSAL EMAIL SENDER
------------------------------ */

async function sendEmail({ to, subject, html }) {

  if (!to) {
    throw new Error("Email recipient missing");
  }
  try {
  await transporter.sendMail({
    from: `"DocNo System" <${process.env.SMTP_USER}>`,
    to,
    subject,
    html
  });
    console.log("📧 Email sent to:", to);
  } catch (err) {
    console.error("❌ Email send failed:", to,err.message);
  }
}
/* -----------------------------
   REGISTRATION REQUEST EMAIL-TO ADMINISTRATOR
------------------------------ */
async function sendRegistrationRequestEmail(data) {

  const {
    adminEmail,
    full_name,
    email,
    department,
    requested_role
  } = data;

  const safeDepartment = (department || "N/A").toUpperCase();
  const safeRole = (requested_role || "USER").toUpperCase();
  const link = `${process.env.APP_URL}/login`;
  await sendEmail({
    to: adminEmail,
    subject: "New Registration Request",
    html: `
      <h3>The following new user has requested for registration</h3>
      <p><b>Name:</b> ${full_name || "N/A"}</p>
      <p><b>Email:</b> ${email || "N/A"}</p>
      <p><b>Department:</b> ${safeDepartment}</p>
      <p><b>Requested Role:</b> ${safeRole}</p>
      <p>Click the link below to login and approve or reject the registration:</p>
      <a href="${link}">Login to Approve/Reject Registration</a>
    `
  });

}
/* -----------------------------
   REGISTRATION CONFIRMATION EMAIL (TO USER)
------------------------------ */
async function sendRegistrationConfirmationEmail(data) {

  const {
    full_name,
    email,
    department,
    requested_role
  } = data;

  const safeDepartment = (department || "N/A").toUpperCase();
  const safeRole = (requested_role || "USER").toUpperCase();

  await sendEmail({
    to: email,
    subject: "Registration Request Submitted",
    html: `
      <h3>Registration Request Received</h3>

      <p>Dear ${full_name || "User"},</p>

      <p>Your registration request has been submitted successfully.</p>

      <p><b>Department:</b> ${safeDepartment}</p>
      <p><b>Requested Role:</b> ${safeRole}</p>

      <p>Our administrator is reviewing your request and you shall be notified about the decision.</p>
    `
  });

}

/* -----------------------------
REGISTRATION APPROVAL EMAIL-TO REQUESTER
------------------------------ */
async function sendRegistrationApprovedEmail(data) {

  const { email, full_name, token } = data;

  const link = `${process.env.APP_URL}/set-password?token=${token}`;

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
