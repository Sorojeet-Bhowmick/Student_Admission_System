import { useParams, Link } from "react-router-dom";
import "./CourseDetail.css";

const courseDetails = {
  cse: {
    name: "B.Tech Computer Science Engineering Course (CSE)",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "The Computer Science and Engineering (CSE) program at Gargi Memorial Institute of Technology (GMIT) is designed to equip students with the knowledge and skills needed to excel in the dynamic field of computing. The course offers a comprehensive curriculum covering core areas such as programming, algorithms, data structures, software engineering, and computer architecture. Students will have access to state-of-the-art facilities and laboratories, allowing them to gain practical experience in areas such as network programming, database management, and cybersecurity. The program also emphasizes the importance of problem-solving, critical thinking, and teamwork, preparing students for successful careers in the field of computer science and engineering."
  },
  csbs: {
    name: "Computer Science and Business Systems",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "The Computer Science and Business Systems program is designed by industry experts to provide a perfect blend of technology and business management skills. This interdisciplinary course ensures that graduates are not only technically proficient but also understand the business implications of technology solutions. The curriculum includes cutting-edge computing subjects along with humanities, human values, and management sciences."
  },
  ece: {
    name: "B.Tech Electronics and Communication Engineering (ECE)",
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "The Electronics and Communication Engineering program focuses on the design, analysis, and application of electronic devices, circuits, and communication systems. Students gain hands-on experience in VLSI design, embedded systems, signal processing, and modern telecommunication networks, preparing them for roles in both core electronics and IT sectors."
  },
  ee: {
    name: "Electrical Engineering",
    image: "https://images.unsplash.com/photo-1581092335397-9583eb92d232?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Electrical Engineering at GMIT provides a strong foundation in electrical power systems, control systems, machines, and renewable energy technologies. The department focuses on practical training through well-equipped laboratories, industrial visits, and expert lectures to ensure students are industry-ready."
  },
  me: {
    name: "BTech Mechanical Engineering Course",
    image: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "The Mechanical Engineering program covers core concepts including mechanics, kinematics, thermodynamics, materials science, and structural analysis. It integrates traditional engineering with modern fields like robotics, CAD/CAM, and automation, providing students with a versatile skill set for various manufacturing and design industries."
  },
  ce: {
    name: "Civil Engineering",
    image: "https://images.unsplash.com/photo-1541888086925-920a0f443b2f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "The Civil Engineering department focuses on the planning, design, construction, and maintenance of the physical and naturally built environment. Students study structural engineering, environmental engineering, geotechnical engineering, and transportation, gaining the expertise to build sustainable and resilient infrastructure."
  }
};

const CourseDetail = () => {
  const { courseId } = useParams();
  const course = courseDetails[courseId];

  if (!course) {
    return <div className="course-detail-container">Course not found.</div>;
  }

  return (
    <div className="course-detail-container">
      <Link to="/academics" className="back-btn">&larr; Back to Academics</Link>
      
      <div className="course-detail-content">
        <div className="course-detail-image">
          <img src={course.image} alt={course.name} />
        </div>
        
        <div className="course-detail-text">
          <h2><span className="highlight-text">ABOUT</span> THE COURSE</h2>
          <p>{course.description}</p>
          <div className="course-detail-actions">
            <Link to="/apply" className="apply-btn">Apply Now</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
