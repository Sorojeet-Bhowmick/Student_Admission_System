import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { logout } from "../../features/auth/authSlice";
import "./Dashboard.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/auth";
const APP_URL = API_URL.replace("/auth", "/applications");

const Dashboard = () => {
  const { user, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Password Change State
  const [showPasswordModal, setShowPasswordModal] = useState(user?.isFirstLogin || false);
  const [passwordData, setPasswordData] = useState({ oldPassword: "", newPassword: "", confirmPassword: "" });
  const [passwordError, setPasswordError] = useState("");
  const [passwordLoading, setPasswordLoading] = useState(false);

  // Profile Edit State
  const [isEditingContact, setIsEditingContact] = useState(false);
  const [contactData, setContactData] = useState({});
  const [updateLoading, setUpdateLoading] = useState(false);

  useEffect(() => {
    if (user?.role === "student") {
      fetchMyApplication();
    } else {
      setLoading(false);
    }
  }, [user]);

  const fetchMyApplication = async () => {
    try {
      const { data } = await axios.get(`${APP_URL}/my-application`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setApplication(data);
      setContactData({
        mobileNumber: data.contactDetails.mobileNumber,
        address: data.contactDetails.address,
        city: data.contactDetails.city,
        state: data.contactDetails.state,
        pincode: data.contactDetails.pincode
      });
    } catch (err) {
      if (err.response?.status !== 404) {
        setError("Failed to fetch application data.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleContactUpdate = async (e) => {
    e.preventDefault();
    setUpdateLoading(true);
    try {
      const { data } = await axios.put(`${APP_URL}/my-application`, contactData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setApplication(data);
      setIsEditingContact(false);
      alert("Contact details updated successfully!");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update details.");
    } finally {
      setUpdateLoading(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setPasswordError("");
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      return setPasswordError("New passwords do not match.");
    }

    setPasswordLoading(true);
    try {
      await axios.put(`${API_URL}/change-password`, 
        { oldPassword: passwordData.oldPassword, newPassword: passwordData.newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Password changed successfully! Please log in again with your new password.");
      setShowPasswordModal(false);
      dispatch(logout());
    } catch (err) {
      setPasswordError(err.response?.data?.message || "Failed to change password.");
    } finally {
      setPasswordLoading(false);
    }
  };

  if (loading) return <div className="dashboard-loading">Loading your dashboard...</div>;

  return (
    <div className="dashboard-page-container">
      {/* Force Password Change Modal */}
      {showPasswordModal && (
        <div className="dashboard-modal-overlay active">
          <div className="dashboard-modal-content">
            <h3>{user?.isFirstLogin ? "Welcome! Please Change Your Password" : "Change Password"}</h3>
            {user?.isFirstLogin && <p className="text-muted">For your security, you must change your default password before accessing your dashboard.</p>}
            
            {passwordError && <div className="alert-error">{passwordError}</div>}
            
            <form onSubmit={handlePasswordChange} className="password-form">
              <div className="form-group">
                <label>Current Password</label>
                <input 
                  type="password" 
                  value={passwordData.oldPassword}
                  onChange={(e) => setPasswordData({...passwordData, oldPassword: e.target.value})}
                  required 
                />
              </div>
              <div className="form-group">
                <label>New Password</label>
                <input 
                  type="password" 
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                  required 
                  minLength={6}
                />
              </div>
              <div className="form-group">
                <label>Confirm New Password</label>
                <input 
                  type="password" 
                  value={passwordData.confirmPassword}
                  onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                  required 
                />
              </div>
              <div className="modal-actions">
                {!user?.isFirstLogin && (
                  <button type="button" className="btn-cancel" onClick={() => setShowPasswordModal(false)}>Cancel</button>
                )}
                <button type="submit" className="btn-submit" disabled={passwordLoading}>
                  {passwordLoading ? "Saving..." : "Change Password"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {user?.role === "admin" ? (
        <div className="dashboard-card admin-welcome">
          <h2>Admin Dashboard</h2>
          <p>Welcome back, Administrator. Use the navbar to manage enquiries, courses, and applications.</p>
        </div>
      ) : (
        <div className="student-dashboard-wrapper">
          <div className="dashboard-header">
            <div className="header-text">
              <h2>Welcome, {user?.name}</h2>
              <p>Student Portal Dashboard</p>
            </div>
            <button className="btn-outline" onClick={() => setShowPasswordModal(true)}>Change Password</button>
          </div>

          {error && <div className="alert-error">{error}</div>}

          {!application ? (
            <div className="dashboard-card no-app">
              <h3>No Application Found</h3>
              <p>We could not find an admission application linked to your account.</p>
            </div>
          ) : (
            <div className="dashboard-grid">
              
              {/* Enrollment Card */}
              <div className="dashboard-card enrollment-card">
                <h3>Academic Profile</h3>
                <div className="card-content">
                  <div className="detail-item">
                    <span>Course</span>
                    <strong>{application.courseId ? application.courseId.name : "N/A"}</strong>
                  </div>
                  <div className="detail-item">
                    <span>Status</span>
                    <strong className={`status-badge ${application.status.toLowerCase()}`}>{application.status}</strong>
                  </div>
                  {application.enrollmentNo && (
                    <div className="detail-item">
                      <span>Enrollment No.</span>
                      <strong>{application.enrollmentNo}</strong>
                    </div>
                  )}
                  {application.rollNo && (
                    <div className="detail-item">
                      <span>Roll No.</span>
                      <strong>{application.rollNo}</strong>
                    </div>
                  )}
                  <div className="detail-item">
                    <span>Application ID</span>
                    <strong>{application.applicationId}</strong>
                  </div>
                </div>
              </div>

              {/* Personal Info */}
              <div className="dashboard-card info-card">
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom: '20px', borderBottom: '2px solid #f1f5f9', paddingBottom: '10px'}}>
                  <h3 style={{margin:0, borderBottom:'none', paddingBottom:0}}>Personal Details</h3>
                  {!isEditingContact && (
                    <button className="btn-outline" style={{padding:'4px 8px', fontSize:'0.8rem'}} onClick={() => setIsEditingContact(true)}>Edit Contact</button>
                  )}
                </div>
                
                {isEditingContact ? (
                  <form onSubmit={handleContactUpdate} className="contact-edit-form">
                    <div className="form-group">
                      <label>Mobile Number</label>
                      <input type="text" value={contactData.mobileNumber} onChange={(e) => setContactData({...contactData, mobileNumber: e.target.value})} required />
                    </div>
                    <div className="form-group">
                      <label>Address</label>
                      <input type="text" value={contactData.address} onChange={(e) => setContactData({...contactData, address: e.target.value})} required />
                    </div>
                    <div className="form-group" style={{display:'flex', gap:'10px'}}>
                      <div style={{flex:1}}>
                        <label>City</label>
                        <input type="text" value={contactData.city} onChange={(e) => setContactData({...contactData, city: e.target.value})} required style={{width:'100%'}} />
                      </div>
                      <div style={{flex:1}}>
                        <label>State</label>
                        <input type="text" value={contactData.state} onChange={(e) => setContactData({...contactData, state: e.target.value})} required style={{width:'100%'}} />
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Pincode</label>
                      <input type="text" value={contactData.pincode} onChange={(e) => setContactData({...contactData, pincode: e.target.value})} required />
                    </div>
                    <div className="modal-actions" style={{marginTop:'15px'}}>
                      <button type="button" className="btn-cancel" onClick={() => setIsEditingContact(false)}>Cancel</button>
                      <button type="submit" className="btn-submit" disabled={updateLoading}>{updateLoading ? "Saving..." : "Save"}</button>
                    </div>
                  </form>
                ) : (
                  <div className="card-content">
                    <div className="detail-item">
                      <span>Full Name</span>
                      <strong>{application.personalDetails.fullName}</strong>
                    </div>
                    <div className="detail-item">
                      <span>Date of Birth</span>
                      <strong>{new Date(application.personalDetails.dateOfBirth).toLocaleDateString()}</strong>
                    </div>
                    <div className="detail-item">
                      <span>Phone</span>
                      <strong>{application.contactDetails.mobileNumber}</strong>
                    </div>
                    <div className="detail-item">
                      <span>Email</span>
                      <strong>{application.contactDetails.email}</strong>
                    </div>
                    <div className="detail-item" style={{flexDirection:'column', alignItems:'flex-start', gap:'5px'}}>
                      <span>Address</span>
                      <strong>{application.contactDetails.address}, {application.contactDetails.city}, {application.contactDetails.state} - {application.contactDetails.pincode}</strong>
                    </div>
                  </div>
                )}
              </div>

            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
