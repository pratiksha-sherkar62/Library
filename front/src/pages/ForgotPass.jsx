import React, { useState } from 'react';
import axios from 'axios';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [step, setStep] = useState(1); // Step 1: send OTP, Step 2: verify OTP + reset

  // Step 1: send OTP
  const handleSendOtp = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/forgot-password', { email });
      alert('✅ OTP sent to your email!');
      setStep(2);
    } catch (error) {
      console.error(error);
      alert('❌ Failed to send OTP. Check your email.');
    }
  };

  // Step 2: verify OTP and reset password
  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert('❌ New password and confirm password do not match!');
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/auth/reset-password', { email, otp, newPassword });
      alert('✅ Password updated successfully!');
      // reset fields
      setEmail('');
      setOtp('');
      setNewPassword('');
      setConfirmPassword('');
      setStep(1); // go back to Step 1
    } catch (error) {
      console.error(error);
      alert('❌ Failed to reset password. Invalid OTP or error.');
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '400px' }}>
      <h2 className="text-center mb-4">Forgot Password</h2>

      {step === 1 && (
        <form onSubmit={handleSendOtp}>
          <div className="mb-3">
            <label>Email:</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Send OTP</button>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleResetPassword}>
          <div className="mb-3">
            <label>OTP:</label>
            <input
              type="text"
              className="form-control"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label>New Password:</label>
            <input
              type="password"
              className="form-control"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label>Confirm Password:</label>
            <input
              type="password"
              className="form-control"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-success w-100">Reset Password</button>
        </form>
      )}
    </div>
  );
}

export default ForgotPassword;
