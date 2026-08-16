const express = require("express");
const router = express.Router();
const Course = require("../models/Course");
const { protect, admin } = require("../middleware/auth");

// @route   GET /api/courses
// @desc    Get all courses
// @access  Public
router.get("/", async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// @route   POST /api/courses
// @desc    Create a course
// @access  Private/Admin
router.post("/", protect, admin, async (req, res) => {
  try {
    const { name, duration, fees, eligibility, description } = req.body;
    const courseExists = await Course.findOne({ name });
    
    if (courseExists) {
      return res.status(400).json({ message: "Course already exists" });
    }

    const course = await Course.create({
      name,
      duration,
      fees,
      eligibility,
      description,
    });

    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// @route   PUT /api/courses/:id
// @desc    Update a course
// @access  Private/Admin
router.put("/:id", protect, admin, async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json(updatedCourse);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// @route   DELETE /api/courses/:id
// @desc    Delete a course
// @access  Private/Admin
router.delete("/:id", protect, admin, async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    await Course.findByIdAndDelete(req.params.id);
    res.json({ message: "Course removed" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
