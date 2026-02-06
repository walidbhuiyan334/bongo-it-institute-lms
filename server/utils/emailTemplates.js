// --- STYLES ---
const mainStyle = `
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  background-color: #f9f9f9;
  padding: 40px 0;
  color: #333;
`;

const containerStyle = `
  max-width: 600px;
  margin: 0 auto;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.05);
  overflow: hidden;
`;

const headerStyle = `
  background-color: #5e17eb;
  padding: 30px;
  text-align: center;
`;

const bodyStyle = `
  padding: 40px 30px;
  text-align: left;
  line-height: 1.6;
`;

const footerStyle = `
  background-color: #f1f1f1;
  padding: 20px;
  text-align: center;
  font-size: 12px;
  color: #888;
`;

const buttonStyle = `
  display: inline-block;
  background-color: #5e17eb;
  color: #ffffff;
  padding: 14px 30px;
  text-decoration: none;
  border-radius: 8px;
  font-weight: bold;
  font-size: 16px;
  margin-top: 20px;
  box-shadow: 0 4px 6px rgba(94, 23, 235, 0.2);
`;

const codeStyle = `
  font-size: 32px;
  font-weight: 800;
  letter-spacing: 5px;
  color: #5e17eb;
  background-color: #f3e8ff;
  padding: 15px 30px;
  border-radius: 8px;
  display: inline-block;
  margin: 20px 0;
  border: 1px dashed #5e17eb;
`;

// --- 1. VERIFICATION EMAIL ---
const verificationEmailTemplate = (code) => `
<div style="${mainStyle}">
  <div style="${containerStyle}">
    
    <div style="${headerStyle}">
      <h1 style="color: #fff; margin: 0; font-size: 24px;">Bonggo IT Institute</h1>
    </div>

    <div style="${bodyStyle}">
      <h2 style="color: #333; margin-top: 0;">Verify your email address</h2>
      <p style="color: #555; font-size: 16px;">হ্যালো,</p>
      <p style="color: #555; font-size: 16px;">
        Bonggo IT Institute-এ অ্যাকাউন্ট খোলার জন্য ধন্যবাদ। আপনার রেজিস্ট্রেশন সম্পন্ন করতে নিচের ভেরিফিকেশন কোডটি ব্যবহার করুন।
      </p>
      
      <div style="text-align: center;">
        <div style="${codeStyle}">${code}</div>
      </div>

      <p style="color: #777; font-size: 14px;">
        ⚠️ এই কোডটি ১৫ মিনিটের জন্য কার্যকর থাকবে। আপনি যদি এই রিকোয়েস্টটি না করে থাকেন, তবে এই ইমেইলটি ইগনোর করুন।
      </p>
      
      <p style="margin-top: 30px; font-weight: bold; color: #333;">
        ধন্যবাদ,<br/>The Bonggo IT Team
      </p>
    </div>

    <div style="${footerStyle}">
      <p style="margin: 0;">&copy; ${new Date().getFullYear()} Bonggo IT Institute. All rights reserved.</p>
      <p style="margin: 5px 0;">Dhaka, Bangladesh</p>
    </div>
  </div>
</div>
`;

// --- 2. RESET PASSWORD EMAIL ---
const resetPasswordTemplate = (link) => `
<div style="${mainStyle}">
  <div style="${containerStyle}">
    
    <div style="background-color: #ff4757; padding: 30px; text-align: center;">
      <h1 style="color: #fff; margin: 0; font-size: 24px;">Security Alert</h1>
    </div>

    <div style="${bodyStyle}">
      <h2 style="color: #333; margin-top: 0;">Reset Your Password</h2>
      <p style="color: #555; font-size: 16px;">
        আমরা আপনার অ্যাকাউন্ট থেকে পাসওয়ার্ড রিসেট করার একটি রিকোয়েস্ট পেয়েছি।
      </p>
      <p style="color: #555; font-size: 16px;">
        নতুন পাসওয়ার্ড সেট করতে নিচের বাটনে ক্লিক করুন:
      </p>
      
      <div style="text-align: center; margin: 30px 0;">
        <a href="${link}" style="${buttonStyle.replace('#5e17eb', '#ff4757')}">Reset Password</a>
      </div>

      <p style="color: #999; font-size: 13px; margin-top: 20px;">
        বাটন কাজ না করলে, এই লিংকটি ব্রাউজারে কপি-পেস্ট করুন:<br/>
        <a href="${link}" style="color: #ff4757;">${link}</a>
      </p>

      <hr style="border: 0; border-top: 1px solid #eee; margin: 30px 0;">

      <p style="color: #777; font-size: 14px;">
        যদি আপনি পাসওয়ার্ড পরিবর্তনের চেষ্টা না করে থাকেন, তবে দ্রুত আমাদের সাপোর্টে যোগাযোগ করুন। আপনার অ্যাকাউন্ট নিরাপদ রাখতে আমরা বদ্ধপরিকর।
      </p>
    </div>

    <div style="${footerStyle}">
      <p style="margin: 0;">&copy; ${new Date().getFullYear()} Bonggo IT Institute. All rights reserved.</p>
    </div>
  </div>
</div>
`;

module.exports = { verificationEmailTemplate, resetPasswordTemplate };