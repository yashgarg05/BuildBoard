import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { ProductCard } from '../components/ProductCard';
import { UpvoteButton } from '../components/UpvoteButton';
import './FeedPage.css';

const CATEGORIES = ["All", "Developer Tools", "AI & Data", "Productivity", "Design Tools"];

export const FeedPage = () => {
  const { products } = useProducts();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('upvotes'); // 'upvotes', 'newest', 'best'

  // Best of the Week products list
  const bestOfWeekProducts = useMemo(() => {
    return products.filter((p) => p.isBestOfWeek);
  }, [products]);

  // Filtered and Sorted products
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        const matchesCategory =
          selectedCategory === 'All' || p.category === selectedCategory;
        const matchesSearch =
          p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.tagline.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.description.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'upvotes') {
          return b.upvotes.length - a.upvotes.length;
        } else if (sortBy === 'newest') {
          return new Date(b.createdAt) - new Date(a.createdAt);
        } else if (sortBy === 'best') {
          return (b.isBestOfWeek ? 1 : 0) - (a.isBestOfWeek ? 1 : 0);
        }
        return 0;
      });
  }, [products, selectedCategory, searchTerm, sortBy]);

  return (
    <div className="feed-page container">
      {/* Page Header */}
      <div className="feed-header">
        <div className="feed-header-text">
          <h1>Product Discovery Feed</h1>
          <p>Discover top developer tools, SaaS applications, and community creations.</p>
        </div>
      </div>

      {/* Best of the Week Leaderboard Hall of Fame */}
      {bestOfWeekProducts.length > 0 && selectedCategory === 'All' && !searchTerm && (
        <section className="best-of-week-section">
          <div className="winner-podium-container">
            <div className="winner-section-header">
              <span className="badge badge-peach winner-badge">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="trophy-icon">
                  <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
                  <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                  <path d="M4 22h16" />
                  <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
                  <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
                  <path d="M18 2H6v7a6 6 0 0 0 12 0V2z" />
                </svg>
                Weekly Hall of Fame
              </span>
              <h2>Best of the Week <span className="text-orange">Winners</span></h2>
              <p>Top-rated software creations voted by developers & early adopters.</p>
            </div>

            <div className="winner-cards-grid">
              {bestOfWeekProducts.map((product, idx) => {
                const rankLabels = ["🏆 #1 Product of Week", "🥈 #2 Runner Up", "🥉 #3 Winner"];
                const rankBadges = ["rank-gold", "rank-silver", "rank-bronze"];
                const firstInitial = product.title.charAt(0).toUpperCase();

                return (
                  <div key={`winner-${product._id}`} className={`winner-card ${rankBadges[idx] || ''}`}>
                    <div className="winner-card-top">
                      <span className="winner-rank-badge">
                        {rankLabels[idx] || `🏆 #${idx + 1} Winner`}
                      </span>
                      <span className="badge badge-dark">{product.category}</span>
                    </div>

                    <div className="winner-card-body">
                      <div className="winner-icon-box">
                        {firstInitial}
                      </div>
                      <div className="winner-info">
                        <Link to={`/product/${product._id}`} className="winner-title">
                          {product.title}
                        </Link>
                        <p className="winner-tagline">{product.tagline}</p>
                      </div>
                    </div>

                    <div className="winner-card-footer">
                      <div className="winner-author-info">
                        <img src={product.author.avatarUrl} alt={product.author.name} className="author-avatar" />
                        <span>by {product.author.name}</span>
                      </div>

                      <div className="winner-actions">
                        <UpvoteButton productId={product._id} upvotes={product.upvotes} size="default" />
                        <Link to={`/product/${product._id}`} className="btn btn-primary btn-sm winner-view-btn">
                          View →
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Controls Bar: Search, Category Tabs, Sort */}
      <div className="feed-controls">
        <div className="search-box">
          <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/>
            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            type="text"
            className="search-input"
            placeholder="Search products by title, tech stack, or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button onClick={() => setSearchTerm('')} className="search-clear">
              &times;
            </button>
          )}
        </div>

        <div className="controls-row">
          <div className="category-tabs">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`tab-btn ${selectedCategory === cat ? 'active' : ''}`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="sort-selector">
            <label className="sort-label">Sort by:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="form-select sort-select"
            >
              <option value="upvotes">Most Upvoted</option>
              <option value="newest">Newest First</option>
              <option value="best">Best of Week</option>
            </select>
          </div>
        </div>
      </div>

      {/* Feed List */}
      <div className="product-feed-list">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          <div className="empty-feed-card card">
            <h3>No products found</h3>
            <p>Try searching for a different keyword or select another category filter.</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
              }}
              className="btn btn-secondary btn-sm"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
