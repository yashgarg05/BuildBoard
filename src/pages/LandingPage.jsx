import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShowcaseCarousel } from '../components/ShowcaseCarousel';
import { ScrollReveal } from '../components/ScrollReveal';
import { useAuth } from '../context/AuthContext';
import './LandingPage.css';

export const LandingPage = () => {
  const { isAuthenticated, demoLogin } = useAuth();
  const navigate = useNavigate();

  const handleQuickDemo = () => {
    demoLogin();
    navigate('/feed');
  };

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container hero-container">
          <span className="badge badge-dark hero-badge">
            Next-Gen Product Discovery Platform
          </span>

          <h1 className="hero-title">
            Where Modern Software Creators <span className="text-orange">Launch & Get Discovered</span>
          </h1>

          <p className="hero-description">
            BuildBoard connects indie developers, AI engineers, and SaaS creators with early adopters. Showcase your products, collect authentic feedback, and rank on weekly community leaderboards.
          </p>

          <div className="hero-cta-group">
            <Link to="/feed" className="btn btn-primary btn-lg">
              Explore Live Feed
            </Link>
            {isAuthenticated ? (
              <Link to="/add" className="btn btn-secondary btn-lg">
                + Launch Product
              </Link>
            ) : (
              <button onClick={handleQuickDemo} className="btn btn-outline btn-lg demo-hero-btn">
                Instant Demo Access
              </button>
            )}
          </div>

          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-value">500+</span>
              <span className="stat-label">Products Featured</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-value">12.4k</span>
              <span className="stat-label">Upvotes Cast</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-value">100%</span>
              <span className="stat-label">Open Source Friendly</span>
            </div>
          </div>
        </div>
      </section>

      {/* Sliding Showcase Carousel */}
      <section className="showcase-section">
        <div className="container showcase-header">
          <span className="badge">Featured Showcase</span>
          <h2>Top Ranked Products This Week</h2>
        </div>
        <ShowcaseCarousel />
      </section>

      {/* Feature Scroll Reveals */}
      <section className="features-section">
        <div className="container">
          <ScrollReveal>
            <div className="section-title-wrapper">
              <span className="badge">Core Pillars</span>
              <h2>Engineered for Developers and Builders</h2>
              <p>Everything you need to showcase your project and reach early users cleanly.</p>
            </div>
          </ScrollReveal>

          <div className="features-grid">
            <ScrollReveal delay={100}>
              <div className="feature-card card">
                <div className="feature-icon-wrapper">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                  </svg>
                </div>
                <h3>Unbiased Community Upvoting</h3>
                <p>No pay-to-win mechanics or mysterious algorithms. Products rise strictly based on community votes and real user interest.</p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <div className="feature-card card">
                <div className="feature-icon-wrapper">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M15 22v-4a4 4 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
                    <path d="M9 18c-4.51 2-5-2-7-2"/>
                  </svg>
                </div>
                <h3>First-Class GitHub Integration</h3>
                <p>Direct links to repository source code, release tags, and technical specs so developers can inspect implementation quality.</p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={300}>
              <div className="feature-card card">
                <div className="feature-icon-wrapper">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                  </svg>
                </div>
                <h3>Constructive Peer Reviews</h3>
                <p>Gather structured ratings and critical engineering feedback from fellow builders who understand your tech stack.</p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="cta-banner-section">
        <div className="container">
          <ScrollReveal>
            <div className="cta-banner-card card">
              <h2>Ready to <span className="text-orange">Launch Your Next Project?</span></h2>
              <p>Join thousands of software creators showing their work to early adopters today.</p>
              <div className="cta-buttons">
                {isAuthenticated ? (
                  <>
                    <Link to="/add" className="btn btn-primary btn-lg">
                      + Launch Product
                    </Link>
                    <Link to="/profile" className="btn btn-secondary btn-lg">
                      Go to Profile
                    </Link>
                  </>
                ) : (
                  <>
                    <Link to="/signup" className="btn btn-primary btn-lg">
                      Create Free Account
                    </Link>
                    <Link to="/feed" className="btn btn-secondary btn-lg">
                      Browse Feed
                    </Link>
                  </>
                )}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};
