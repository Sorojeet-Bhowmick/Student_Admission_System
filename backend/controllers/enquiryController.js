const Enquiry = require("../models/Enquiry");

// Helper to generate reference ID: ENQ-YYYY-XXXX (where YYYY is current year, XXXX is 4-digit code)
const generateEnquiryId = () => {
  const year = new Date().getFullYear();
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  return `ENQ-${year}-${randomNum}`;
};

// Create a new enquiry (Public)
const createEnquiry = async (req, res) => {
  try {
    const { name, email, phone, state, city, program, branch } = req.body;
    
    if (!name || !email || !phone || !state || !city || !program || !branch) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const enquiryId = generateEnquiryId();

    const enquiry = new Enquiry({
      enquiryId,
      name,
      email,
      phone,
      state,
      city,
      program,
      branch
    });

    await enquiry.save();
    
    res.status(201).json({ 
      message: "Enquiry submitted successfully.", 
      enquiryId,
      enquiry 
    });
  } catch (error) {
    console.error("Error creating enquiry:", error);
    res.status(500).json({ message: error.message || "An error occurred during submission." });
  }
};

// Get all enquiries (Admin Only)
const getEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 });
    res.json(enquiries);
  } catch (error) {
    console.error("Error fetching enquiries:", error);
    res.status(500).json({ message: error.message || "An error occurred fetching enquiries." });
  }
};

// Update enquiry status & notes (Admin Only)
const updateEnquiry = async (req, res) => {
  try {
    const { status, notes } = req.body;
    const enquiry = await Enquiry.findById(req.params.id);
    
    if (!enquiry) {
      return res.status(404).json({ message: "Enquiry not found." });
    }

    if (status) enquiry.status = status;
    if (notes !== undefined) enquiry.notes = notes;

    await enquiry.save();
    res.json({ message: "Enquiry updated successfully.", enquiry });
  } catch (error) {
    console.error("Error updating enquiry:", error);
    res.status(500).json({ message: error.message || "An error occurred updating enquiry." });
  }
};

module.exports = {
  createEnquiry,
  getEnquiries,
  updateEnquiry
};
