import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { forgotPassword, clearError } from "../../features/auth/authSlice";
import "./Auth.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    return () => dispatch(clearError());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(forgotPassword({ email })).then((res) => {
      if (forgotPassword.fulfilled.match(res)) {
        navigate("/reset-password", { state: { email } });
      }
    });
  };

  return (
    <section className="auth-page-wrapper">
      <div className="auth-card">
        <header className="auth-header">
          <button type="button" className="auth-header-btn" onClick={() => navigate("/login")} aria-label="Go Back">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
          </button>
          <h1 className="auth-header-title">SecurePortal</h1>
          <button type="button" className="auth-header-btn" onClick={() => alert("Provide your registered email to request a reset token.")} aria-label="Information">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="16" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12.01" y2="8"></line>
            </svg>
          </button>
        </header>

        <h2 className="auth-title">Forgot Password?</h2>
        <p className="auth-subtitle">Enter your email address and we'll send you an OTP to reset your password.</p>

        {error && <div className="auth-alert auth-alert-error">{error}</div>}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-form-group">
            <label className="auth-label">Email Address</label>
            <div className="auth-input-wrapper">
              <input 
                type="email" 
                className="auth-input" 
                placeholder="name@company.com" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
              />
            </div>
          </div>

          <button type="submit" className="auth-submit-btn" disabled={loading}>
            <span>{loading ? "Sending..." : "Send OTP"}</span>
            {!loading && (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            )}
          </button>
        </form>

        <div className="auth-footer">
          Remembered your password? <Link to="/login" className="auth-link">Log In</Link>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
