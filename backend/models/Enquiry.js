const mongoose = require("mongoose");

const enquirySchema = new mongoose.Schema({
  enquiryId: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  state: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true,
    trim: true
  },
  program: {
    type: String,
    required: true
  },
  branch: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ["Pending", "Contacted", "Resolved"],
    default: "Pending"
  },
  notes: {
    type: String,
    default: ""
  }
}, { timestamps: true });

module.exports = mongoose.model("Enquiry", enquirySchema);
