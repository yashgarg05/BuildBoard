import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import './SettingsPage.css';

export const SettingsPage = () => {
  const { theme, setTheme, isDark } = useTheme();
  const { user } = useAuth();

  return (
    <div className="settings-page container">
      {/* Page Header */}
      <div className="settings-header">
        <h1 className="settings-title">Settings</h1>
        <p className="settings-subtitle">
          Manage your interface preferences and display options.
        </p>
      </div>

      {/* Main Settings Container */}
      <div className="settings-container">
        {/* Appearance Section */}
        <section className="settings-section card">
          <div className="section-header">
            <div className="section-header-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5" />
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
              </svg>
            </div>
            <div>
              <h2 className="section-title">Appearance</h2>
              <p className="section-description">
                Customize how BuildBoard looks on your device.
              </p>
            </div>
          </div>

          <div className="settings-divider" />

          {/* Theme Row */}
          <div className="setting-row">
            <div className="setting-info">
              <span className="setting-label">Theme</span>
              <span className="setting-hint">
                Choose between light and dark mode across the application.
              </span>
            </div>

            {/* Segmented Theme Switcher */}
            <div className="theme-toggle-group" role="radiogroup" aria-label="Theme selection">
              <button
                type="button"
                role="radio"
                aria-checked={!isDark}
                className={`theme-toggle-btn ${!isDark ? 'active' : ''}`}
                onClick={() => setTheme('light')}
              >
                <svg
                  className="theme-btn-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" />
                  <line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
                <span>Light</span>
              </button>

              <button
                type="button"
                role="radio"
                aria-checked={isDark}
                className={`theme-toggle-btn ${isDark ? 'active' : ''}`}
                onClick={() => setTheme('dark')}
              >
                <svg
                  className="theme-btn-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
                <span>Dark</span>
              </button>
            </div>
          </div>
        </section>

        {/* Scalable Account Preview Section */}
        {user && (
          <section className="settings-section card">
            <div className="section-header">
              <div className="section-header-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <div>
                <h2 className="section-title">Account</h2>
                <p className="section-description">
                  Signed in as <strong>{user.name}</strong> ({user.email})
                </p>
              </div>
            </div>

            <div className="settings-divider" />

            <div className="setting-row">
              <div className="setting-info">
                <span className="setting-label">Profile Identifier</span>
                <span className="setting-hint">@{user.username || 'creator'}</span>
              </div>
              <span className="badge badge-peach">Active</span>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default SettingsPage;
