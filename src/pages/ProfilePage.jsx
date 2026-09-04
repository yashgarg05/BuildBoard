import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useProducts } from '../context/ProductContext';
import { ProductCard } from '../components/ProductCard';
import './ProfilePage.css';

export const ProfilePage = () => {
  const { user } = useAuth();
  const { products } = useProducts();
  const [activeTab, setActiveTab] = useState('launches'); // 'launches', 'upvoted', 'reviews'

  if (!user) return null;

  // Filter products launched by current user
  const myLaunches = products.filter((p) => p.author?._id === user._id);

  // Filter products upvoted by current user
  const upvotedProducts = products.filter((p) => p.upvotes?.includes(user._id));

  // Collect all reviews written by current user across all products
  const myReviews = products.reduce((acc, product) => {
    const userReviews = (product.reviews || [])
      .filter((r) => r.userId === user._id)
      .map((r) => ({ ...r, productTitle: product.title, productId: product._id }));
    return [...acc, ...userReviews];
  }, []);

  // Total upvotes received on user's launched products
  const totalUpvotesReceived = myLaunches.reduce(
    (acc, p) => acc + (p.upvotes?.length || 0),
    0
  );

  const formattedDate = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString('en-US', {
        month: 'short',
        year: 'numeric'
      })
    : 'Recently';

  return (
    <div className="profile-page container">
      {/* Header Profile Hero Card */}
      <div className="profile-card card">
        <div className="profile-header-content">
          <div className="profile-avatar-wrapper">
            <img src={user.avatarUrl} alt={user.name} className="profile-avatar-img" />
          </div>

          <div className="profile-details">
            <div className="profile-name-row">
              <h1 className="profile-name">{user.name}</h1>
              <span className="badge badge-peach">Creator</span>
            </div>

            <p className="profile-handle">@{user.username || 'creator'}</p>
            
            {user.bio && <p className="profile-bio">{user.bio}</p>}

            <div className="profile-meta-tags">
              <span className="meta-tag">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                Joined {formattedDate}
              </span>
              <span className="meta-tag">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                {user.email}
              </span>
            </div>
          </div>

          <div className="profile-actions">
            <Link to="/add" className="btn btn-secondary btn-sm">
              + Launch Product
            </Link>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="profile-stats-grid">
          <div className="profile-stat-box">
            <span className="stat-num">{myLaunches.length}</span>
            <span className="stat-lbl">Products Launched</span>
          </div>

          <div className="profile-stat-box">
            <span className="stat-num">{totalUpvotesReceived}</span>
            <span className="stat-lbl">Upvotes Received</span>
          </div>

          <div className="profile-stat-box">
            <span className="stat-num">{upvotedProducts.length}</span>
            <span className="stat-lbl">Upvotes Cast</span>
          </div>

          <div className="profile-stat-box">
            <span className="stat-num">{myReviews.length}</span>
            <span className="stat-lbl">Reviews Left</span>
          </div>
        </div>
      </div>

      {/* Tabs Control */}
      <div className="profile-tabs-wrapper">
        <div className="profile-tabs">
          <button
            className={`profile-tab ${activeTab === 'launches' ? 'active' : ''}`}
            onClick={() => setActiveTab('launches')}
          >
            My Products ({myLaunches.length})
          </button>
          <button
            className={`profile-tab ${activeTab === 'upvoted' ? 'active' : ''}`}
            onClick={() => setActiveTab('upvoted')}
          >
            Upvoted ({upvotedProducts.length})
          </button>
          <button
            className={`profile-tab ${activeTab === 'reviews' ? 'active' : ''}`}
            onClick={() => setActiveTab('reviews')}
          >
            My Reviews ({myReviews.length})
          </button>
        </div>
      </div>

      {/* Tab Content Display */}
      <div className="profile-tab-content">
        {activeTab === 'launches' && (
          <div className="tab-section">
            {myLaunches.length > 0 ? (
              <div className="profile-products-list">
                {myLaunches.map((product) => (
                  <div key={product._id} className="profile-product-wrapper">
                    <ProductCard product={product} />
                    <div className="product-item-actions">
                      <Link to={`/edit/${product._id}`} className="btn-edit-pill">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="edit-icon">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                        </svg>
                        Edit Product
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="profile-empty-card card">
                <h3>No Products Launched Yet</h3>
                <p>Ready to share your project with early adopters and software creators?</p>
                <Link to="/add" className="btn btn-secondary btn-md">
                  + Launch Your First Product
                </Link>
              </div>
            )}
          </div>
        )}

        {activeTab === 'upvoted' && (
          <div className="tab-section">
            {upvotedProducts.length > 0 ? (
              <div className="profile-products-list">
                {upvotedProducts.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            ) : (
              <div className="profile-empty-card card">
                <h3>No Upvoted Products</h3>
                <p>Explore the live feed and upvote innovative developer tools!</p>
                <Link to="/feed" className="btn btn-primary btn-md">
                  Explore Live Feed
                </Link>
              </div>
            )}
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="tab-section">
            {myReviews.length > 0 ? (
              <div className="profile-reviews-list">
                {myReviews.map((review) => (
                  <div key={review._id} className="user-review-card card">
                    <div className="user-review-header">
                      <Link to={`/product/${review.productId}`} className="review-product-link">
                        {review.productTitle}
                      </Link>
                      <div className="review-rating-stars">
                        {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                      </div>
                    </div>
                    <p className="review-comment">{review.comment}</p>
                    <span className="review-date">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="profile-empty-card card">
                <h3>No Reviews Left</h3>
                <p>Visit product pages to share your technical feedback and ratings.</p>
                <Link to="/feed" className="btn btn-primary btn-md">
                  Browse Feed
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
