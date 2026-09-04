import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

export const Navbar = () => {
  const { user, isAuthenticated, logout, demoLogin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleDemoAccess = () => {
    demoLogin();
    navigate('/feed');
  };

  return (
    <header className="navbar-header">
      <div className="container navbar-container">
        <Link to="/" className="navbar-logo">
          <svg className="logo-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="4"/>
            <path d="M8 12h8"/>
            <path d="M12 8v8"/>
          </svg>
          <span className="logo-text">BuildBoard</span>
        </Link>

        <nav className="navbar-links">
          <Link to="/feed" className={`nav-link ${location.pathname === '/feed' ? 'active' : ''}`}>
            Explore Feed
          </Link>
          {isAuthenticated && (
            <>
              <Link to="/add" className={`nav-link ${location.pathname === '/add' ? 'active' : ''}`}>
                Launch Product
              </Link>
              <Link to="/profile" className={`nav-link ${location.pathname === '/profile' ? 'active' : ''}`}>
                My Profile
              </Link>
            </>
          )}
        </nav>

        <div className="navbar-actions">
          {isAuthenticated ? (
            <div className="user-profile-menu">
              <Link to="/add" className="btn btn-primary btn-sm">
                + Launch Product
              </Link>
              <Link to="/profile" className="user-avatar-badge" title="View Profile">
                <img src={user.avatarUrl} alt={user.name} className="avatar-img" />
                <span className="user-name">{user.name.split(' ')[0]}</span>
              </Link>
              <button onClick={logout} className="btn btn-outline btn-sm">
                Log Out
              </button>
            </div>
          ) : (
            <div className="auth-buttons">
              <button onClick={handleDemoAccess} className="btn btn-outline btn-sm demo-btn">
                Demo User
              </button>
              <Link to="/login" className="btn btn-secondary btn-sm">
                Log In
              </Link>
              <Link to="/signup" className="btn btn-primary btn-sm">
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
