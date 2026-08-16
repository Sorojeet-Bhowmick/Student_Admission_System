import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import "./AdminCourses.css"; // We'll create this next

const AdminCourses = () => {
  const { user, token } = useSelector((state) => state.auth);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Form state
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: "", duration: "", fees: "", eligibility: "", description: "" });
  const [editId, setEditId] = useState(null);

  // Axios config
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    fetchCourses();
  }, []);

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

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await axios.put(`http://localhost:5000/api/courses/${editId}`, formData, config);
        alert("Course updated successfully");
      } else {
        await axios.post("http://localhost:5000/api/courses", formData, config);
        alert("Course created successfully");
      }
      setShowForm(false);
      setFormData({ name: "", duration: "", fees: "", eligibility: "", description: "" });
      setEditId(null);
      fetchCourses();
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  const handleEdit = (course) => {
    setFormData({
      name: course.name,
      duration: course.duration,
      fees: course.fees,
      eligibility: course.eligibility,
      description: course.description || "",
    });
    setEditId(course._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      try {
        await axios.delete(`http://localhost:5000/api/courses/${id}`, config);
        fetchCourses();
      } catch (error) {
        alert("Failed to delete course");
      }
    }
  };

  return (
    <div className="admin-courses-container">
      <div className="admin-courses-header">
        <h2>Course Management</h2>
        <button 
          className="add-course-btn"
          onClick={() => {
            setShowForm(!showForm);
            setEditId(null);
            setFormData({ name: "", duration: "", fees: "", eligibility: "", description: "" });
          }}
        >
          {showForm ? "Cancel" : "+ Add New Course"}
        </button>
      </div>

      {showForm && (
        <div className="course-form-card">
          <h3>{editId ? "Edit Course" : "Create New Course"}</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>Course Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} required placeholder="e.g. B.Tech Computer Science" />
              </div>
              <div className="form-group">
                <label>Duration</label>
                <input type="text" name="duration" value={formData.duration} onChange={handleInputChange} required placeholder="e.g. 4 Years" />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>Fees (₹)</label>
                <input type="number" name="fees" value={formData.fees} onChange={handleInputChange} required placeholder="e.g. 80000" />
              </div>
              <div className="form-group">
                <label>Eligibility</label>
                <input type="text" name="eligibility" value={formData.eligibility} onChange={handleInputChange} required placeholder="e.g. 60% in PCM" />
              </div>
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea name="description" value={formData.description} onChange={handleInputChange} rows="3" placeholder="Brief description of the course..."></textarea>
            </div>

            <button type="submit" className="submit-btn">{editId ? "Update Course" : "Save Course"}</button>
          </form>
        </div>
      )}

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Course Name</th>
                <th>Duration</th>
                <th>Fees</th>
                <th>Eligibility</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {courses.length === 0 ? (
                <tr><td colSpan="5" className="text-center">No courses found</td></tr>
              ) : (
                courses.map(course => (
                  <tr key={course._id}>
                    <td><strong>{course.name}</strong></td>
                    <td>{course.duration}</td>
                    <td>₹{course.fees.toLocaleString()}</td>
                    <td>{course.eligibility}</td>
                    <td className="action-buttons">
                      <button onClick={() => handleEdit(course)} className="edit-btn">Edit</button>
                      <button onClick={() => handleDelete(course._id)} className="delete-btn">Delete</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminCourses;
