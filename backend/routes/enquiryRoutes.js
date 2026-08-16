const express = require("express");
const router = express.Router();
const { protect, admin } = require("../middleware/auth");
const { createEnquiry, getEnquiries, updateEnquiry } = require("../controllers/enquiryController");

// Public routes
router.post("/", createEnquiry);

// Admin-only routes
router.get("/", protect, admin, getEnquiries);
router.put("/:id", protect, admin, updateEnquiry);

module.exports = router;
