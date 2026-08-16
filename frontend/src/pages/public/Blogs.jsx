import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Blogs.css";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
    fetchBlogs();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-CA'); // format: YYYY-MM-DD roughly matches the image
  };

  return (
    <div className="blogs-page-container">
      <div className="blogs-header">
        <h1>Latest Insights & News</h1>
        <p>Stay updated with the latest trends, career guides, and news from GMIT.</p>
      </div>

      {loading ? (
        <div className="blogs-loading">Loading blogs...</div>
      ) : (
        <div className="blogs-grid">
          {blogs.length === 0 ? (
            <p className="no-blogs-msg">No blogs available at the moment.</p>
          ) : (
            blogs.map((blog) => (
              <div key={blog._id} className="blog-card">
                <div className="blog-image-wrapper">
                  <img src={blog.imageUrl} alt={blog.title} className="blog-image" />
                  <span className="blog-category-badge">{blog.category}</span>
                </div>
                
                <div className="blog-card-content">
                  <div className="blog-meta">
                    <span className="blog-author">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                      {blog.author}
                    </span>
                    <span className="blog-date">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                      {formatDate(blog.createdAt)}
                    </span>
                  </div>
                  
                  <h2 className="blog-title">{blog.title}</h2>
                  <p className="blog-snippet">
                    {blog.content.length > 120 ? blog.content.substring(0, 120) + "..." : blog.content}
                  </p>
                  
                  <Link to={`/blogs/${blog._id}`} className="blog-read-more">
                    Read More &rarr;
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Blogs;
