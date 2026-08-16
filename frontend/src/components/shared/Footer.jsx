import { Link } from "react-router-dom";
import "../../pages/public/Home.css";

const Footer = () => {
  return (
    <footer className="gmit-footer-container">
      <div className="gmit-footer">
        {/* About GMIT Col */}
        <div className="gmit-footer-col">
          <div className="gmit-footer-logo">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ color: "var(--gmit-orange)" }}>
              <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
              <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"></path>
            </svg>
            <span style={{ fontWeight: 800, fontSize: "1.1rem", color: "#ffffff", letterSpacing: "-0.01em" }}>GMIT KOLKATA</span>
          </div>
          <p className="gmit-footer-desc">
            Gargi Memorial Institute of Technology is a private engineering institution in Kolkata, West Bengal, India, that offers undergraduate four-year engineering degree courses in six disciplines. The college is approved by AICTE and affiliated with Maulana Abul Kalam Azad University of Technology (MAKAUT).
          </p>
          <div style={{ display: "flex", gap: "0.75rem" }}>
            <a href="#f" className="gmit-topbar-social-icon" aria-label="Facebook">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M9 8H7v3h2v9h3v-9h3.6l.4-3H12V6c0-.9.2-1.2 1-1.2h2V2h-3c-2.8 0-5 1.7-5 4.8V8z"/></svg>
            </a>
            <a href="#i" className="gmit-topbar-social-icon" aria-label="Instagram">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>
            <a href="#y" className="gmit-topbar-social-icon" aria-label="YouTube">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.516 0-9.387.507a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.871.507 9.387.507 9.387.507s7.517 0 9.387-.507a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            </a>
            <a href="#l" className="gmit-topbar-social-icon" aria-label="LinkedIn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            </a>
          </div>
        </div>

        {/* Quick Links Col */}
        <div className="gmit-footer-col">
          <h3>Quick Links</h3>
          <ul className="gmit-footer-links">
            <li><Link to="/">Home</Link></li>
            <li><a href="#about">About GMIT</a></li>
            <li><a href="#courses">Courses</a></li>
            <li><a href="#scholarship">Scholarship</a></li>
            <li><a href="#contact">Contact Us</a></li>
            <li><a href="#placement">Placement</a></li>
          </ul>
        </div>

        {/* Useful Links Col */}
        <div className="gmit-footer-col">
          <h3>Useful Links</h3>
          <ul className="gmit-footer-links">
            <li><a href="#fees">Course Fee Structure</a></li>
            <li><a href="#creditcard">Student Credit Card</a></li>
            <li><a href="#calendar">Academic Calendar</a></li>
            <li><a href="#privacy">Privacy Policy</a></li>
            <li><a href="#recruitment">Recruitment</a></li>
            <li><a href="#grievance">Online Grievance Redressal</a></li>
          </ul>
        </div>

        {/* Get In Touch Col */}
        <div className="gmit-footer-col">
          <h3>Get In Touch</h3>
          <div className="gmit-footer-contacts">
            <div className="gmit-footer-contact-item">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
              <span>Balarampur, Mouza Beralia, Baruipur, Kolkata - 700144</span>
            </div>
            <div className="gmit-footer-contact-item">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
              <span>+91 83369 42309 / +91 83369 42264</span>
            </div>
            <div className="gmit-footer-contact-item">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              <span>marketing_gmit@jisgroup.org</span>
            </div>
          </div>
        </div>
      </div>
      <hr className="gmit-footer-divider" />
      <div className="gmit-footer-bottom">
        <p>© 2026 GMIT. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
