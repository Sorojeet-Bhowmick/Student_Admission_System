const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Course name is required"],
      trim: true,
      unique: true,
    },
    duration: {
      type: String,
      required: [true, "Course duration is required"],
      trim: true,
    },
    fees: {
      type: Number,
      required: [true, "Course fees are required"],
    },
    seats: {
      type: Number,
      required: [true, "Number of seats is required"],
      default: 60,
    },
    eligibility: {
      type: String,
      required: [true, "Eligibility criteria is required"],
    },
    description: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", courseSchema);
