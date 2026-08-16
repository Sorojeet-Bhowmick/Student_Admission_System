import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { register, googleLogin, clearError } from "../../features/auth/authSlice";
import { useGoogleLogin } from "@react-oauth/google";
import "./Auth.css";

const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || "";

const Register = ({ isModal = false, onClose = null, onSwitchMode = null }) => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [localError, setLocalError] = useState("");
  const [agreed, setAgreed] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading, error, success } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    } else if (success) {
      navigate("/verify-otp", { state: { email: formData.email } });
    }
    return () => dispatch(clearError());
  }, [success, user, navigate, dispatch, formData.email]);

  // Clear local error when user types
  useEffect(() => {
    if (localError) setLocalError("");
  }, [formData]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!agreed) {
      setLocalError("You must agree to the Terms and Conditions and Privacy Policy.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setLocalError("Passwords do not match.");
      return;
    }
    dispatch(register({ name: formData.name, email: formData.email, password: formData.password }));
  };

  const googleSignIn = googleClientId ? useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const accessToken = tokenResponse.access_token;
      const idToken = tokenResponse.id_token;
      if (!accessToken && !idToken) return;
      dispatch(googleLogin({ idToken, accessToken })).then((actionResult) => {
        if (googleLogin.fulfilled.match(actionResult)) {
          const data = actionResult.payload;
          if (data?.otpRequired) {
            navigate("/verify-otp", { state: { email: data.email } });
          }
        }
      });
    },
    onError: () => console.error("Google registration failed"),
    scope: "profile email",
  }) : null;

  const displayError = localError || error;

  const cardContent = (
    <div className="auth-card">
      <header className="auth-header">
        <button 
          type="button" 
          className="auth-header-btn" 
          onClick={() => isModal ? onClose && onClose() : navigate("/login")} 
          aria-label={isModal ? "Close" : "Go Back"}
        >
          {isModal ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
          )}
        </button>
        <h1 className="auth-header-title">SecurePortal</h1>
        <button type="button" className="auth-header-btn" onClick={() => alert("Registration creates your student profile securely.")} aria-label="Information">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="16" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12.01" y2="8"></line>
          </svg>
        </button>
      </header>

      <h2 className="auth-title">Create Account</h2>
      <p className="auth-subtitle">Join the portal to start securing your digital identity with military-grade protection.</p>

      {displayError && <div className="auth-alert auth-alert-error">{displayError}</div>}

      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="auth-form-group">
          <label className="auth-label">Full Name</label>
          <div className="auth-input-wrapper">
            <input 
              type="text" 
              name="name"
              className="auth-input" 
              placeholder="e.g. John Doe" 
              value={formData.name} 
              onChange={handleChange} 
              required 
            />
          </div>
        </div>

        <div className="auth-form-group">
          <label className="auth-label">Email Address</label>
          <div className="auth-input-wrapper">
            <input 
              type="email" 
              name="email"
              className="auth-input" 
              placeholder="name@company.com" 
              value={formData.email} 
              onChange={handleChange} 
              required 
            />
          </div>
        </div>

        <div className="auth-form-group">
          <label className="auth-label">Password</label>
          <div className="auth-input-wrapper">
            <input 
              type={showPassword ? "text" : "password"} 
              name="password"
              className="auth-input auth-input-suffix" 
              placeholder="••••••••" 
              value={formData.password} 
              onChange={handleChange} 
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
          <span className="auth-input-hint">Must be at least 8 characters with a symbol.</span>
        </div>

        <div className="auth-form-group">
          <label className="auth-label">Confirm Password</label>
          <div className="auth-input-wrapper">
            <input 
              type={showConfirmPassword ? "text" : "password"} 
              name="confirmPassword"
              className="auth-input auth-input-suffix" 
              placeholder="••••••••" 
              value={formData.confirmPassword} 
              onChange={handleChange} 
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

        <div className="auth-options" style={{ margin: "0.5rem 0" }}>
          <label className="auth-checkbox-label" style={{ alignItems: "flex-start", lineHeight: "1.4" }}>
            <input 
              type="checkbox" 
              className="auth-checkbox" 
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              style={{ marginTop: "2px" }}
            />
            <span>
              I agree to the <a href="#terms" className="auth-link" onClick={(e) => { e.preventDefault(); alert("Terms and Conditions Agreement text here."); }}>Terms and Conditions</a> and the <a href="#privacy" className="auth-link" onClick={(e) => { e.preventDefault(); alert("Privacy Policy text here."); }}>Privacy Policy</a>.
            </span>
          </label>
        </div>

        <button type="submit" className="auth-submit-btn" disabled={loading}>
          <span>{loading ? "Registering..." : "Create Account"}</span>
          {!loading && (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          )}
        </button>
      </form>

      <div className="auth-divider">
        <div className="auth-divider-line"></div>
        <span className="auth-divider-text">or continue with</span>
        <div className="auth-divider-line"></div>
      </div>

      <div className="auth-social-group">
        <button 
          type="button" 
          className="auth-social-btn" 
          onClick={() => {
            if (!googleClientId) return alert("Google Client ID not configured. Set VITE_GOOGLE_CLIENT_ID in your frontend env.");
            return googleSignIn && googleSignIn();
          }}
          disabled={!googleClientId}
        >
          <svg width="18" height="18" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
          </svg>
          <span>Google</span>
        </button>

        <button type="button" className="auth-social-btn" onClick={() => alert("Apple signup is currently in sandbox testing mode.")}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.05 20.28c-.98.95-2.05 1.88-3.08 1.88-1.02 0-1.4-.62-2.58-.62-1.18 0-1.58.6-2.56.62-1 .02-2.13-.98-3.14-1.92-2.04-1.96-3.62-5.55-3.62-8.91 0-5.32 3.46-8.15 6.87-8.15 1.08 0 2.1.66 2.76.66.67 0 1.86-.78 3.12-.78 1.3 0 2.5.68 3.25 1.7-2.65 1.6-2.23 5.16.5 6.27-1.1 2.76-2.8 5.6-5.1 7.27zm-2.83-16.2c1.2-1.47 1.13-3.18 1.05-3.83-1.47.1-2.9 1.02-3.5 1.77-.92.98-1.46 2.6-1.3 3.86 1.45.1 2.7-.72 3.75-1.8z"/>
          </svg>
          <span>Apple</span>
        </button>
      </div>

      {!googleClientId && <p className="auth-input-hint" style={{ textAlign: "center" }}>Google Sign-In is currently offline.</p>}

      <div className="auth-footer">
        Already have an account? 
        {isModal && onSwitchMode ? (
          <button type="button" onClick={onSwitchMode} className="auth-link" style={{border:'none', background:'none', cursor:'pointer', padding:0, fontSize:'inherit', fontWeight:'inherit', fontFamily:'inherit'}}>Log In</button>
        ) : (
          <Link to="/login" className="auth-link">Log In</Link>
        )}
      </div>
    </div>
  );

  if (isModal) {
    return cardContent;
  }

  return (
    <section className="auth-page-wrapper">
      {cardContent}
    </section>
  );
};

export default Register;
