import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import PaymentModal from "./PaymentModal";
import "../../pages/public/Home.css";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="gmit-navbar-container">
      {/* Top Bar Header */}
      <div className="gmit-topbar">
        <div className="gmit-topbar-left">
          <div className="gmit-topbar-socials">
            <a href="#facebook" className="gmit-topbar-social-icon" aria-label="Facebook">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M9 8H7v3h2v9h3v-9h3.6l.4-3H12V6c0-.9.2-1.2 1-1.2h2V2h-3c-2.8 0-5 1.7-5 4.8V8z"/></svg>
            </a>
            <a href="#instagram" className="gmit-topbar-social-icon" aria-label="Instagram">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>
            <a href="#youtube" className="gmit-topbar-social-icon" aria-label="YouTube">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.516 0-9.387.507a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.871.507 9.387.507 9.387.507s7.517 0 9.387-.507a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            </a>
            <a href="#linkedin" className="gmit-topbar-social-icon" aria-label="LinkedIn">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            </a>
          </div>

          <div className="gmit-topbar-contacts">
            <span className="gmit-topbar-contact-item">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              <span>marketing_gmit@jisgroup.org</span>
            </span>
            <span className="gmit-topbar-contact-item">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
              <span>+91 83369 42309</span>
            </span>
          </div>
        </div>

        <div className="gmit-topbar-right">
          <a href="https://www.google.com/maps/place/Gargi+Memorial+Institute+of+Technology/@22.3780384,88.4383666,17z/data=!3m1!4b1!4m6!3m5!1s0x3a026d0097533aed:0xe18407a46f2e97f6!8m2!3d22.3780335!4d88.4409415!16s%2Fg%2F11gwgz8bmr?entry=tts" target="_blank" rel="noopener noreferrer" className="gmit-topbar-link">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
            <span>Our Location</span>
          </a>
          <Link to="/blogs" className="gmit-topbar-link">Our Blogs</Link>
          <Link to="/apply" className="gmit-topbar-btn">Enroll Now</Link>
        </div>
      </div>

      {/* Main Header / Navigation */}
      <header className="gmit-navbar">
        <Link to="/" className="gmit-brand-logos">
          {/* Stylized SVG GMIT Logo */}
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--gmit-orange)" }}>
            <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
            <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"></path>
          </svg>
          <div className="gmit-logo-divider"></div>
          <div className="gmit-logo-text">
            <h1>GMIT KOLKATA</h1>
            <span>Gargi Memorial Institute of Tech</span>
          </div>
        </Link>

        <nav className="gmit-nav-links">
          <NavLink to="/" className="gmit-nav-item" end>Home</NavLink>
          <NavLink to="/about" className="gmit-nav-item">About GMIT</NavLink>
          <a href="#courses" className="gmit-nav-item">Courses</a>
          <NavLink to="/academics" className="gmit-nav-item">Academics</NavLink>
          <NavLink to="/placements" className="gmit-nav-item">Training & Placements</NavLink>
        </nav>

        <div className="gmit-navbar-actions">
          <a href="#payment" className="gmit-pay-btn" onClick={(e) => { e.preventDefault(); setIsPaymentModalOpen(true); }}>
            Online Payment
          </a>
          {user ? (
            <>
              <Link to="/dashboard" className="gmit-portal-btn">Dashboard</Link>
              {user.role === "admin" && (
                <>
                  <Link to="/admin/enquiries" className="gmit-portal-btn" style={{ backgroundColor: "var(--gmit-orange)" }}>Enquiries</Link>
                  <Link to="/admin/courses" className="gmit-portal-btn" style={{ backgroundColor: "var(--gmit-orange)", marginLeft: "10px" }}>Courses</Link>
                  <Link to="/admin/applications" className="gmit-portal-btn" style={{ backgroundColor: "var(--gmit-orange)", marginLeft: "10px" }}>Applications</Link>
                  <Link to="/admin/blogs" className="gmit-portal-btn" style={{ backgroundColor: "var(--gmit-orange)", marginLeft: "10px" }}>Blogs</Link>
                  <Link to="/admin/users" className="gmit-portal-btn" style={{ backgroundColor: "var(--gmit-orange)", marginLeft: "10px" }}>Users</Link>
                </>
              )}
              <button 
                type="button" 
                className="gmit-portal-btn" 
                onClick={handleLogout}
                style={{ backgroundColor: "#ef4444", border: "none", cursor: "pointer" }}
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="gmit-portal-btn">Student Portal</Link>
          )}
        </div>
      </header>

      <PaymentModal 
        isOpen={isPaymentModalOpen} 
        onClose={() => setIsPaymentModalOpen(false)} 
      />
    </div>
  );
};

export default Navbar;
