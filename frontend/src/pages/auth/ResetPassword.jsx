import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { resetPassword, clearError } from "../../features/auth/authSlice";
import "./Auth.css";

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [localError, setLocalError] = useState("");
  const { user, loading, error } = useSelector((state) => state.auth);
  
  const email = location.state?.email || "";

  useEffect(() => {
    if (!email) {
      navigate("/forgot-password");
    }
  }, [email, navigate]);

  useEffect(() => {
    if (user) navigate("/dashboard");
    return () => dispatch(clearError());
  }, [user, navigate, dispatch]);

  useEffect(() => {
    setLocalError("");
  }, [newPassword, confirmPassword]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setLocalError("Passwords do not match.");
      return;
    }
    setLocalError("");
    dispatch(resetPassword({ email, otp, newPassword }));
  };

  return (
    <section className="auth-page-wrapper">
      <div className="auth-card">
        <header className="auth-header">
          <button type="button" className="auth-header-btn" onClick={() => navigate("/forgot-password")} aria-label="Go Back">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
          </button>
          <h1 className="auth-header-title">SecurePortal</h1>
          <button type="button" className="auth-header-btn" onClick={() => alert("Check your inbox (and spam folder) for the 6-digit OTP code.")} aria-label="Information">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="16" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12.01" y2="8"></line>
            </svg>
          </button>
        </header>

        <h2 className="auth-title">Set New Password</h2>
        <p className="auth-subtitle">
          Enter the OTP code sent to <strong style={{ color: "#002878" }}>{email || "your email"}</strong> and choose a secure new password.
        </p>

        {localError && <div className="auth-alert auth-alert-error">{localError}</div>}
        {error && <div className="auth-alert auth-alert-error">{error}</div>}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-form-group">
            <label className="auth-label">OTP Code</label>
            <div className="auth-input-wrapper">
              <input 
                type="text" 
                className="auth-input" 
                placeholder="e.g. 123456" 
                value={otp} 
                onChange={(e) => setOtp(e.target.value)} 
                maxLength={6} 
                required 
              />
            </div>
          </div>

          <div className="auth-form-group">
            <label className="auth-label">New Password</label>
            <div className="auth-input-wrapper">
              <input 
                type={showPassword ? "text" : "password"} 
                className="auth-input auth-input-suffix" 
                placeholder="••••••••" 
                value={newPassword} 
                onChange={(e) => setNewPassword(e.target.value)} 
                minLength={6} 
                required 
              />
              <button 
                type="button" 
                className="auth-input-toggle" 
                onClick={() => setShowPassword(!showPassword)}
                tabIndex="-1"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                    <line x1="1" y1="1" x2="23" y2="23"></line>
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div className="auth-form-group">
            <label className="auth-label">Confirm New Password</label>
            <div className="auth-input-wrapper">
              <input 
                type={showConfirmPassword ? "text" : "password"} 
                className="auth-input auth-input-suffix" 
                placeholder="••••••••" 
                value={confirmPassword} 
                onChange={(e) => setConfirmPassword(e.target.value)} 
                minLength={6} 
                required 
              />
              <button 
                type="button" 
                className="auth-input-toggle" 
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                tabIndex="-1"
                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
              >
                {showConfirmPassword ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                    <line x1="1" y1="1" x2="23" y2="23"></line>
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                )}
              </button>
            </div>
          </div>

          <button type="submit" className="auth-submit-btn" disabled={loading}>
            <span>{loading ? "Resetting..." : "Reset Password"}</span>
            {!loading && (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            )}
          </button>
        </form>

        <div className="auth-footer">
          Back to <Link to="/login" className="auth-link">Login</Link>
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;
