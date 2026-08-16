const express = require("express");
const router = express.Router();
const { getUsers, updateUserRole } = require("../controllers/userController");
const { protect, admin } = require("../middleware/auth");

// @route   GET /api/users
// @desc    Get all users
// @access  Private/Admin
router.route("/").get(protect, admin, getUsers);

// @route   PUT /api/users/:id/role
// @desc    Update user role
// @access  Private/Admin
router.route("/:id/role").put(protect, admin, updateUserRole);

module.exports = router;
