import "./About.css";

const About = () => {
  return (
    <div className="about-page-container">
      <div className="about-hero">
        <h1>About GMIT</h1>
        <p>A Structured Ecosystem for Full-Stack Capabilities & Industry Integration</p>
      </div>

      <div className="about-content">
        <section className="about-section">
          <h2>Core Curriculum & Tech Stack</h2>
          <p>
            The 4-year B.Tech Computer Science and Engineering (CSE) program (intake of 120) is split heavily between computational theory and practical programming.
          </p>
          <ul>
            <li><strong>Foundation & Architecture:</strong> The curriculum enforces a strong grounding in core developer essentials: Data Structures and Algorithms, Database Management, and Computer Architecture.</li>
            <li><strong>Software Engineering Principles:</strong> The program outcomes explicitly focus on training developers to analyze real-world problems, map out optimal algorithmic approaches, and apply standard software engineering techniques to build scalable solutions.</li>
            <li><strong>Emerging Technologies:</strong> Beyond the basics, the coursework integrates advanced tech domains heavily demanded in the current market, including:
              <ul>
                <li>Artificial Intelligence & Machine Learning</li>
                <li>Big Data Analytics & Data Mining</li>
                <li>Internet of Things (IoT)</li>
                <li>Cyber Security & Blockchain</li>
                <li>Open-Source Technologies</li>
              </ul>
            </li>
          </ul>
        </section>

        <section className="about-section">
          <h2>Practical Training & Infrastructure</h2>
          <p>
            GMIT emphasizes moving away from pure theory to experiential learning to make developers industry-ready before graduation.
          </p>
          <ul>
            <li><strong>Specialized Labs:</strong> Developers have access to upgraded laboratories specifically focused on network programming, database management, and emerging R&D areas.</li>
            <li><strong>Incubation:</strong> The campus hosts an <strong>Entrepreneurship Development Cell (EDC)</strong>, which provides incubation facilities for developers looking to build tech startups or product ideas, along with the "JIS Idea-O-Meter" for idea incubation.</li>
            <li><strong>Always Connected:</strong> The campus provides free, high-speed Wi-Fi across its grounds, allowing you to code, push to repositories, or test applications from anywhere.</li>
          </ul>
        </section>

        <section className="about-section">
          <h2>The Final-Year Internship Program</h2>
          <p>
            One of the most critical advantages for a developer at GMIT is the structured transition into the workforce.
          </p>
          <ul>
            <li><strong>Paid Internships:</strong> The institute mandates paid internships right after the completion of the 6th semester.</li>
            <li><strong>Hands-on Deployment:</strong> Instead of just academic projects, you work alongside seasoned industry professionals, applying your classroom learning (like building real-time apps or intelligent systems) to live, real-world problems, frequently leading to permanent absorption into the company.</li>
          </ul>
        </section>

        <section className="about-section">
          <h2>Seminars, AI & Tech Culture</h2>
          <p>
            The college frequently bridges the gap between academic code and industry standards through continuous tech events:
          </p>
          <ul>
            <li><strong>AI Conferences:</strong> They recently hosted the "Conference on AI FOR ATMA NIRBHAR BHARAT" (April 2026), focusing directly on the intersection of AI and modern tech infrastructure.</li>
            <li><strong>Security & Hacking:</strong> Regular workshops, such as the seminar on "Career Exposure in Cybersecurity & Ethical Hacking."</li>
            <li><strong>Industry Talks:</strong> Regular sessions with alumni and IT leaders covering current IT trends, giving developers direct insight into what skills (like specific frameworks or testing environments) companies are currently hunting for.</li>
          </ul>
        </section>

        <section className="about-section">
          <h2>Developer Placements & Industry Roles</h2>
          <p>
            The Training & Placement Cell explicitly focuses on analytical, quantitative, and domain competence to clear rigorous technical interviews.
          </p>
          <ul>
            <li><strong>Top Tech Recruiters:</strong> Developers from the campus are consistently placed in top global IT services and product companies, including <strong>TCS</strong>, Infosys, Cognizant, IBM, Capgemini, and Accenture.</li>
            <li><strong>High-Value Packages:</strong> The alumni network showcases developers securing premium packages, such as:
              <ul>
                <li>Ernst & Young (EY) at 20 LPA</li>
                <li>3R Infotech at 22 LPA</li>
                <li>TCS at 18 LPA</li>
                <li>Infosys at 20 LPA</li>
              </ul>
            </li>
            <li><strong>Targeted Developer Roles:</strong> Recent graduates have stepped directly into roles like Software Developer Trainee (e.g., at Runtime Solutions) and Product Analyst, proving the curriculum supports both heavy coding and product management pathways.</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default About;
