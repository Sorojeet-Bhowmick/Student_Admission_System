import { useState } from "react";
import axios from "axios";
import "./TrackStatus.css";

const TrackStatus = () => {
  const [appId, setAppId] = useState("");
  const [statusData, setStatusData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTrack = async (e) => {
    e.preventDefault();
    setError("");
    setStatusData(null);
    setLoading(true);

    try {
      const { data } = await axios.get(`http://localhost:5000/api/applications/status/${appId}`);
      setStatusData(data);
    } catch (err) {
      setError(err.response?.data?.message || "Application not found. Please check your ID.");
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending": return "#f59e0b"; // orange
      case "Verified": return "#3b82f6"; // blue
      case "Approved": return "#10b981"; // green
      case "Rejected": return "#ef4444"; // red
      default: return "#64748b";
    }
  };

  return (
    <div className="track-status-container">
      <div className="track-box">
        <h2>Track Application Status</h2>
        <p>Enter your Application ID to check your current admission status.</p>
        
        <form onSubmit={handleTrack} className="track-form">
          <input 
            type="text" 
            placeholder="e.g., APP20261234" 
            value={appId} 
            onChange={(e) => setAppId(e.target.value)} 
            required 
            className="track-input"
          />
          <button type="submit" className="track-submit-btn" disabled={loading}>
            {loading ? "Tracking..." : "Track Status"}
          </button>
        </form>

        {error && <div className="track-error">{error}</div>}

        {statusData && (
          <div className="status-result-card fade-in">
            <div className="status-header">
              <h3>{statusData.name}</h3>
              <span className="status-course">{statusData.course}</span>
            </div>
            
            <div className="status-body">
              <div className="status-row">
                <span className="label">Application ID:</span>
                <strong className="value">{statusData.applicationId}</strong>
              </div>
              <div className="status-row">
                <span className="label">Current Status:</span>
                <strong className="value status-badge" style={{ backgroundColor: getStatusColor(statusData.status) }}>
                  {statusData.status}
                </strong>
              </div>
              <div className="status-row">
                <span className="label">Submitted On:</span>
                <span className="value">{new Date(statusData.submittedAt).toLocaleDateString()}</span>
              </div>
            </div>

            <div className="status-timeline">
              <div className={`timeline-step ${statusData.status !== "Rejected" ? "completed" : ""}`}>
                <div className="step-circle">1</div>
                <span>Submitted</span>
              </div>
              <div className="timeline-line"></div>
              <div className={`timeline-step ${["Verified", "Approved"].includes(statusData.status) ? "completed" : ""}`}>
                <div className="step-circle">2</div>
                <span>Verified</span>
              </div>
              <div className="timeline-line"></div>
              <div className={`timeline-step ${statusData.status === "Approved" ? "completed" : ""}`}>
                <div className="step-circle">3</div>
                <span>Approved</span>
              </div>
            </div>
            
            {statusData.status === "Approved" && (
              <div className="approved-note">
                <strong>Congratulations!</strong> Your application has been approved. Please check your registered email for your Login Credentials (Enrollment & Roll No).
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackStatus;
