import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { useAuth } from '../context/AuthContext';
import { UpvoteButton } from '../components/UpvoteButton';
import './ProductDetailPage.css';

export const ProductDetailPage = () => {
  const { id } = useParams();
  const { getProductById, addReview } = useProducts();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const product = getProductById(id);

  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(5);
  const [reviewError, setReviewError] = useState('');

  if (!product) {
    return (
      <div className="container not-found-container">
        <h2>Product Not Found</h2>
        <p>The product you are looking for does not exist or has been removed.</p>
        <Link to="/feed" className="btn btn-primary">
          Back to Feed
        </Link>
      </div>
    );
  }

  const {
    _id,
    title,
    tagline,
    description,
    category,
    githubUrl,
    websiteUrl,
    author,
    upvotes = [],
    reviews = [],
    isBestOfWeek,
    badgeText,
    createdAt
  } = product;

  // Calculate average rating
  const avgRating =
    reviews.length > 0
      ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
      : null;

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (!comment.trim()) {
      setReviewError('Please write a brief review comment.');
      return;
    }

    addReview(_id, { comment, rating }, user);
    setComment('');
    setRating(5);
    setReviewError('');
  };

  const firstLetter = title ? title.charAt(0).toUpperCase() : 'P';
  const formattedDate = new Date(createdAt).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="product-detail-page container">
      {/* Back Link Navigation */}
      <Link to="/feed" className="back-link">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="19" y1="12" x2="5" y2="12"/>
          <polyline points="12 19 5 12 12 5"/>
        </svg>
        Back to Feed
      </Link>

      {/* Main Product Header Card */}
      <div className="detail-header-card card">
        <div className="detail-header-main">
          <div className="detail-icon-large">
            <span>{firstLetter}</span>
          </div>

          <div className="detail-header-info">
            <div className="detail-badges">
              <span className="badge">{category}</span>
              {isBestOfWeek && (
                <span className="badge badge-dark">
                  {badgeText || "Best of Week Winner"}
                </span>
              )}
            </div>

            <h1 className="detail-title">{title}</h1>
            <p className="detail-tagline">{tagline}</p>

            <div className="detail-author-row">
              <img src={author?.avatarUrl} alt={author?.name} className="author-avatar-lg" />
              <span>Created by <strong>{author?.name}</strong> (@{author?.username})</span>
              <span className="bullet-separator">•</span>
              <span className="date-text">Launched {formattedDate}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons: Upvote & External Links */}
        <div className="detail-header-actions">
          <UpvoteButton productId={_id} upvotes={upvotes} size="large" />

          <div className="external-links-group">
            {websiteUrl && (
              <a href={websiteUrl} target="_blank" rel="noreferrer" className="btn btn-primary">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                  <polyline points="15 3 21 3 21 9"/>
                  <line x1="10" y1="14" x2="21" y2="3"/>
                </svg>
                Visit Website
              </a>
            )}

            {githubUrl && (
              <a href={githubUrl} target="_blank" rel="noreferrer" className="btn btn-secondary">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                  <path d="M15 22v-4a4 4 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
                  <path d="M9 18c-4.51 2-5-2-7-2"/>
                </svg>
                GitHub Repo
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Grid Layout: Description & Reviews */}
      <div className="detail-content-grid">
        {/* Left Column: Full Description & Specs */}
        <div className="detail-main-column">
          <section className="detail-section card">
            <h3>About {title}</h3>
            <p className="detail-description">{description}</p>
          </section>

          {/* User Reviews Section */}
          <section className="detail-section card">
            <div className="reviews-header">
              <div>
                <h3>Community Reviews & Ratings</h3>
                <p>Peer feedback and engineering scores from verified users.</p>
              </div>
              {avgRating && (
                <div className="avg-rating-badge">
                  <span className="avg-val">{avgRating}</span>
                  <span className="max-val">/ 5</span>
                </div>
              )}
            </div>

            {/* Add Review Form */}
            <div className="add-review-box">
              <h4>Leave a Review</h4>
              {!isAuthenticated ? (
                <p className="login-prompt">
                  Please <Link to="/login">Sign in</Link> to leave a rating and comment.
                </p>
              ) : (
                <form onSubmit={handleReviewSubmit} className="review-form">
                  {reviewError && <div className="form-error">{reviewError}</div>}
                  <div className="form-group">
                    <label className="form-label">Rating Score</label>
                    <div className="rating-selector">
                      {[5, 4, 3, 2, 1].map((star) => (
                        <button
                          type="button"
                          key={star}
                          className={`star-select-btn ${rating === star ? 'selected' : ''}`}
                          onClick={() => setRating(star)}
                        >
                          {star} Star{star > 1 ? 's' : ''}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Your Review</label>
                    <textarea
                      className="form-textarea"
                      placeholder="Share your experience, feature highlights, or constructive feedback..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      rows={3}
                      required
                    />
                  </div>

                  <button type="submit" className="btn btn-primary btn-sm">
                    Submit Review
                  </button>
                </form>
              )}
            </div>

            {/* Reviews List */}
            <div className="reviews-list">
              {reviews.length > 0 ? (
                reviews.map((rev) => (
                  <div key={rev._id} className="review-item">
                    <div className="review-item-header">
                      <div className="reviewer-info">
                        <img src={rev.userAvatar} alt={rev.userName} className="reviewer-avatar" />
                        <span className="reviewer-name">{rev.userName}</span>
                      </div>
                      <div className="review-stars">
                        {'★'.repeat(rev.rating)}{'☆'.repeat(5 - rev.rating)}
                      </div>
                    </div>
                    <p className="review-comment">{rev.comment}</p>
                    <span className="review-date">
                      {new Date(rev.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                ))
              ) : (
                <p className="no-reviews-text">No reviews yet. Be the first to share your feedback!</p>
              )}
            </div>
          </section>
        </div>

        {/* Right Column: Metadata Sidebar */}
        <div className="detail-sidebar-column">
          <div className="sidebar-card card">
            <h4>Product Information</h4>
            <div className="sidebar-info-row">
              <span className="info-label">Category</span>
              <span className="info-value">{category}</span>
            </div>
            <div className="sidebar-info-row">
              <span className="info-label">Upvotes</span>
              <span className="info-value">{upvotes.length} Votes</span>
            </div>
            <div className="sidebar-info-row">
              <span className="info-label">Author</span>
              <span className="info-value">{author?.name}</span>
            </div>
            <div className="sidebar-info-row">
              <span className="info-label">Status</span>
              <span className="info-value badge badge-success">Live & Active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
