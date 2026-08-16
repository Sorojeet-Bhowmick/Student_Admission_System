const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    applicationId: { type: String, unique: true, required: true },
    rollNo: { type: String, unique: true, sparse: true },
    enrollmentNo: { type: String, unique: true, sparse: true },
    status: {
      type: String,
      enum: ["Pending", "Verified", "Approved", "Rejected"],
      default: "Pending",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      sparse: true,
    },
    
    // Course Selection
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    preferredShift: { type: String },

    // Personal Details
    personalDetails: {
      fullName: { type: String, required: true },
      fatherName: { type: String, required: true },
      motherName: { type: String, required: true },
      gender: { type: String, required: true },
      dateOfBirth: { type: Date, required: true },
      category: { type: String, required: true },
      religion: { type: String, required: true },
      nationality: { type: String, required: true },
      bloodGroup: { type: String, required: true },
    },

    // Contact Details
    contactDetails: {
      email: { type: String, required: true, lowercase: true, trim: true },
      mobileNumber: { type: String, required: true },
      altMobileNumber: { type: String },
      address: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      pincode: { type: String, required: true },
    },

    // Academic Details
    academicDetails: {
      class10: {
        board: { type: String, required: true },
        schoolName: { type: String, required: true },
        passingYear: { type: String, required: true },
        percentage: { type: Number, required: true },
        rollNumber: { type: String, required: true },
      },
      class12: {
        board: { type: String, required: true },
        schoolName: { type: String, required: true },
        passingYear: { type: String, required: true },
        percentage: { type: Number, required: true },
        rollNumber: { type: String, required: true },
      },
    },

    // Documents (Paths to uploaded files)
    documents: {
      passportPhoto: { type: String, required: true },
      signature: { type: String, required: true },
      aadhaarCard: { type: String, required: true },
      class10Marksheet: { type: String, required: true },
      class12Marksheet: { type: String, required: true },
      transferCertificate: { type: String },
      characterCertificate: { type: String },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Student", studentSchema);
