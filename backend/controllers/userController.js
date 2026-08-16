const User = require("../models/User");

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = async (req, res) => {
  try {
    const users = await User.find({}).select("-password -otp -resetOtp");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error fetching users" });
  }
};

// @desc    Update user role
// @route   PUT /api/users/:id/role
// @access  Private/Admin
const updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;
    
    // Ensure role is either "admin" or "student"
    if (!["admin", "student"].includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.role = role;
    await user.save();

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      message: "User role updated successfully"
    });
  } catch (error) {
    res.status(500).json({ message: "Server error updating user role" });
  }
};

module.exports = {
  getUsers,
  updateUserRole,
};
