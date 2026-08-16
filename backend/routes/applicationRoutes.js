const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");
const Student = require("../models/Student");

// @route   POST /api/applications/apply
// @desc    Submit a new student application
// @access  Public
router.post(
  "/apply",
  upload.fields([
    { name: "passportPhoto", maxCount: 1 },
    { name: "signature", maxCount: 1 },
    { name: "aadhaarCard", maxCount: 1 },
    { name: "class10Marksheet", maxCount: 1 },
    { name: "class12Marksheet", maxCount: 1 },
    { name: "transferCertificate", maxCount: 1 },
    { name: "characterCertificate", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      // Parse the JSON stringified objects from the frontend FormData
      const personalDetails = JSON.parse(req.body.personalDetails);
      const contactDetails = JSON.parse(req.body.contactDetails);
      const academicDetails = JSON.parse(req.body.academicDetails);
      const courseId = req.body.courseId;
      const preferredShift = req.body.preferredShift;

      // Generate a unique Application ID (e.g., APP2026 + 4 random digits)
      const year = new Date().getFullYear();
      const randomDigits = Math.floor(1000 + Math.random() * 9000);
      const applicationId = `APP${year}${randomDigits}`;

      // Extract file paths from multer
      const files = req.files;
      if (!files.passportPhoto || !files.signature || !files.aadhaarCard || !files.class10Marksheet || !files.class12Marksheet) {
        return res.status(400).json({ message: "Please upload all mandatory documents." });
      }

      const documents = {
        passportPhoto: files.passportPhoto[0].path,
        signature: files.signature[0].path,
        aadhaarCard: files.aadhaarCard[0].path,
        class10Marksheet: files.class10Marksheet[0].path,
        class12Marksheet: files.class12Marksheet[0].path,
        transferCertificate: files.transferCertificate ? files.transferCertificate[0].path : undefined,
        characterCertificate: files.characterCertificate ? files.characterCertificate[0].path : undefined,
      };

      // Create new student application
      const newStudent = await Student.create({
        applicationId,
        courseId,
        preferredShift,
        personalDetails,
        contactDetails,
        academicDetails,
        documents,
        status: "Pending",
      });

      res.status(201).json({
        message: "Application submitted successfully!",
        applicationId: newStudent.applicationId,
      });
    } catch (error) {
      console.error("Error submitting application:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  }
);

// @route   GET /api/applications/status/:appId
// @desc    Track application status
// @access  Public
router.get("/status/:appId", async (req, res) => {
  try {
    const student = await Student.findOne({ applicationId: req.params.appId }).populate("courseId", "name");
    
    if (!student) {
      return res.status(404).json({ message: "Application not found" });
    }

    // Only return safe status fields, not full details
    res.json({
      applicationId: student.applicationId,
      status: student.status,
      course: student.courseId ? student.courseId.name : "N/A",
      name: student.personalDetails.fullName,
      submittedAt: student.createdAt
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

const { getApplications, getApplicationById, updateApplicationStatus, getMyApplication, updateMyApplication } = require("../controllers/applicationController");
const { protect, admin } = require("../middleware/auth");

// @route   GET /api/applications/my-application
// @desc    Get logged in user's application
// @access  Private
router.get("/my-application", protect, getMyApplication);

// @route   PUT /api/applications/my-application
// @desc    Update logged in user's application contact details
// @access  Private
router.put("/my-application", protect, updateMyApplication);

// @route   GET /api/applications
// @desc    Get all applications (Admin only)
// @access  Private/Admin
router.get("/", protect, admin, getApplications);

// @route   GET /api/applications/:id
// @desc    Get single application by ID
// @access  Private/Admin
router.get("/:id", protect, admin, getApplicationById);

// @route   PUT /api/applications/:id/status
// @desc    Update application status
// @access  Private/Admin
router.put("/:id/status", protect, admin, updateApplicationStatus);

module.exports = router;
