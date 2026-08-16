import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import "./Admin.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/auth";
const USERS_URL = API_URL.replace("/auth", "/users");

const AdminUsers = () => {
  const { token, user: currentUser } = useSelector((state) => state.auth);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get(USERS_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(data);
    } catch (err) {
      setError("Failed to fetch users.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (id, newRole) => {
    if (!window.confirm(`Are you sure you want to make this user an ${newRole}?`)) return;
    try {
      const { data } = await axios.put(
        `${USERS_URL}/${id}/role`,
        { role: newRole },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUsers(users.map((u) => (u._id === id ? { ...u, role: data.role } : u)));
      alert("User role updated successfully.");
    } catch (err) {
      alert("Error updating role: " + (err.response?.data?.message || err.message));
    }
  };

  if (loading) return <div className="admin-loading">Loading users...</div>;
  if (error) return <div className="admin-error">{error}</div>;

  return (
    <div className="admin-page-container">
      <div className="admin-header">
        <h2>User Management</h2>
        <p>Manage registered users and assign administrator privileges.</p>
      </div>

      <div className="admin-table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Current Role</th>
              <th>Joined Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ textAlign: "center", padding: "2rem" }}>
                  No users found.
                </td>
              </tr>
            ) : (
              users.map((u) => (
                <tr key={u._id}>
                  <td><strong>{u.name}</strong></td>
                  <td>{u.email}</td>
                  <td>
                    <span className={`admin-badge ${u.role === 'admin' ? 'badge-success' : 'badge-secondary'}`}>
                      {u.role.toUpperCase()}
                    </span>
                  </td>
                  <td>{new Date(u.createdAt).toLocaleDateString()}</td>
                  <td>
                    {u._id === currentUser._id ? (
                      <span style={{ color: "gray", fontSize: "0.85rem", fontStyle: "italic" }}>Current User</span>
                    ) : (
                      <select 
                        value={u.role}
                        onChange={(e) => handleRoleChange(u._id, e.target.value)}
                        className="admin-select-role"
                        style={{ padding: "5px", borderRadius: "4px" }}
                      >
                        <option value="student">Student</option>
                        <option value="admin">Admin</option>
                      </select>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsers;
