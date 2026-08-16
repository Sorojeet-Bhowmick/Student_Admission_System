import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import "./Admin.css"; // We'll make sure there's styling or reuse auth css

const ENQUIRY_API_URL = (import.meta.env.VITE_API_URL || "http://localhost:5000/api/auth").replace("/auth", "/enquiry");

const Enquiries = () => {
  const token = useSelector((state) => state.auth.token) || localStorage.getItem("token");
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [stateFilter, setStateFilter] = useState("All");
  const [programFilter, setProgramFilter] = useState("All");
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ status: "", notes: "" });
  const [updatingId, setUpdatingId] = useState(null);

  const fetchEnquiries = async () => {
    try {
      setLoading(true);
      const res = await axios.get(ENQUIRY_API_URL, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEnquiries(res.data);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Failed to load enquiries.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchEnquiries();
    }
  }, [token]);

  const handleEditClick = (enq) => {
    setEditingId(enq._id);
    setEditForm({ status: enq.status, notes: enq.notes || "" });
  };

  const handleUpdateSubmit = async (id) => {
    try {
      setUpdatingId(id);
      const res = await axios.put(`${ENQUIRY_API_URL}/${id}`, editForm, {
        headers: { 
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });
      
      // Update local state
      setEnquiries(enquiries.map(e => e._id === id ? res.data.enquiry : e));
      setEditingId(null);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Failed to update enquiry.");
    } finally {
      setUpdatingId(null);
    }
  };

  // Filtering Logic
  const filteredEnquiries = enquiries.filter((enq) => {
    const matchesSearch = 
      enq.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enq.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enq.phone.includes(searchTerm) ||
      enq.enquiryId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enq.city.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "All" || enq.status === statusFilter;
    const matchesState = stateFilter === "All" || enq.state === stateFilter;
    const matchesProgram = programFilter === "All" || enq.program === programFilter;

    return matchesSearch && matchesStatus && matchesState && matchesProgram;
  });

  return (
    <section className="admin-portal-wrapper">
      <div className="admin-container">
        
        {/* Header */}
        <header className="admin-header-row">
          <div className="admin-header-left">
            <span className="admin-subtitle">Admissions Desk</span>
            <h2 className="admin-title">Admission Enquiries Board</h2>
          </div>
          <button type="button" className="admin-refresh-btn" onClick={fetchEnquiries} disabled={loading}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginRight: "6px" }}>
              <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/>
            </svg>
            <span>Refresh</span>
          </button>
        </header>

        {error && <div className="auth-alert auth-alert-error">{error}</div>}

        {/* Filters Panel */}
        <div className="admin-filters-card">
          <div className="admin-search-wrapper">
            <svg className="admin-search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input 
              type="text" 
              placeholder="Search by name, email, phone, city, or ID..." 
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)}
              className="admin-search-input"
            />
          </div>

          <div className="admin-selects-row">
            <div className="admin-select-group">
              <label>Status</label>
              <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                <option value="All">All Statuses</option>
                <option value="Pending">Pending</option>
                <option value="Contacted">Contacted</option>
                <option value="Resolved">Resolved</option>
              </select>
            </div>

            <div className="admin-select-group">
              <label>State</label>
              <select value={stateFilter} onChange={(e) => setStateFilter(e.target.value)}>
                <option value="All">All States</option>
                <option value="West Bengal">West Bengal</option>
                <option value="Bihar">Bihar</option>
                <option value="Jharkhand">Jharkhand</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="admin-select-group">
              <label>Program</label>
              <select value={programFilter} onChange={(e) => setProgramFilter(e.target.value)}>
                <option value="All">All Programs</option>
                <option value="B.Tech">B.Tech (4 Years)</option>
                <option value="B.Tech Lateral">B.Tech Lateral (3 Years)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="admin-stats-summary-row">
          <div className="admin-summary-badge">Total Enquiries: <strong>{filteredEnquiries.length}</strong></div>
          <div className="admin-summary-badge status-pending">Pending: <strong>{filteredEnquiries.filter(e => e.status === "Pending").length}</strong></div>
          <div className="admin-summary-badge status-contacted">Contacted: <strong>{filteredEnquiries.filter(e => e.status === "Contacted").length}</strong></div>
          <div className="admin-summary-badge status-resolved">Resolved: <strong>{filteredEnquiries.filter(e => e.status === "Resolved").length}</strong></div>
        </div>

        {/* Main Board Card */}
        <div className="admin-board-card">
          {loading ? (
            <div className="admin-loading-spinner-container">
              <div className="admin-spinner"></div>
              <p>Fetching Enquiries from database...</p>
            </div>
          ) : filteredEnquiries.length === 0 ? (
            <div className="admin-empty-state">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="8" y1="12" x2="16" y2="12"></line>
              </svg>
              <p>No enquiries found matching the criteria.</p>
            </div>
          ) : (
            <div className="admin-table-container">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Ref ID</th>
                    <th>Name</th>
                    <th>Contact Info</th>
                    <th>Preferences</th>
                    <th>Status</th>
                    <th>Created At</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEnquiries.map((enq) => {
                    const isEditing = editingId === enq._id;
                    const statusClass = `status-badge badge-${enq.status.toLowerCase()}`;
                    
                    return (
                      <tr key={enq._id} className={isEditing ? "row-editing" : ""}>
                        <td className="col-ref-id">{enq.enquiryId}</td>
                        <td className="col-name">
                          <strong>{enq.name}</strong>
                          <span className="subtext-city">{enq.city}, {enq.state}</span>
                        </td>
                        <td className="col-contact">
                          <span className="info-item">📞 +91 {enq.phone}</span>
                          <span className="info-item">✉️ {enq.email}</span>
                        </td>
                        <td className="col-pref">
                          <span className="pref-badge program">{enq.program}</span>
                          <span className="pref-badge branch">{enq.branch}</span>
                        </td>
                        <td className="col-status">
                          {isEditing ? (
                            <select 
                              value={editForm.status} 
                              onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                              className="edit-status-select"
                            >
                              <option value="Pending">Pending</option>
                              <option value="Contacted">Contacted</option>
                              <option value="Resolved">Resolved</option>
                            </select>
                          ) : (
                            <span className={statusClass}>{enq.status}</span>
                          )}
                        </td>
                        <td className="col-date">
                          {new Date(enq.createdAt).toLocaleDateString()}
                          <span className="subtext-time">{new Date(enq.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        </td>
                        <td className="col-actions">
                          {isEditing ? (
                            <div className="actions-editing-group">
                              <button 
                                type="button" 
                                className="action-btn-save" 
                                onClick={() => handleUpdateSubmit(enq._id)}
                                disabled={updatingId === enq._id}
                              >
                                {updatingId === enq._id ? "Saving..." : "Save"}
                              </button>
                              <button 
                                type="button" 
                                className="action-btn-cancel" 
                                onClick={() => setEditingId(null)}
                                disabled={updatingId === enq._id}
                              >
                                Cancel
                              </button>
                            </div>
                          ) : (
                            <button type="button" className="action-btn-manage" onClick={() => handleEditClick(enq)}>
                              Manage
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Collapsible Panel for follow-up notes if editing */}
        {editingId && (
          <div className="admin-side-panel">
            <div className="panel-header">
              <h3>Follow-up Details</h3>
              <button type="button" className="panel-close-btn" onClick={() => setEditingId(null)}>×</button>
            </div>
            <div className="panel-body">
              <div className="form-field">
                <label>Update Status</label>
                <select 
                  value={editForm.status} 
                  onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                >
                  <option value="Pending">Pending</option>
                  <option value="Contacted">Contacted (Counselor Called)</option>
                  <option value="Resolved">Resolved (Admission Finalized)</option>
                </select>
              </div>

              <div className="form-field">
                <label>Counselor Follow-up Notes</label>
                <textarea 
                  rows="6" 
                  placeholder="Add notes about the student conversation, preferred batch, financial questions..."
                  value={editForm.notes}
                  onChange={(e) => setEditForm({ ...editForm, notes: e.target.value })}
                ></textarea>
              </div>

              <button 
                type="button" 
                className="panel-submit-btn" 
                onClick={() => handleUpdateSubmit(editingId)}
                disabled={updatingId === editingId}
              >
                {updatingId === editingId ? "Saving Changes..." : "Save Notes & Status"}
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default Enquiries;
