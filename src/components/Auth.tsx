import React, { useState, FormEvent } from "react";
import { useAuth } from "../contexts/AuthContext";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../styles/Auth.css";

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const { signIn, signUp } = useAuth();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      if (isLogin) {
        await signIn(email, password);
      } else {
        if (password !== confirmPassword) {
          throw new Error("Passwords do not match");
        }
        if (password.length < 6) {
          throw new Error("Password must be at least 6 characters");
        }
        await signUp(email, password);
        setMessage({
          type: "success",
          text: "Account created! Please check your email to verify your account.",
        });
      }
    } catch (error: any) {
      setMessage({
        type: "error",
        text: error.message || "An error occurred",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <i className="bi bi-shield-check auth-icon"></i>
          <h1>CampusGuard</h1>
          <p>Predictive Maintenance System</p>
        </div>

        <div className="auth-tabs">
          <button
            className={isLogin ? "active" : ""}
            onClick={() => {
              setIsLogin(true);
              setMessage(null);
            }}
          >
            <i className="bi bi-box-arrow-in-right"></i> Login
          </button>
          <button
            className={!isLogin ? "active" : ""}
            onClick={() => {
              setIsLogin(false);
              setMessage(null);
            }}
          >
            <i className="bi bi-person-plus"></i> Sign Up
          </button>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">
              <i className="bi bi-envelope"></i> Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">
              <i className="bi bi-lock"></i> Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              minLength={6}
              required
            />
          </div>

          {!isLogin && (
            <div className="form-group">
              <label htmlFor="confirmPassword">
                <i className="bi bi-lock-fill"></i> Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                minLength={6}
                required
              />
            </div>
          )}

          <button type="submit" disabled={loading} className="submit-btn">
            {loading ? (
              <>
                <i className="bi bi-hourglass-split"></i> Processing...
              </>
            ) : isLogin ? (
              <>
                <i className="bi bi-box-arrow-in-right"></i> Login
              </>
            ) : (
              <>
                <i className="bi bi-person-check"></i> Create Account
              </>
            )}
          </button>
        </form>

        {message && (
          <div className={`auth-message ${message.type}`}>
            <i
              className={`bi ${
                message.type === "success"
                  ? "bi-check-circle"
                  : "bi-exclamation-circle"
              }`}
            ></i>
            {message.text}
          </div>
        )}

        <div className="auth-footer">
          <i className="bi bi-info-circle"></i>
          <p>
            {isLogin
              ? "Don't have an account? Click Sign Up above."
              : "Already have an account? Click Login above."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
