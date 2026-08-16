const express = require("express");
const router = express.Router();
const { getBlogs, createBlog, deleteBlog } = require("../controllers/blogController");
const { protect, admin } = require("../middleware/auth");

router.route("/").get(getBlogs).post(protect, admin, createBlog);
router.route("/:id").delete(protect, admin, deleteBlog);

module.exports = router;
