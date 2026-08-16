const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
  email: { 
    type: String, 
    required: true, 
    lowercase: true, 
    trim: true 
  },
  otp: { 
    type: String, 
    required: true 
  },
  purpose: { 
    type: String, 
    enum: ["verification", "reset"], 
    required: true 
  },
  attempts: { 
    type: Number, 
    default: 0 
  },
  expiresAt: { 
    type: Date, 
    required: true 
  },
  lastSentAt: { 
    type: Date, 
    default: Date.now 
  }
}, { timestamps: true });

// Auto-delete documents when they expire (TTL index)
otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// Compound index to search quickly by email and purpose
otpSchema.index({ email: 1, purpose: 1 });

module.exports = mongoose.model("Otp", otpSchema);
