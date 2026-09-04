import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-brand">
          <div className="footer-logo">
            <svg className="footer-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="4"/>
              <path d="M8 12h8"/>
              <path d="M12 8v8"/>
            </svg>
            <span>BuildBoard</span>
          </div>
          <p className="footer-tagline">
            The minimal product discovery platform for modern software creators.
          </p>
        </div>

        <div className="footer-links-grid">
          <div className="footer-col">
            <h5 className="footer-heading">Platform</h5>
            <Link to="/feed" className="footer-link">Discover Products</Link>
            <Link to="/add" className="footer-link">Launch Product</Link>
            <Link to="/feed?filter=best" className="footer-link">Best of the Week</Link>
          </div>

          <div className="footer-col">
            <h5 className="footer-heading">Community</h5>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="footer-link">GitHub Repository</a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="footer-link">Developer Guidelines</a>
            <a href="#" className="footer-link">Product Guidelines</a>
          </div>

          <div className="footer-col">
            <h5 className="footer-heading">System</h5>
            <span className="footer-link status-indicator">
              <span className="dot"></span> All Systems Operational
            </span>
            <span className="footer-text">Built for high performance</span>
          </div>
        </div>
      </div>

      <div className="container footer-bottom">
        <p>&copy; {new Date().getFullYear()} BuildBoard Inc. All rights reserved.</p>
        <div className="footer-legal">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
        </div>
      </div>
      
      <div className="footer-watermark">
        buildboard
      </div>
    </footer>
  );
};
