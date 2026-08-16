const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const userSchema = new mongoose.Schema({ name: { type: String, required: true }, email: { type: String, required: true, unique: true, lowercase: true, trim: true }, password: { type: String }, role: { type: String, enum: ["student", "admin"], default: "student" }, isVerified: { type: Boolean, default: false }, isFirstLogin: { type: Boolean, default: false }, otp: { type: String }, otpExpiresAt: { type: Date }, resetOtp: { type: String }, resetOtpExpiresAt: { type: Date }, googleId: { type: String }, avatar: { type: String } }, { timestamps: true });
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  if (this.password) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
module.exports = mongoose.model("User", userSchema);
