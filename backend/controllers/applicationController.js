const Student = require("../models/Student");
const User = require("../models/User");
const Course = require("../models/Course");
const sendEmail = require("../utils/mailer");
const bcrypt = require("bcryptjs");

// @desc    Get all applications (Admin only)
// @route   GET /api/applications
// @access  Private/Admin
const getApplications = async (req, res) => {
  try {
    const applications = await Student.find().populate("courseId", "name").sort({ createdAt: -1 });
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Get single application by ID (Admin only)
// @route   GET /api/applications/:id
// @access  Private/Admin
const getApplicationById = async (req, res) => {
  try {
    const application = await Student.findById(req.params.id).populate("courseId", "name");
    if (!application) return res.status(404).json({ message: "Application not found" });
    res.json(application);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Update application status (Admin only)
// @route   PUT /api/applications/:id/status
// @access  Private/Admin
const updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const application = await Student.findById(req.params.id).populate("courseId", "name");
    
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    application.status = status;

    // Handle Approval Logic: Auto-Generate Roll No, Enrollment No, and User Account
    if (status === "Approved" && !application.enrollmentNo) {
      const year = new Date().getFullYear();
      
      // Auto-generate Enrollment Number (e.g. ENR20261234)
      const randomENR = Math.floor(1000 + Math.random() * 9000);
      application.enrollmentNo = `ENR${year}${randomENR}`;

      // Auto-generate Roll Number based on Course (e.g. GMIT-2026-CSE-001)
      const coursePrefix = application.courseId ? application.courseId.name.split(" ").map(w => w[0]).join("").toUpperCase().substring(0, 3) : "GEN";
      // Let's count existing students in this course to generate a sequential number
      const existingStudentsInCourse = await Student.countDocuments({ courseId: application.courseId, status: "Approved" });
      const sequentialNo = String(existingStudentsInCourse + 1).padStart(3, '0');
      application.rollNo = `GMIT-${year}-${coursePrefix}-${sequentialNo}`;

      // Create a new User account for the student
      const email = application.contactDetails.email;
      const dob = new Date(application.personalDetails.dateOfBirth);
      // Default password: DDMMYYYY
      const defaultPassword = `${String(dob.getDate()).padStart(2, '0')}${String(dob.getMonth() + 1).padStart(2, '0')}${dob.getFullYear()}`;
      
      const existingUser = await User.findOne({ email });
      if (!existingUser) {
        const newUser = await User.create({
          name: application.personalDetails.fullName,
          email,
          password: defaultPassword,
          role: "student",
          isVerified: true,
          isFirstLogin: true
        });

        application.userId = newUser._id;

        // Send Welcome Email
        await sendEmail({
          to: email,
          subject: "Application Approved - Welcome to GMIT!",
          text: `Your application has been approved. Your Roll No is ${application.rollNo}. Your login email is ${email} and password is ${defaultPassword}.`,
          html: `
            <h2>Congratulations!</h2>
            <p>Your application to GMIT has been <strong>Approved</strong>.</p>
            <ul>
              <li><strong>Enrollment Number:</strong> ${application.enrollmentNo}</li>
              <li><strong>Roll Number:</strong> ${application.rollNo}</li>
            </ul>
            <h3>Student Portal Login</h3>
            <p>You can now log into the Student Portal using the following credentials:</p>
            <ul>
              <li><strong>Email:</strong> ${email}</li>
              <li><strong>Password:</strong> ${defaultPassword} <em>(This is your Date of Birth in DDMMYYYY format)</em></li>
            </ul>
            <p>We recommend changing your password after your first login.</p>
          `
        });
      }
    }

    const updatedApplication = await application.save();
    res.json(updatedApplication);
  } catch (error) {
    console.error("Error updating application:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Get logged in student's application
// @route   GET /api/applications/my-application
// @access  Private
const getMyApplication = async (req, res) => {
  try {
    // req.user contains the logged in user's details
    const application = await Student.findOne({ userId: req.user._id }).populate("courseId", "name");
    
    // Fallback: If userId wasn't linked (e.g. legacy data), try matching by email
    if (!application) {
      const appByEmail = await Student.findOne({ "contactDetails.email": req.user.email }).populate("courseId", "name");
      if (appByEmail) {
        // Link it now for future
        appByEmail.userId = req.user._id;
        await appByEmail.save();
        return res.json(appByEmail);
      }
      return res.status(404).json({ message: "No admission application found for your account." });
    }
    
    res.json(application);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Update logged in student's application (limited fields)
// @route   PUT /api/applications/my-application
// @access  Private
const updateMyApplication = async (req, res) => {
  try {
    const { mobileNumber, address, city, state, pincode } = req.body;
    const application = await Student.findOne({ userId: req.user._id });
    
    if (!application) {
      return res.status(404).json({ message: "Application not found." });
    }

    if (mobileNumber) application.contactDetails.mobileNumber = mobileNumber;
    if (address) application.contactDetails.address = address;
    if (city) application.contactDetails.city = city;
    if (state) application.contactDetails.state = state;
    if (pincode) application.contactDetails.pincode = pincode;

    const updatedApplication = await application.save();
    res.json(updatedApplication);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  getApplications,
  getApplicationById,
  updateApplicationStatus,
  getMyApplication,
  updateMyApplication,
};
