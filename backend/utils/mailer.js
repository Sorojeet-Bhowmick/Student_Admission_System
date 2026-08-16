const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({ host: process.env.EMAIL_HOST, port: Number(process.env.EMAIL_PORT) || 587, secure: false, auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS } });
const sendEmail = async ({ to, subject, text, html }) => {
  try {
    const info = await transporter.sendMail({ from: `Admissions <${process.env.EMAIL_USER}>`, to, subject, text, html });
    console.log(`Email sent successfully to ${to}`);
    return info;
  } catch (error) {
    console.error(`Failed to send email to ${to}:`, error.message);
    return null;
  }
};
module.exports = sendEmail;
