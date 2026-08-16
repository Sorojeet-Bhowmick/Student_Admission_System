import { Link } from "react-router-dom";
import "./Placements.css";

const recruiters = [
  "TCS", "Cognizant", "Wipro", "Infosys", "Capgemini", 
  "IBM", "Amazon", "Tech Mahindra", "Accenture", "L&T Infotech",
  "PwC", "EY", "Deloitte", "KPMG", "Mindtree",
  "Hexaware", "Mphasis", "Cisco", "Ericsson", "Blue Star"
];

const Placements = () => {
  return (
    <div className="placements-page">
      {/* Hero Section */}
      <section className="placements-hero">
        <div className="placements-hero-overlay"></div>
        <div className="placements-hero-content">
          <h1>Training & Placements</h1>
          <p>Empowering students to achieve their dream careers through rigorous training and excellent industry connections.</p>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="placements-stats-section">
        <div className="placements-container">
          <div className="stats-grid">
            <div className="stat-card">
              <h3>85%+</h3>
              <p>Placement Rate</p>
            </div>
            <div className="stat-card">
              <h3>10 LPA</h3>
              <p>Highest Package</p>
            </div>
            <div className="stat-card">
              <h3>4.5 LPA</h3>
              <p>Average Package</p>
            </div>
            <div className="stat-card">
              <h3>200+</h3>
              <p>Recruiting Partners</p>
            </div>
          </div>
        </div>
      </section>

      {/* Training Programs */}
      <section className="training-programs">
        <div className="placements-container">
          <div className="section-header">
            <h2>Our Training Methodology</h2>
            <div className="divider"></div>
            <p>We believe in preparing our students not just for their first job, but for a lifelong successful career.</p>
          </div>
          
          <div className="training-grid">
            <div className="training-card">
              <div className="training-icon">🎯</div>
              <h4>Aptitude & Logical Reasoning</h4>
              <p>Rigorous practice sessions to crack the initial screening rounds of top MNCs.</p>
            </div>
            <div className="training-card">
              <div className="training-icon">💻</div>
              <h4>Technical Upskilling</h4>
              <p>Hands-on coding bootcamps, workshops on emerging technologies like AI, IoT, and Cloud.</p>
            </div>
            <div className="training-card">
              <div className="training-icon">🗣️</div>
              <h4>Soft Skills & Communication</h4>
              <p>Enhancing spoken English, body language, and professional email writing etiquette.</p>
            </div>
            <div className="training-card">
              <div className="training-icon">🤝</div>
              <h4>Mock Interviews</h4>
              <p>Simulated technical and HR interviews conducted by industry veterans.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Top Recruiters */}
      <section className="top-recruiters">
        <div className="placements-container">
          <div className="section-header">
            <h2>Our Proud Placement Partners</h2>
            <div className="divider"></div>
          </div>
          
          <div className="recruiters-grid">
            {recruiters.map((company, index) => (
              <div key={index} className="recruiter-logo">
                {company}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="placements-cta">
        <div className="placements-container">
          <h2>Ready to Kickstart Your Career?</h2>
          <p>Join GMIT and secure your future with our stellar placement assistance.</p>
          <Link to="/apply" className="cta-button">Apply for Admission</Link>
        </div>
      </section>
    </div>
  );
};

export default Placements;
