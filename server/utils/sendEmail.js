const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, html) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: false, // 587 পোর্টের জন্য false হয়
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: `"Bongo IT Support" <${process.env.EMAIL_USER}>`, // অবশ্যই ভেরিফাইড ইমেইল হতে হবে
      to: email,
      subject: subject,
      html: html,
    });

    console.log("✅ Email sent successfully via Brevo. Msg ID:", info.messageId);
    return info;
  } catch (error) {
    console.error("❌ Email sending failed:", error);
    throw error;
  }
};

module.exports = sendEmail;