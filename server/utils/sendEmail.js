const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, html) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST, // .env থেকে নেবে
      port: Number(process.env.EMAIL_PORT), // .env থেকে নেবে
      secure: false, // 587 পোর্টের জন্য false
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // .env থেকে নতুন Key নেবে
      },
    });

    const info = await transporter.sendMail({
      from: `"Bongo IT Institute" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: subject,
      html: html,
    });

    console.log("✅ Email sent successfully. ID:", info.messageId);
    return info;
  } catch (error) {
    console.error("❌ Email sending failed:", error);
    // এরর দিলেও অ্যাপ যেন ক্র্যাশ না করে, তাই আমরা এখানে থামিয়ে দিচ্ছি
    return null; 
  }
};

module.exports = sendEmail;