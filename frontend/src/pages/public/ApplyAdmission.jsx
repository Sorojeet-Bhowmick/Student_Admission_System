import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./ApplyAdmission.css";

const ApplyAdmission = () => {
  const [step, setStep] = useState(1);
  const [courses, setCourses] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successData, setSuccessData] = useState(null);
  const [error, setError] = useState("");

  // Form Data State
  const [personalDetails, setPersonalDetails] = useState({
    fullName: "", fatherName: "", motherName: "", gender: "",
    dateOfBirth: "", category: "", religion: "", nationality: "Indian", bloodGroup: ""
  });

  const [contactDetails, setContactDetails] = useState({
    email: "", mobileNumber: "", altMobileNumber: "", address: "", city: "", state: "", pincode: ""
  });

  const [academicDetails, setAcademicDetails] = useState({
    class10: { board: "", schoolName: "", passingYear: "", percentage: "", rollNumber: "" },
    class12: { board: "", schoolName: "", passingYear: "", percentage: "", rollNumber: "" }
  });

  const [courseSelection, setCourseSelection] = useState({
    courseId: "", preferredShift: "Morning"
  });

  const [documents, setDocuments] = useState({
    passportPhoto: null, signature: null, aadhaarCard: null, 
    class10Marksheet: null, class12Marksheet: null, transferCertificate: null, characterCertificate: null
  });

  useEffect(() => {
    // Fetch available courses
    const fetchCourses = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/courses");
        setCourses(data);
      } catch (err) {
        console.error("Error fetching courses", err);
      }
    };
    fetchCourses();
  }, []);

  const handleNext = () => setStep(step + 1);
  const handlePrev = () => setStep(step - 1);

  const handlePersonalChange = (e) => setPersonalDetails({ ...personalDetails, [e.target.name]: e.target.value });
  const handleContactChange = (e) => setContactDetails({ ...contactDetails, [e.target.name]: e.target.value });
  
  const handleAcademicChange = (level, e) => {
    setAcademicDetails({
      ...academicDetails,
      [level]: { ...academicDetails[level], [e.target.name]: e.target.value }
    });
  };

  const handleFileChange = (e) => {
    setDocuments({ ...documents, [e.target.name]: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    const formData = new FormData();
    formData.append("personalDetails", JSON.stringify(personalDetails));
    formData.append("contactDetails", JSON.stringify(contactDetails));
    formData.append("academicDetails", JSON.stringify(academicDetails));
    formData.append("courseId", courseSelection.courseId);
    formData.append("preferredShift", courseSelection.preferredShift);

    // Append files
    Object.keys(documents).forEach(key => {
      if (documents[key]) {
        formData.append(key, documents[key]);
      }
    });

    try {
      const res = await axios.post("http://localhost:5000/api/applications/apply", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      setSuccessData(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to submit application");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (successData) {
    return (
      <div className="apply-success-container">
        <div className="apply-success-card">
          <div className="success-icon">✓</div>
          <h2>Application Submitted Successfully!</h2>
          <p>{successData.message}</p>
          <div className="app-id-box">
            <span>Application Number</span>
            <strong>{successData.applicationId}</strong>
          </div>
          <p className="success-note">Please save this Application Number. You will need it to track your admission status.</p>
          <div className="success-actions">
            <Link to="/track-status" className="track-btn">Track Status</Link>
            <Link to="/" className="home-btn">Back to Home</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="apply-container">
      <div className="apply-header">
        <h1>New Student Registration</h1>
        <p>Complete the form below to apply for admission</p>
      </div>

      <div className="stepper">
        <div className={`step ${step >= 1 ? 'active' : ''}`}>1. Personal</div>
        <div className={`step ${step >= 2 ? 'active' : ''}`}>2. Contact</div>
        <div className={`step ${step >= 3 ? 'active' : ''}`}>3. Academic</div>
        <div className={`step >= 4 ? 'active' : ''}`}>4. Course & Docs</div>
      </div>

      {error && <div className="error-alert">{error}</div>}

      <form className="apply-form" onSubmit={(e) => e.preventDefault()}>
        {/* STEP 1: PERSONAL DETAILS */}
        {step === 1 && (
          <div className="form-section fade-in">
            <h3>Personal Details</h3>
            <div className="form-grid">
              <div className="input-group">
                <label>Full Name *</label>
                <input type="text" name="fullName" value={personalDetails.fullName} onChange={handlePersonalChange} required />
              </div>
              <div className="input-group">
                <label>Date of Birth *</label>
                <input type="date" name="dateOfBirth" value={personalDetails.dateOfBirth} onChange={handlePersonalChange} required />
              </div>
              <div className="input-group">
                <label>Gender *</label>
                <select name="gender" value={personalDetails.gender} onChange={handlePersonalChange} required>
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="input-group">
                <label>Father's Name *</label>
                <input type="text" name="fatherName" value={personalDetails.fatherName} onChange={handlePersonalChange} required />
              </div>
              <div className="input-group">
                <label>Mother's Name *</label>
                <input type="text" name="motherName" value={personalDetails.motherName} onChange={handlePersonalChange} required />
              </div>
              <div className="input-group">
                <label>Category *</label>
                <select name="category" value={personalDetails.category} onChange={handlePersonalChange} required>
                  <option value="">Select Category</option>
                  <option value="General">General</option>
                  <option value="OBC">OBC</option>
                  <option value="SC">SC</option>
                  <option value="ST">ST</option>
                </select>
              </div>
              <div className="input-group">
                <label>Religion *</label>
                <input type="text" name="religion" value={personalDetails.religion} onChange={handlePersonalChange} required />
              </div>
              <div className="input-group">
                <label>Blood Group *</label>
                <select name="bloodGroup" value={personalDetails.bloodGroup} onChange={handlePersonalChange} required>
                  <option value="">Select</option>
                  <option value="A+">A+</option><option value="A-">A-</option>
                  <option value="B+">B+</option><option value="B-">B-</option>
                  <option value="O+">O+</option><option value="O-">O-</option>
                  <option value="AB+">AB+</option><option value="AB-">AB-</option>
                </select>
              </div>
            </div>
            <div className="form-actions">
              <button type="button" className="btn-next" onClick={handleNext}>Next Step</button>
            </div>
          </div>
        )}

        {/* STEP 2: CONTACT DETAILS */}
        {step === 2 && (
          <div className="form-section fade-in">
            <h3>Contact Details</h3>
            <div className="form-grid">
              <div className="input-group">
                <label>Email Address *</label>
                <input type="email" name="email" value={contactDetails.email} onChange={handleContactChange} required />
              </div>
              <div className="input-group">
                <label>Mobile Number *</label>
                <input type="tel" name="mobileNumber" value={contactDetails.mobileNumber} onChange={handleContactChange} required />
              </div>
              <div className="input-group">
                <label>Alternative Mobile</label>
                <input type="tel" name="altMobileNumber" value={contactDetails.altMobileNumber} onChange={handleContactChange} />
              </div>
              <div className="input-group full-width">
                <label>Full Address *</label>
                <textarea name="address" value={contactDetails.address} onChange={handleContactChange} required></textarea>
              </div>
              <div className="input-group">
                <label>City *</label>
                <input type="text" name="city" value={contactDetails.city} onChange={handleContactChange} required />
              </div>
              <div className="input-group">
                <label>State *</label>
                <input type="text" name="state" value={contactDetails.state} onChange={handleContactChange} required />
              </div>
              <div className="input-group">
                <label>Pincode *</label>
                <input type="text" name="pincode" value={contactDetails.pincode} onChange={handleContactChange} required />
              </div>
            </div>
            <div className="form-actions">
              <button type="button" className="btn-prev" onClick={handlePrev}>Previous</button>
              <button type="button" className="btn-next" onClick={handleNext}>Next Step</button>
            </div>
          </div>
        )}

        {/* STEP 3: ACADEMIC DETAILS */}
        {step === 3 && (
          <div className="form-section fade-in">
            <h3>Academic Details</h3>
            
            <h4 className="sub-heading">Class 10 (Secondary)</h4>
            <div className="form-grid">
              <div className="input-group">
                <label>Board *</label>
                <input type="text" name="board" value={academicDetails.class10.board} onChange={(e) => handleAcademicChange('class10', e)} required />
              </div>
              <div className="input-group">
                <label>School Name *</label>
                <input type="text" name="schoolName" value={academicDetails.class10.schoolName} onChange={(e) => handleAcademicChange('class10', e)} required />
              </div>
              <div className="input-group">
                <label>Passing Year *</label>
                <input type="text" name="passingYear" value={academicDetails.class10.passingYear} onChange={(e) => handleAcademicChange('class10', e)} required />
              </div>
              <div className="input-group">
                <label>Percentage (%) *</label>
                <input type="number" name="percentage" value={academicDetails.class10.percentage} onChange={(e) => handleAcademicChange('class10', e)} required />
              </div>
              <div className="input-group">
                <label>Roll Number *</label>
                <input type="text" name="rollNumber" value={academicDetails.class10.rollNumber} onChange={(e) => handleAcademicChange('class10', e)} required />
              </div>
            </div>

            <h4 className="sub-heading mt-4">Class 12 (Higher Secondary)</h4>
            <div className="form-grid">
              <div className="input-group">
                <label>Board *</label>
                <input type="text" name="board" value={academicDetails.class12.board} onChange={(e) => handleAcademicChange('class12', e)} required />
              </div>
              <div className="input-group">
                <label>School/College Name *</label>
                <input type="text" name="schoolName" value={academicDetails.class12.schoolName} onChange={(e) => handleAcademicChange('class12', e)} required />
              </div>
              <div className="input-group">
                <label>Passing Year *</label>
                <input type="text" name="passingYear" value={academicDetails.class12.passingYear} onChange={(e) => handleAcademicChange('class12', e)} required />
              </div>
              <div className="input-group">
                <label>Percentage (%) *</label>
                <input type="number" name="percentage" value={academicDetails.class12.percentage} onChange={(e) => handleAcademicChange('class12', e)} required />
              </div>
              <div className="input-group">
                <label>Roll Number *</label>
                <input type="text" name="rollNumber" value={academicDetails.class12.rollNumber} onChange={(e) => handleAcademicChange('class12', e)} required />
              </div>
            </div>

            <div className="form-actions">
              <button type="button" className="btn-prev" onClick={handlePrev}>Previous</button>
              <button type="button" className="btn-next" onClick={handleNext}>Next Step</button>
            </div>
          </div>
        )}

        {/* STEP 4: COURSE & DOCUMENTS */}
        {step === 4 && (
          <div className="form-section fade-in">
            <h3>Course Selection & Documents</h3>
            
            <div className="form-grid mb-4">
              <div className="input-group">
                <label>Select Course *</label>
                <select name="courseId" value={courseSelection.courseId} onChange={(e) => setCourseSelection({...courseSelection, courseId: e.target.value})} required>
                  <option value="">-- Choose a Course --</option>
                  {courses.map(course => (
                    <option key={course._id} value={course._id}>{course.name}</option>
                  ))}
                </select>
              </div>
              <div className="input-group">
                <label>Preferred Shift *</label>
                <select name="preferredShift" value={courseSelection.preferredShift} onChange={(e) => setCourseSelection({...courseSelection, preferredShift: e.target.value})} required>
                  <option value="Morning">Morning</option>
                  <option value="Evening">Evening</option>
                </select>
              </div>
            </div>

            <h4 className="sub-heading mt-4">Document Uploads (Images/PDFs only, Max 5MB)</h4>
            <div className="form-grid">
              <div className="file-input-group">
                <label>Passport Photo *</label>
                <input type="file" name="passportPhoto" accept=".jpg,.jpeg,.png" onChange={handleFileChange} required />
              </div>
              <div className="file-input-group">
                <label>Signature *</label>
                <input type="file" name="signature" accept=".jpg,.jpeg,.png" onChange={handleFileChange} required />
              </div>
              <div className="file-input-group">
                <label>Aadhaar Card *</label>
                <input type="file" name="aadhaarCard" accept=".jpg,.jpeg,.png,.pdf" onChange={handleFileChange} required />
              </div>
              <div className="file-input-group">
                <label>Class 10 Marksheet *</label>
                <input type="file" name="class10Marksheet" accept=".jpg,.jpeg,.png,.pdf" onChange={handleFileChange} required />
              </div>
              <div className="file-input-group">
                <label>Class 12 Marksheet *</label>
                <input type="file" name="class12Marksheet" accept=".jpg,.jpeg,.png,.pdf" onChange={handleFileChange} required />
              </div>
              <div className="file-input-group">
                <label>Transfer Certificate</label>
                <input type="file" name="transferCertificate" accept=".jpg,.jpeg,.png,.pdf" onChange={handleFileChange} />
              </div>
            </div>

            <div className="form-actions final-actions">
              <button type="button" className="btn-prev" onClick={handlePrev}>Previous</button>
              <button type="button" className="btn-submit" onClick={handleSubmit} disabled={isSubmitting}>
                {isSubmitting ? "Submitting Application..." : "Submit Application"}
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default ApplyAdmission;
