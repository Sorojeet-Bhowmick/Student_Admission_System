const { OAuth2Client } = require("google-auth-library");
const User = require("../models/User");
const Otp = require("../models/Otp");
const generateToken = require("../utils/generateToken");
const sendEmail = require("../utils/mailer");

const createOtp = () => Math.floor(100000 + Math.random() * 900000).toString();

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: "Name, email, and password are required." });
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Email already in use." });
    const otp = createOtp();
    const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);
    
    // Save to Otp collection
    await Otp.create({ email, otp, purpose: "verification", expiresAt: otpExpiresAt });

    const user = new User({ name, email, password, otp, otpExpiresAt, isVerified: false });
    await user.save();
    
    console.log(`\n--- [DEVELOPER INFO] ---`);
    console.log(`Generated OTP for ${email}: ${otp}`);
    console.log(`-------------------------\n`);

    await sendEmail({ to: email, subject: "Verify your admission account", text: `Your OTP code is ${otp}. It expires in 10 minutes.`, html: `<p>Your OTP code is <strong>${otp}</strong>. It expires in 10 minutes.</p>` });
    res.status(201).json({ message: "Registration successful. Check your email for OTP.", email });
  } catch (error) {
    console.error("Error in registerUser:", error);
    res.status(500).json({ message: error.message || "An error occurred during registration." });
  }
};

const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) return res.status(400).json({ message: "Email and OTP are required." });
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found." });
    if (user.isVerified) return res.status(400).json({ message: "Account already verified." });

    // Check in Otp collection
    const otpRecord = await Otp.findOne({ email, purpose: "verification" });
    if (!otpRecord) return res.status(400).json({ message: "Invalid or expired OTP." });

    // Check brute-force attempts
    if (otpRecord.attempts >= 5) {
      await Otp.deleteOne({ _id: otpRecord._id });
      return res.status(400).json({ message: "Too many failed attempts. Please request a new OTP." });
    }

    if (otpRecord.otp !== otp || new Date() > otpRecord.expiresAt) {
      otpRecord.attempts += 1;
      if (otpRecord.attempts >= 5) {
        await Otp.deleteOne({ _id: otpRecord._id });
        return res.status(400).json({ message: "Too many failed attempts. Please request a new OTP." });
      }
      await otpRecord.save();
      return res.status(400).json({ message: "Invalid or expired OTP." });
    }

    // Success! Verify user
    user.isVerified = true;
    user.otp = undefined;
    user.otpExpiresAt = undefined;
    await user.save();

    // Clean up OTP records
    await Otp.deleteMany({ email, purpose: "verification" });

    const token = generateToken(user._id);
    res.json({ message: "Account verified successfully.", token, user: { id: user._id, name: user.name, email: user.email, role: user.role, avatar: user.avatar } });
  } catch (error) {
    console.error("Error in verifyOtp:", error);
    res.status(500).json({ message: error.message || "An error occurred during OTP verification." });
  }
};

const resendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required." });
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found." });
    if (user.isVerified) return res.status(400).json({ message: "Account is already verified." });

    // Throttling: check if an OTP was sent recently (within 60 seconds)
    const existingOtp = await Otp.findOne({ email, purpose: "verification" }).sort({ createdAt: -1 });
    if (existingOtp && (Date.now() - new Date(existingOtp.lastSentAt).getTime() < 60 * 1000)) {
      const waitTime = Math.ceil((60 * 1000 - (Date.now() - new Date(existingOtp.lastSentAt).getTime())) / 1000);
      return res.status(429).json({ message: `Please wait ${waitTime} seconds before requesting another OTP.` });
    }

    const otp = createOtp();
    const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);

    // Save to Otp collection
    await Otp.deleteMany({ email, purpose: "verification" });
    await Otp.create({ email, otp, purpose: "verification", expiresAt: otpExpiresAt });

    user.otp = otp;
    user.otpExpiresAt = otpExpiresAt;
    await user.save();
    
    console.log(`\n--- [DEVELOPER INFO] ---`);
    console.log(`Resent OTP for ${email}: ${otp}`);
    console.log(`-------------------------\n`);

    await sendEmail({ to: email, subject: "Your new verification OTP", text: `Your new OTP code is ${otp}. It expires in 10 minutes.`, html: `<p>Your new OTP code is <strong>${otp}</strong>. It expires in 10 minutes.</p>` });
    res.json({ message: "A new OTP has been sent to your email." });
  } catch (error) {
    console.error("Error in resendOtp:", error);
    res.status(500).json({ message: error.message || "An error occurred during OTP resend." });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required." });
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found." });

    // Throttling: check if an OTP was sent recently (within 60 seconds)
    const existingOtp = await Otp.findOne({ email, purpose: "reset" }).sort({ createdAt: -1 });
    if (existingOtp && (Date.now() - new Date(existingOtp.lastSentAt).getTime() < 60 * 1000)) {
      const waitTime = Math.ceil((60 * 1000 - (Date.now() - new Date(existingOtp.lastSentAt).getTime())) / 1000);
      return res.status(429).json({ message: `Please wait ${waitTime} seconds before requesting another OTP.` });
    }

    const otp = createOtp();
    const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);

    // Save to Otp collection
    await Otp.deleteMany({ email, purpose: "reset" });
    await Otp.create({ email, otp, purpose: "reset", expiresAt: otpExpiresAt });

    user.resetOtp = otp;
    user.resetOtpExpiresAt = otpExpiresAt;
    await user.save();
    
    console.log(`\n--- [DEVELOPER INFO] ---`);
    console.log(`Password reset OTP for ${email}: ${otp}`);
    console.log(`-------------------------\n`);

    await sendEmail({ to: email, subject: "Password reset OTP", text: `Your password reset OTP is ${otp}. It expires in 10 minutes.`, html: `<p>Your password reset OTP is <strong>${otp}</strong>. It expires in 10 minutes.</p>` });
    res.json({ message: "Password reset OTP sent to your email." });
  } catch (error) {
    console.error("Error in forgotPassword:", error);
    res.status(500).json({ message: error.message || "An error occurred during forgot password request." });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    if (!email || !otp || !newPassword) return res.status(400).json({ message: "Email, OTP and new password are required." });
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found." });

    // Check in Otp collection
    const otpRecord = await Otp.findOne({ email, purpose: "reset" });
    if (!otpRecord) return res.status(400).json({ message: "Invalid or expired OTP." });

    // Check brute-force attempts
    if (otpRecord.attempts >= 5) {
      await Otp.deleteOne({ _id: otpRecord._id });
      return res.status(400).json({ message: "Too many failed attempts. Please request a new OTP." });
    }

    if (otpRecord.otp !== otp || new Date() > otpRecord.expiresAt) {
      otpRecord.attempts += 1;
      if (otpRecord.attempts >= 5) {
        await Otp.deleteOne({ _id: otpRecord._id });
        return res.status(400).json({ message: "Too many failed attempts. Please request a new OTP." });
      }
      await otpRecord.save();
      return res.status(400).json({ message: "Invalid or expired OTP." });
    }

    // Success! Update password
    user.password = newPassword;
    user.resetOtp = undefined;
    user.resetOtpExpiresAt = undefined;
    await user.save();

    // Clean up OTP record
    await Otp.deleteMany({ email, purpose: "reset" });

    const token = generateToken(user._id);
    res.json({ message: "Password has been reset.", token, user: { id: user._id, name: user.name, email: user.email, role: user.role, avatar: user.avatar } });
  } catch (error) {
    console.error("Error in resetPassword:", error);
    res.status(500).json({ message: error.message || "An error occurred during password reset." });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "Email and password are required." });
    const user = await User.findOne({ email });
    if (!user || !user.password) return res.status(401).json({ message: "Invalid credentials." });
    const passwordMatch = await user.matchPassword(password);
    if (!passwordMatch) return res.status(401).json({ message: "Invalid credentials." });
    if (!user.isVerified) return res.status(403).json({ message: "Please verify your email before logging in." });
    const token = generateToken(user._id);
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role, avatar: user.avatar } });
  } catch (error) {
    console.error("Error in loginUser:", error);
    res.status(500).json({ message: error.message || "An error occurred during login." });
  }
};

const googleLogin = async (req, res) => {
  try {
    const { idToken, accessToken } = req.body;
    if (!idToken && !accessToken) return res.status(400).json({ message: "Google token is required." });
    if (!process.env.GOOGLE_CLIENT_ID) return res.status(500).json({ message: "Server misconfiguration: GOOGLE_CLIENT_ID is not set." });

    let payload;
    if (idToken) {
      const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
      const ticket = await client.verifyIdToken({ idToken, audience: process.env.GOOGLE_CLIENT_ID });
      payload = ticket.getPayload();
    } else {
      const response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (!response.ok) {
        return res.status(400).json({ message: 'Unable to verify Google access token.' });
      }
      payload = await response.json();
    }

    const { email, name, picture, sub } = payload;
    if (!email) return res.status(400).json({ message: "Unable to verify Google user." });
    const googleId = idToken ? sub : payload.sub || payload.sub;

    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({ name, email, googleId, isVerified: true, avatar: picture });
    } else {
      if (!user.googleId) {
        user.googleId = googleId;
      }
      user.isVerified = true;
      user.avatar = picture;
      await user.save();
    }

    const token = generateToken(user._id);
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role, avatar: user.avatar } });
  } catch (error) {
    console.error("Error in googleLogin:", error);
    res.status(500).json({ message: error.message || "An error occurred during Google login." });
  }
};

const getProfile = async (req, res) => {
  try {
    if (!req.user) return res.status(401).json({ message: "Unauthorized." });
    res.json(req.user);
  } catch (error) {
    console.error("Error in getProfile:", error);
    res.status(500).json({ message: error.message || "An error occurred fetching profile." });
  }
};

const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) return res.status(400).json({ message: "Old and new password are required." });

    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found." });

    const passwordMatch = await user.matchPassword(oldPassword);
    if (!passwordMatch) return res.status(401).json({ message: "Incorrect old password." });

    user.password = newPassword;
    if (user.isFirstLogin) {
      user.isFirstLogin = false;
    }
    
    await user.save();
    res.json({ message: "Password updated successfully." });
  } catch (error) {
    console.error("Error in changePassword:", error);
    res.status(500).json({ message: error.message || "An error occurred during password change." });
  }
};

module.exports = { registerUser, verifyOtp, resendOtp, loginUser, googleLogin, getProfile, forgotPassword, resetPassword, changePassword };
