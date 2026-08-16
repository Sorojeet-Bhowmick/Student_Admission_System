import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import "./Admin.css";
import "./Applications.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/auth";
const APP_URL = API_URL.replace("/auth", "/applications");
const UPLOADS_URL = "http://localhost:5000/"; // for serving static files if needed, though they are absolute paths, we need to handle them. Wait, file paths might be like "uploads\17...pdf"

const AdminApplications = () => {
  const { token } = useSelector((state) => state.auth);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedApp, setSelectedApp] = useState(null); // For viewing details modal

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const { data } = await axios.get(APP_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setApplications(data);
    } catch (err) {
      setError("Failed to fetch applications.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    if (!window.confirm(`Are you sure you want to change the status to ${newStatus}?`)) return;
    try {
      const { data } = await axios.put(
        `${APP_URL}/${id}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // Update local state
      setApplications(applications.map((app) => (app._id === id ? data : app)));
      if (selectedApp && selectedApp._id === id) {
        setSelectedApp(data);
      }
      alert(`Status updated to ${newStatus}. ${newStatus === 'Approved' ? 'Roll No and Credentials generated!' : ''}`);
    } catch (err) {
      alert("Error updating status: " + (err.response?.data?.message || err.message));
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "Pending": return "badge-warning";
      case "Verified": return "badge-info";
      case "Approved": return "badge-success";
      case "Rejected": return "badge-danger";
      default: return "badge-secondary";
    }
  };

  const getFileUrl = (filePath) => {
    // Assuming backend serves the uploads folder statically at /
    if (!filePath) return "#";
    // Convert backslashes to forward slashes for URLs
    const normalizedPath = filePath.replace(/\\/g, '/');
    return `http://localhost:5000/${normalizedPath}`;
  };

  if (loading) return <div className="admin-loading">Loading applications...</div>;
  if (error) return <div className="admin-error">{error}</div>;

  return (
    <div className="admin-page-container">
      <div className="admin-header">
        <h2>Admission Applications</h2>
        <p>Review student applications, verify documents, and generate enrollment credentials.</p>
      </div>

      <div className="admin-table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>App ID</th>
              <th>Name</th>
              <th>Course</th>
              <th>Applied On</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ textAlign: "center", padding: "2rem" }}>
                  No applications found.
                </td>
              </tr>
            ) : (
              applications.map((app) => (
                <tr key={app._id}>
                  <td><strong>{app.applicationId}</strong></td>
                  <td>{app.personalDetails.fullName}</td>
                  <td>{app.courseId ? app.courseId.name : "N/A"}</td>
                  <td>{new Date(app.createdAt).toLocaleDateString()}</td>
                  <td>
                    <span className={`admin-badge ${getStatusBadgeClass(app.status)}`}>
                      {app.status}
                    </span>
                  </td>
                  <td>
                    <button 
                      className="admin-action-btn view-btn"
                      onClick={() => setSelectedApp(app)}
                    >
                      Review
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Application Details Modal */}
      {selectedApp && (
        <div className="admin-modal-overlay active" onClick={() => setSelectedApp(null)}>
          <div className="admin-modal-content large-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Application Details - {selectedApp.applicationId}</h3>
              <button className="close-btn" onClick={() => setSelectedApp(null)}>×</button>
            </div>
            
            <div className="modal-body application-details">
              <div className="app-grid">
                <div className="app-section">
                  <h4>Applicant Status</h4>
                  <div className="detail-row">
                    <span>Current Status:</span>
                    <strong className={`admin-badge ${getStatusBadgeClass(selectedApp.status)}`}>
                      {selectedApp.status}
                    </strong>
                  </div>
                  {selectedApp.enrollmentNo && (
                    <div className="detail-row">
                      <span>Enrollment No:</span>
                      <strong>{selectedApp.enrollmentNo}</strong>
                    </div>
                  )}
                  {selectedApp.rollNo && (
                    <div className="detail-row">
                      <span>Roll No:</span>
                      <strong>{selectedApp.rollNo}</strong>
                    </div>
                  )}
                  <div className="status-actions">
                    <p>Update Status:</p>
                    <div className="btn-group">
                      <button 
                        disabled={selectedApp.status === "Pending"} 
                        onClick={() => handleStatusChange(selectedApp._id, "Pending")}
                        className="status-btn pending"
                      >Pending</button>
                      <button 
                        disabled={selectedApp.status === "Verified"} 
                        onClick={() => handleStatusChange(selectedApp._id, "Verified")}
                        className="status-btn verified"
                      >Verify Docs</button>
                      <button 
                        disabled={selectedApp.status === "Approved"} 
                        onClick={() => handleStatusChange(selectedApp._id, "Approved")}
                        className="status-btn approved"
                      >Approve & Generate ID</button>
                      <button 
                        disabled={selectedApp.status === "Rejected"} 
                        onClick={() => handleStatusChange(selectedApp._id, "Rejected")}
                        className="status-btn rejected"
                      >Reject</button>
                    </div>
                  </div>
                </div>

                <div className="app-section">
                  <h4>Personal Details</h4>
                  <p><strong>Name:</strong> {selectedApp.personalDetails.fullName}</p>
                  <p><strong>DOB:</strong> {new Date(selectedApp.personalDetails.dateOfBirth).toLocaleDateString()}</p>
                  <p><strong>Gender:</strong> {selectedApp.personalDetails.gender}</p>
                  <p><strong>Category:</strong> {selectedApp.personalDetails.category}</p>
                  <p><strong>Father:</strong> {selectedApp.personalDetails.fatherName}</p>
                  <p><strong>Mother:</strong> {selectedApp.personalDetails.motherName}</p>
                </div>

                <div className="app-section">
                  <h4>Contact Details</h4>
                  <p><strong>Email:</strong> {selectedApp.contactDetails.email}</p>
                  <p><strong>Phone:</strong> {selectedApp.contactDetails.mobileNumber}</p>
                  <p><strong>Address:</strong> {selectedApp.contactDetails.address}, {selectedApp.contactDetails.city}, {selectedApp.contactDetails.state} - {selectedApp.contactDetails.pincode}</p>
                </div>

                <div className="app-section">
                  <h4>Academic Details</h4>
                  <div className="academic-table">
                    <h5>Class 10</h5>
                    <p>{selectedApp.academicDetails.class10.board} ({selectedApp.academicDetails.class10.passingYear}) - {selectedApp.academicDetails.class10.percentage}%</p>
                    <h5>Class 12</h5>
                    <p>{selectedApp.academicDetails.class12.board} ({selectedApp.academicDetails.class12.passingYear}) - {selectedApp.academicDetails.class12.percentage}%</p>
                  </div>
                </div>
              </div>

              <div className="app-section full-width">
                <h4>Uploaded Documents</h4>
                <div className="documents-grid">
                  <a href={getFileUrl(selectedApp.documents.passportPhoto)} target="_blank" rel="noreferrer" className="doc-link">Passport Photo</a>
                  <a href={getFileUrl(selectedApp.documents.signature)} target="_blank" rel="noreferrer" className="doc-link">Signature</a>
                  <a href={getFileUrl(selectedApp.documents.aadhaarCard)} target="_blank" rel="noreferrer" className="doc-link">Aadhaar Card</a>
                  <a href={getFileUrl(selectedApp.documents.class10Marksheet)} target="_blank" rel="noreferrer" className="doc-link">Class 10 Marksheet</a>
                  <a href={getFileUrl(selectedApp.documents.class12Marksheet)} target="_blank" rel="noreferrer" className="doc-link">Class 12 Marksheet</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminApplications;
