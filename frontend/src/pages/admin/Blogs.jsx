import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import "./AdminCourses.css";

const AdminBlogs = () => {
  const { user, token } = useSelector((state) => state.auth);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Form state
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ title: "", category: "", content: "", imageUrl: "" });

  // Axios config
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/blogs");
      if (data.success) {
        setBlogs(data.data);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/blogs", formData, config);
      alert("Blog created successfully");
      setShowForm(false);
      setFormData({ title: "", category: "", content: "", imageUrl: "" });
      fetchBlogs();
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      try {
        await axios.delete(`http://localhost:5000/api/blogs/${id}`, config);
        fetchBlogs();
      } catch (error) {
        alert("Failed to delete blog");
      }
    }
  };

  return (
    <div className="admin-courses-container">
      <div className="admin-courses-header">
        <h2>Blog Management</h2>
        <button 
          className="add-course-btn"
          onClick={() => {
            setShowForm(!showForm);
            setFormData({ title: "", category: "", content: "", imageUrl: "" });
          }}
        >
          {showForm ? "Cancel" : "+ Add New Blog"}
        </button>
      </div>

      {showForm && (
        <div className="course-form-card">
          <h3>Create New Blog</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>Blog Title</label>
                <input type="text" name="title" value={formData.title} onChange={handleInputChange} required placeholder="e.g. Exploring Vast Horizons" />
              </div>
              <div className="form-group">
                <label>Category</label>
                <input type="text" name="category" value={formData.category} onChange={handleInputChange} required placeholder="e.g. CSE (AI-ML)" />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>Image URL</label>
                <input type="url" name="imageUrl" value={formData.imageUrl} onChange={handleInputChange} required placeholder="https://example.com/image.jpg" />
              </div>
            </div>

            <div className="form-group">
              <label>Content</label>
              <textarea name="content" value={formData.content} onChange={handleInputChange} rows="5" required placeholder="Write your blog content here..."></textarea>
            </div>

            <button type="submit" className="submit-btn">Publish Blog</button>
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
                <th>Title</th>
                <th>Category</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs.length === 0 ? (
                <tr><td colSpan="4" className="text-center">No blogs found</td></tr>
              ) : (
                blogs.map(blog => (
                  <tr key={blog._id}>
                    <td><strong>{blog.title}</strong></td>
                    <td>{blog.category}</td>
                    <td>{new Date(blog.createdAt).toLocaleDateString()}</td>
                    <td className="action-buttons">
                      <button onClick={() => handleDelete(blog._id)} className="delete-btn">Delete</button>
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

export default AdminBlogs;
