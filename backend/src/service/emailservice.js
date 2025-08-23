const nodemailer = require('nodemailer');

// Create transporter
const transporter = nodemailer.createTransport({
  service: 'gmail', // or use any other email service
  auth: {
    user: 'your-email@gmail.com',       // your email
    pass: 'your-app-password',          // your email password or app password
  },
});

const sendOTPEmail = async (to, otp) => {
  const mailOptions = {
    from: 'your-email@gmail.com',
    to,
    subject: 'Your OTP for Password Reset',
    text: `Your OTP is: ${otp}. It is valid for 10 minutes.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('OTP email sent to', to);
  } catch (error) {
    console.error('Error sending OTP email:', error);
    throw error;
  }
};

module.exports = { sendOTPEmail };
