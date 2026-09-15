import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Logo } from './Logo';
import './Navbar.css';

export const Navbar = () => {
  const { user, isAuthenticated, logout, demoLogin } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleDemoAccess = () => {
    demoLogin();
    navigate('/feed');
  };

  // Close dropdown when clicking outside or pressing Escape
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [dropdownOpen]);

  // Close dropdown on route change
  useEffect(() => {
    setDropdownOpen(false);
  }, [location.pathname]);

  return (
    <header className="navbar-header">
      <div className="container navbar-container">
        <Link to="/" className="navbar-logo" aria-label="BuildBoard Home">
          <Logo size="md" showBadge={true} />
        </Link>

        <nav className="navbar-links" aria-label="Main Navigation">
          <Link to="/feed" className={`nav-link ${location.pathname === '/feed' ? 'active' : ''}`}>
            Explore Feed
          </Link>
          {isAuthenticated && (
            <Link to="/add" className={`nav-link ${location.pathname === '/add' ? 'active' : ''}`}>
              Launch Product
            </Link>
          )}
        </nav>

        <div className="navbar-actions">
          {isAuthenticated && user ? (
            <div className="user-profile-menu">
              <Link to="/add" className="btn btn-primary btn-sm launch-nav-btn">
                + Launch Product
              </Link>

              {/* Profile Avatar Dropdown Trigger */}
              <div className="profile-dropdown-wrapper" ref={dropdownRef}>
                <button
                  type="button"
                  className={`user-avatar-btn ${dropdownOpen ? 'active' : ''}`}
                  onClick={() => setDropdownOpen((prev) => !prev)}
                  aria-haspopup="menu"
                  aria-expanded={dropdownOpen}
                  aria-label="User account menu"
                  id="user-profile-menu-button"
                >
                  <img src={user.avatarUrl} alt={user.name} className="avatar-img" />
                  <span className="user-name">{user.name.split(' ')[0]}</span>
                  <svg
                    className={`dropdown-chevron ${dropdownOpen ? 'open' : ''}`}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <div
                    className="profile-dropdown-menu"
                    role="menu"
                    aria-labelledby="user-profile-menu-button"
                  >
                    {/* User Info Header */}
                    <div className="dropdown-user-header">
                      <img src={user.avatarUrl} alt={user.name} className="dropdown-avatar-img" />
                      <div className="dropdown-user-info">
                        <span className="dropdown-user-name">{user.name}</span>
                        <span className="dropdown-user-handle">@{user.username || 'creator'}</span>
                      </div>
                    </div>

                    <div className="dropdown-divider" role="separator" />

                    {/* Navigation Items */}
                    <Link
                      to="/profile"
                      className={`dropdown-item ${location.pathname === '/profile' ? 'active' : ''}`}
                      role="menuitem"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                      <span>Profile</span>
                    </Link>

                    <Link
                      to="/settings"
                      className={`dropdown-item ${location.pathname === '/settings' ? 'active' : ''}`}
                      role="menuitem"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <circle cx="12" cy="12" r="3" />
                        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                      </svg>
                      <span>Settings</span>
                    </Link>

                    <div className="dropdown-divider" role="separator" />

                    <button
                      type="button"
                      className="dropdown-item dropdown-item-danger"
                      role="menuitem"
                      onClick={() => {
                        setDropdownOpen(false);
                        logout();
                      }}
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                        <polyline points="16 17 21 12 16 7" />
                        <line x1="21" y1="12" x2="9" y2="12" />
                      </svg>
                      <span>Log Out</span>
                    </button>
                  </div>
                )}
              </div>
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

export default Navbar;
