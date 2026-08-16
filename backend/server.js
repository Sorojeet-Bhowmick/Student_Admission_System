const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, ".env") });

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const enquiryRoutes = require("./routes/enquiryRoutes");
const courseRoutes = require("./routes/courseRoutes");
const applicationRoutes = require("./routes/applicationRoutes");
const blogRoutes = require("./routes/blogRoutes");
const userRoutes = require("./routes/userRoutes");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
connectDB();

const app = express();
app.use(helmet());
app.use(morgan("dev"));
app.use(
	rateLimit({
		windowMs: 15 * 60 * 1000,
		max: 100,
		standardHeaders: true,
		legacyHeaders: false,
	})
);
app.use(express.json());
app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173", credentials: true }));
app.get("/", (req, res) => res.json({ message: "Student Admission Backend is running" }));
app.use("/api/auth", authRoutes);
app.use("/api/enquiry", enquiryRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/users", userRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
