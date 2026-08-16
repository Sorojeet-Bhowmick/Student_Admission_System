import { useState, useEffect } from "react";
import axios from "axios";
import "./Courses.css"; // We'll create this next

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/courses");
        setCourses(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching courses:", error);
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  return (
    <div className="courses-page-container">
      <div className="courses-header">
        <h1>Our Academic Programs</h1>
        <p>Explore the wide range of undergraduate courses offered at GMIT.</p>
      </div>

      {loading ? (
        <div className="courses-loading">Loading courses...</div>
      ) : (
        <div className="courses-grid">
          {courses.length === 0 ? (
            <p>No courses currently available.</p>
          ) : (
            courses.map((course) => (
              <div key={course._id} className="course-card">
                <div className="course-card-header">
                  <h2>{course.name}</h2>
                  <span className="course-duration">{course.duration}</span>
                </div>
                <div className="course-card-body">
                  <p className="course-description">{course.description || "A comprehensive program designed to build industry-ready skills."}</p>
                  
                  <div className="course-details-list">
                    <div className="course-detail-item">
                      <strong>Eligibility:</strong>
                      <span>{course.eligibility}</span>
                    </div>
                    <div className="course-detail-item">
                      <strong>Course Fees:</strong>
                      <span className="course-fees">₹{course.fees.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="course-actions">
                    <Link to="/apply" className="apply-btn">Apply Now</Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Courses;
