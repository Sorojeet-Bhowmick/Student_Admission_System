import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "../auth/Login.jsx";
import Register from "../auth/Register.jsx";
import axios from "axios";
import "./Home.css";

const ENQUIRY_API_URL = (import.meta.env.VITE_API_URL || "http://localhost:5000/api/auth").replace("/auth", "/enquiry");

const coursesData = [
  { id: 1, tag: "B.Tech", name: "Computer Science & Engineering", desc: "Focuses on algorithms, software engineering, AI, and systems." },
  { id: 2, tag: "B.Tech", name: "Computer Science & Business Systems", desc: "Interdisciplinary course covering tech and business management." },
  { id: 3, tag: "B.Tech", name: "Electronics & Communication", desc: "Covers VLSI, embedded systems, signals, and telecom." },
  { id: 4, tag: "B.Tech", name: "Mechanical Engineering", desc: "Deals with thermodynamics, manufacturing, robotics, and design." },
  { id: 5, tag: "B.Tech", name: "Civil Engineering", desc: "Focuses on structural engineering, geotechnics, and infrastructure." },
  { id: 6, tag: "B.Tech", name: "Electrical Engineering", desc: "Covers power systems, electrical machines, and control systems." }
];

const noticesData = [
  { id: 1, date: "12/05/2026", text: "Introduction of late enrollment provision for Even Semester 2025-26." },
  { id: 2, date: "28/04/2026", text: "Exam Cell Notice - CA3 Even Sem 2026 instructions and schedule." },
  { id: 3, date: "17/04/2026", text: "Working Day on 27.04.2026 and Compensatory Holiday notification." },
  { id: 4, date: "14/04/2026", text: "Even Semester Examination Calendar 2026 publication and updates." },
  { id: 5, date: "05/04/2026", text: "Mock Tests schedule for final year B.Tech students in CSE and ECE." }
];

const newsData = [
  { id: 1, date: "21/05/2026", text: "Celebrating Our Odd Semester Toppers and academic achievers award ceremony." },
  { id: 2, date: "23/04/2026", text: "CSE & CSBS departments hosted an inspiring alumni talk by Mr. Apalak Dutta (CSE 2020) on IT industry trends." },
  { id: 3, date: "12/04/2026", text: "National Conference on AI FOR ATMA NIRBHAR BHARAT 2026 hosted on GMIT campus." },
  { id: 4, date: "29/03/2026", text: "GMIT placement cell reports 85% placement rate for 2026 batch in major tech giants." },
  { id: 5, date: "15/03/2026", text: "Annual Sports Meet 'GMIT KHELO 2026' concludes with athletic and team game finals." }
];

const Home = () => {
  const { user } = useSelector((state) => state.auth);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [authModalMode, setAuthModalMode] = useState("login");

  // Enquiry Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    state: "",
    city: "",
    program: "",
    branch: "",
    captchaInput: "",
    agreed: false
  });
  const [captchaText, setCaptchaText] = useState("");
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState(false);
  const [referenceId, setReferenceId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Generate random captcha code
  const generateCaptcha = () => {
    const chars = "23456789abcdefghkmnpqrstuvwxyzABCDEFGHKMNPQRSTUVWXYZ"; // removed similar looking chars like 1,l,0,O
    let code = "";
    for (let i = 0; i < 6; i++) {
      code += chars[Math.floor(Math.random() * chars.length)];
    }
    setCaptchaText(code);
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  // Popup login modal after 5 seconds of load if user is not authenticated
  useEffect(() => {
    if (!user) {
      const timer = setTimeout(() => {
        setShowLoginModal(true);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    setFormSuccess(false);

    if (!formData.agreed) {
      setFormError("You must agree to receive communications to submit the query.");
      return;
    }

    if (formData.captchaInput !== captchaText) {
      setFormError("Incorrect Captcha code. Please try again.");
      generateCaptcha();
      setFormData({ ...formData, captchaInput: "" });
      return;
    }

    try {
      setIsSubmitting(true);
      const res = await axios.post(ENQUIRY_API_URL, {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        state: formData.state,
        city: formData.city,
        program: formData.program,
        branch: formData.branch
      });

      setReferenceId(res.data.enquiryId);
      setFormSuccess(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        state: "",
        city: "",
        program: "",
        branch: "",
        captchaInput: "",
        agreed: false
      });
      generateCaptcha();
    } catch (err) {
      setFormError(err.response?.data?.message || err.message || "Failed to submit enquiry.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="gmit-homepage-wrapper">
      
      {/* 1. Hero Slider Section */}
      <section className="gmit-hero">
        <div className="gmit-hero-container">
          <div className="gmit-hero-content">
            <span className="gmit-hero-subtitle">Admissions Open 2026 - 2027</span>
            <h2 className="gmit-hero-title">Gargi Memorial Institute of Technology</h2>
            <p className="gmit-hero-tagline">
              Approved by AICTE | Affiliated to MAKAUT. Joint Venture with JIS Group Educational Initiatives.
            </p>
            
            <div className="gmit-hero-highlights">
              <div className="gmit-hero-highlight-item">
                <div className="gmit-hero-highlight-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 2L2 7l10 5 10-5-10-5z"></path><path d="M2 17l10 5 10-5"></path><path d="M2 12l10 5 10-5"></path></svg>
                </div>
                <div className="gmit-hero-highlight-text">
                  Attractive Govt. Approved Scholarships Available For Students
                </div>
              </div>
              <div className="gmit-hero-highlight-item">
                <div className="gmit-hero-highlight-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>
                </div>
                <div className="gmit-hero-highlight-text">
                  Aspirants can avail West Bengal Student Credit Card scheme
                </div>
              </div>
              <div className="gmit-hero-highlight-item">
                <div className="gmit-hero-highlight-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                </div>
                <div className="gmit-hero-highlight-text">
                  Superb Placements in Cognizant, TCS, PwC, EY, Amazon & more
                </div>
              </div>
            </div>

            <Link to="/apply" className="gmit-hero-cta">
              <span>APPLY NOW</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </Link>
          </div>

          <div className="gmit-hero-graphic">
            <div className="gmit-hero-image-wrapper">
              {/* Premium Inline Student Avatar representation */}
              <svg viewBox="0 0 200 200" width="100%" height="100%">
                <defs>
                  <linearGradient id="avatarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#f59e0b" />
                    <stop offset="100%" stopColor="#d97706" />
                  </linearGradient>
                </defs>
                <circle cx="100" cy="100" r="90" fill="url(#avatarGrad)" opacity="0.85" />
                {/* stylized student body */}
                <path d="M50 160 C 50 120, 150 120, 150 160 Z" fill="#0f172a" />
                <circle cx="100" cy="85" r="30" fill="#fed7aa" />
                {/* hair */}
                <path d="M70 80 C 70 50, 130 50, 130 80 C 130 80, 115 65, 100 65 C 85 65, 70 80, 70 80 Z" fill="#1e293b" />
                {/* graduation cap */}
                <path d="M100 35 L 140 50 L 100 65 L 60 50 Z" fill="#1e3a8a" />
                <rect x="94" y="50" width="12" height="15" fill="#1e3a8a" />
                <line x1="140" y1="50" x2="145" y2="68" stroke="#f59e0b" strokeWidth="2" />
                <circle cx="145" cy="70" r="3" fill="#f59e0b" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Approvals & Accreditations */}
      <section className="gmit-approvals">
        <h2 className="gmit-section-title">Approvals & Accreditations</h2>
        <div className="gmit-section-divider"></div>
        <div className="gmit-approval-row">
          <div className="gmit-approval-card">
            <div className="gmit-approval-logo">
              {/* Emblem SVG */}
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: "var(--gmit-orange)" }}>
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
            </div>
            <h4>AICTE</h4>
            <p>Approved Institution</p>
          </div>
          
          <div className="gmit-approval-card">
            <div className="gmit-approval-logo">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: "var(--gmit-navy)" }}>
                <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"></path>
              </svg>
            </div>
            <h4>MAKAUT</h4>
            <p>Affiliated University</p>
          </div>
        </div>
      </section>

      {/* 3. Placements Statistics & Enquiry Card */}
      <section className="gmit-enquiry-section">
        <div className="gmit-enquiry-container">
          <div className="gmit-enquiry-stats">
            <h2 className="gmit-enquiry-title">GMIT KOLKATA Top B.Tech College & Placements</h2>
            <p className="gmit-enquiry-desc">
              Gargi Memorial Institute of Technology (GMIT), considered a pioneer in engineering and situated in Baruipur, Kolkata, recently completed 15 years of excellence. As a joint venture with JIS Group Educational Initiatives, it has ranked among the top private engineering colleges in West Bengal, driven by a commitment to robust placements and technical education.
            </p>
            
            <div className="gmit-stats-grid">
              <div className="gmit-stat-card">
                <div className="gmit-stat-num">3500+</div>
                <div className="gmit-stat-label">Enrolled Students</div>
              </div>
              <div className="gmit-stat-card">
                <div className="gmit-stat-num">50+</div>
                <div className="gmit-stat-label">Expert Faculty</div>
              </div>
            </div>
          </div>

          {/* Inquiry Form Card */}
          <div className="gmit-enquiry-card">
            <h3>Admission Enquiry</h3>
            <p>Fill out the form below to receive call back from our counselor.</p>

            {formSuccess ? (
              <div className="gmit-form-success" style={{ display: "flex", flexDirection: "column", gap: "0.8rem", textAlign: "left", padding: "1.5rem" }}>
                <h4 style={{ color: "#059669", fontSize: "1.1rem", margin: 0, fontWeight: "bold" }}>Enquiry Submitted!</h4>
                <p style={{ margin: 0, fontSize: "0.9rem" }}>Thank you! Your enquiry has been registered in our database.</p>
                <div style={{ margin: "0.5rem 0", padding: "0.8rem", backgroundColor: "rgba(245, 158, 11, 0.08)", borderRadius: "6px", border: "1px dashed var(--gmit-orange)", color: "var(--gmit-navy)", fontWeight: "bold", textAlign: "center", fontSize: "1.1rem" }}>
                  Reference ID: {referenceId}
                </div>
                <p style={{ fontSize: "0.8rem", opacity: 0.85, margin: 0 }}>Please save this Reference ID for tracking. Our counselor will contact you soon.</p>
                <button type="button" className="gmit-submit-btn" style={{ marginTop: "0.5rem", width: "100%" }} onClick={() => setFormSuccess(false)}>
                  Submit Another Enquiry
                </button>
              </div>
            ) : (
              <form className="gmit-form" onSubmit={handleFormSubmit}>
                {formError && <div className="auth-alert auth-alert-error" style={{ fontSize: "0.8rem", padding: "0.6rem 0.8rem" }}>{formError}</div>}
                
                <input 
                  type="text" 
                  name="name" 
                  placeholder="Enter Name *" 
                  className="gmit-form-input" 
                  value={formData.name} 
                  onChange={handleInputChange} 
                  required 
                />

                <input 
                  type="email" 
                  name="email" 
                  placeholder="Enter Email Address *" 
                  className="gmit-form-input" 
                  value={formData.email} 
                  onChange={handleInputChange} 
                  required 
                />

                <div className="gmit-phone-input-group">
                  <div className="gmit-phone-code">+91</div>
                  <input 
                    type="tel" 
                    name="phone" 
                    placeholder="Enter Mobile Number *" 
                    className="gmit-form-input gmit-phone-input" 
                    value={formData.phone} 
                    onChange={handleInputChange} 
                    maxLength={10}
                    required 
                  />
                </div>

                <div className="gmit-form-row">
                  <select name="state" className="gmit-form-input" value={formData.state} onChange={handleInputChange} required>
                    <option value="">Select State *</option>
                    <option value="West Bengal">West Bengal</option>
                    <option value="Bihar">Bihar</option>
                    <option value="Jharkhand">Jharkhand</option>
                    <option value="Other">Other</option>
                  </select>
                  <input 
                    type="text" 
                    name="city" 
                    placeholder="Select City *" 
                    className="gmit-form-input" 
                    value={formData.city} 
                    onChange={handleInputChange} 
                    required 
                  />
                </div>

                <div className="gmit-form-row">
                  <select name="program" className="gmit-form-input" value={formData.program} onChange={handleInputChange} required>
                    <option value="">Select Program *</option>
                    <option value="B.Tech">B.Tech (4 Years)</option>
                    <option value="B.Tech Lateral">B.Tech Lateral (3 Years)</option>
                  </select>
                  
                  <select name="branch" className="gmit-form-input" value={formData.branch} onChange={handleInputChange} required>
                    <option value="">Select Branch *</option>
                    <option value="Computer Science">Computer Science (CSE)</option>
                    <option value="Electronics">Electronics (ECE)</option>
                    <option value="Mechanical">Mechanical (ME)</option>
                    <option value="Civil">Civil (CE)</option>
                    <option value="Electrical">Electrical (EE)</option>
                  </select>
                </div>

                {/* Captcha Validation Row */}
                <div className="gmit-captcha-row">
                  <div className="gmit-captcha-display-container">
                    <span className="gmit-captcha-code">{captchaText}</span>
                    <button type="button" className="gmit-captcha-refresh" onClick={generateCaptcha} aria-label="Refresh Captcha">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/></svg>
                    </button>
                  </div>
                  <input 
                    type="text" 
                    name="captchaInput" 
                    placeholder="Enter Captcha *" 
                    className="gmit-form-input" 
                    value={formData.captchaInput} 
                    onChange={handleInputChange} 
                    required 
                  />
                </div>

                <label className="gmit-checkbox-label">
                  <input 
                    type="checkbox" 
                    name="agreed" 
                    checked={formData.agreed} 
                    onChange={handleInputChange} 
                    required
                  />
                  <span>I agree to give my consent to receive updates through SMS/Email & WhatsApp. *</span>
                </label>

                <button type="submit" className="gmit-submit-btn" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* 4. Notice Board & News Events */}
      <section className="gmit-info-feeds">
        <div className="gmit-feeds-grid">
          {/* Notice Board */}
          <div className="gmit-feed-card">
            <div className="gmit-feed-header">Notice Board</div>
            <div className="gmit-feed-list">
              {noticesData.map((item) => (
                <div key={item.id} className="gmit-feed-item">
                  <div className="gmit-feed-date">{item.date}</div>
                  <div className="gmit-feed-text">{item.text}</div>
                </div>
              ))}
            </div>
          </div>

          {/* News Events */}
          <div className="gmit-feed-card">
            <div className="gmit-feed-header">News & Events</div>
            <div className="gmit-feed-list">
              {newsData.map((item) => (
                <div key={item.id} className="gmit-feed-item">
                  <div className="gmit-feed-date">{item.date}</div>
                  <div className="gmit-feed-text">{item.text}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. Courses Offered Section */}
      <section id="courses" className="gmit-courses">
        <div className="gmit-courses-container">
          <h2 className="gmit-section-title">Courses Offered</h2>
          <p className="gmit-courses-subtitle">
            GMIT currently offers six essential engineering disciplines as a part of its pedagogy, approved by AICTE and affiliated to MAKAUT.
          </p>
          <div className="gmit-courses-slider">
            {coursesData.slice(0, 3).map((course) => (
              <div key={course.id} className="gmit-course-card">
                <div className="gmit-course-image-container">
                  <div className="gmit-course-image-placeholder">
                    {course.name.split(" ").map(w => w[0]).join("")}
                  </div>
                </div>
                <div className="gmit-course-card-content">
                  <span className="gmit-course-tag">{course.tag}</span>
                  <h3 className="gmit-course-name">{course.name}</h3>
                  <Link to="/courses" className="gmit-course-link">
                    <span>Know More</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Placement Partners Section */}
      <section className="gmit-partners">
        <div className="gmit-partners-container">
          <h2 className="gmit-section-title">Our Placement Partners</h2>
          <div className="gmit-section-divider"></div>
          <div className="gmit-partners-row">
            <span className="gmit-partner-logo">Ericsson</span>
            <span className="gmit-partner-logo">Blue Star</span>
            <span className="gmit-partner-logo">Unilever</span>
            <span className="gmit-partner-logo">Flipkart</span>
            <span className="gmit-partner-logo">Tata Steel</span>
            <span className="gmit-partner-logo">Amazon</span>
            <span className="gmit-partner-logo">Capgemini</span>
            <span className="gmit-partner-logo">Cognizant</span>
            <span className="gmit-partner-logo">PwC</span>
          </div>
        </div>
      </section>

      {/* 7. Automatic Login/Register Modal popup */}
      {showLoginModal && (
        <div className="gmit-modal-overlay active">
          <div className="gmit-modal-content">
            {authModalMode === "login" ? (
              <Login 
                isModal={true} 
                onClose={() => setShowLoginModal(false)} 
                onSwitchMode={() => setAuthModalMode("register")} 
              />
            ) : (
              <Register 
                isModal={true} 
                onClose={() => setShowLoginModal(false)} 
                onSwitchMode={() => setAuthModalMode("login")} 
              />
            )}
          </div>
        </div>
      )}

    </div>
  );
};

export default Home;
