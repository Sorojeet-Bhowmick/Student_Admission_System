import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { verifyOtp, resendOtp, clearError } from "../../features/auth/authSlice";
import "./Auth.css";

const VerifyOTP = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [otp, setOtp] = useState("");
  const { user, loading, error } = useSelector((state) => state.auth);
  
  const email = location.state?.email || "";

  useEffect(() => {
    if (user) navigate("/dashboard");
    return () => dispatch(clearError());
  }, [user, navigate, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(verifyOtp({ email, otp }));
  };

  const handleResend = () => {
    dispatch(resendOtp({ email }));
  };

  return (
    <section className="auth-page-wrapper">
      <div className="auth-card">
        <header className="auth-header">
          <button type="button" className="auth-header-btn" onClick={() => navigate("/register")} aria-label="Go Back">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
          </button>
          <h1 className="auth-header-title">SecurePortal</h1>
          <button type="button" className="auth-header-btn" onClick={() => alert("Verification is required to secure your account. Check your email for OTP.")} aria-label="Information">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="16" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12.01" y2="8"></line>
            </svg>
          </button>
        </header>

        <h2 className="auth-title">Verify Account</h2>
        <p className="auth-subtitle">
          Enter the 6-digit OTP code sent to <strong style={{ color: "#002878" }}>{email || "your email"}</strong> to complete registration.
        </p>

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

          <button type="submit" className="auth-submit-btn" disabled={loading}>
            <span>{loading ? "Verifying..." : "Verify OTP"}</span>
            {!loading && (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            )}
          </button>

          <button type="button" className="auth-secondary-btn" onClick={handleResend} disabled={loading}>
            <span>Resend OTP</span>
          </button>
        </form>

        <div className="auth-footer">
          Back to <Link to="/login" className="auth-link">Login</Link>
        </div>
      </div>
    </section>
  );
};

export default VerifyOTP;
