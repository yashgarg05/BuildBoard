import React from 'react';
import { Link } from 'react-router-dom';
import { UpvoteButton } from './UpvoteButton';
import './ProductCard.css';

export const ProductCard = ({ product }) => {
  if (!product) return null;

  const {
    _id,
    title,
    tagline,
    category,
    author,
    upvotes = [],
    reviews = [],
    isBestOfWeek,
    badgeText
  } = product;

  // Calculate average rating
  const avgRating =
    reviews.length > 0
      ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
      : null;

  // Initial avatar placeholder icon
  const firstLetter = title ? title.charAt(0).toUpperCase() : 'P';

  return (
    <div className="product-card card">
      <div className="product-card-body">
        <div className="product-card-icon">
          <span>{firstLetter}</span>
        </div>

        <div className="product-card-info">
          <div className="product-card-header">
            <Link to={`/product/${_id}`} className="product-title">
              {title}
            </Link>
            {isBestOfWeek && (
              <span className="badge badge-dark">
                {badgeText || "Best of Week"}
              </span>
            )}
            <span className="badge">{category}</span>
          </div>

          <p className="product-tagline">{tagline}</p>

          <div className="product-card-meta">
            <div className="author-info">
              <img
                src={author?.avatarUrl || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80"}
                alt={author?.name}
                className="author-avatar"
              />
              <span className="author-name">by {author?.name || 'Creator'}</span>
            </div>

            {reviews.length > 0 && (
              <div className="reviews-summary">
                <svg className="star-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                <span className="rating-val">{avgRating}</span>
                <span className="reviews-count">({reviews.length})</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="product-card-action">
        <UpvoteButton productId={_id} upvotes={upvotes} />
      </div>
    </div>
  );
};
