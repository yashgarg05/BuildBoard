import React, { useState } from 'react';
import { Link, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './AuthPages.css';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { isAuthenticated, login, demoLogin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  if (isAuthenticated) {
    return <Navigate to="/feed" replace />;
  }

  const from = location.state?.from?.pathname || '/feed';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    const result = login(email, password);
    if (result.success) {
      navigate(from, { replace: true });
    } else {
      setError('Invalid login credentials.');
    }
  };

  const handleQuickDemo = () => {
    demoLogin();
    navigate(from, { replace: true });
  };

  return (
    <div className="auth-page">
      <div className="auth-card card">
        <div className="auth-header">
          <Link to="/" className="auth-logo">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <rect x="3" y="3" width="18" height="18" rx="4"/>
              <path d="M8 12h8"/>
              <path d="M12 8v8"/>
            </svg>
            <span>BuildBoard</span>
          </Link>
          <h2>Sign in to your account</h2>
          <p>Welcome back! Enter your credentials to access the platform.</p>
        </div>

        {error && <div className="form-error-banner">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label className="form-label" htmlFor="email">Email address</label>
            <input
              id="email"
              type="email"
              className="form-input"
              placeholder="alex@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              className="form-input"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary btn-full btn-lg">
            Sign In
          </button>
        </form>

        <div className="auth-divider">
          <span>OR QUICK TEST</span>
        </div>

        <button onClick={handleQuickDemo} className="btn btn-outline btn-full demo-auth-btn">
          Log in as Demo Creator (Alex Rivera)
        </button>

        <div className="auth-footer">
          <p>
            Don't have an account? <Link to="/signup">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};
