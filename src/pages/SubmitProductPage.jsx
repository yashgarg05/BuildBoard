import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useProducts } from '../context/ProductContext';
import { ProductCard } from '../components/ProductCard';
import './SubmitProductPage.css';

const CATEGORIES = ["Developer Tools", "AI & Data", "Productivity", "Design Tools"];

export const SubmitProductPage = () => {
  const { user } = useAuth();
  const { addProduct } = useProducts();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [tagline, setTagline] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Developer Tools');
  const [githubUrl, setGithubUrl] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !tagline.trim() || !description.trim()) {
      setError('Please provide a product title, tagline, and full description.');
      return;
    }

    const newProd = addProduct(
      {
        title,
        tagline,
        description,
        category,
        githubUrl,
        websiteUrl
      },
      user
    );

    // Redirect to the newly created product detail page or feed
    navigate(`/product/${newProd._id}`);
  };

  // Preview Object mirroring MongoDB product structure
  const previewProduct = {
    _id: "preview_id",
    title: title.trim() || "Your Product Title",
    tagline: tagline.trim() || "A punchy single-sentence description of your project.",
    description: description.trim() || "Full description of your project...",
    category: category,
    githubUrl: githubUrl.trim() || "https://github.com",
    websiteUrl: websiteUrl.trim() || "https://example.com",
    author: {
      _id: user?._id || "usr_preview",
      name: user?.name || "Your Name",
      username: user?.username || "username",
      avatarUrl: user?.avatarUrl || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80"
    },
    upvotes: [user?._id || "usr_preview"],
    isBestOfWeek: false,
    badgeText: null,
    reviews: [],
    createdAt: new Date().toISOString()
  };

  return (
    <div className="submit-page container">
      <div className="submit-page-header">
        <h1>Launch a Product</h1>
        <p>Launch your project to the BuildBoard developer community.</p>
      </div>

      <div className="submit-content-grid">
        {/* Left Column: Submission Form */}
        <div className="submit-form-card card">
          {error && <div className="form-error-banner">{error}</div>}

          <form onSubmit={handleSubmit} className="product-form">
            <div className="form-group">
              <label className="form-label" htmlFor="title">Product Name *</label>
              <input
                id="title"
                type="text"
                className="form-input"
                placeholder="e.g. DevPulse Analytics"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                maxLength={40}
                required
              />
              <span className="form-hint">Maximum 40 characters</span>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="tagline">Tagline *</label>
              <input
                id="tagline"
                type="text"
                className="form-input"
                placeholder="e.g. Real-time performance & error tracking with zero config"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                maxLength={90}
                required
              />
              <span className="form-hint">Short, punchy summary (Max 90 chars)</span>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="category">Category *</label>
              <select
                id="category"
                className="form-select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="description">Full Description *</label>
              <textarea
                id="description"
                className="form-textarea"
                placeholder="Explain what your product does, key technical architecture, problems it solves, and features..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={5}
                required
              />
            </div>

            <div className="form-row-2col">
              <div className="form-group">
                <label className="form-label" htmlFor="githubUrl">GitHub Repository URL</label>
                <input
                  id="githubUrl"
                  type="url"
                  className="form-input"
                  placeholder="https://github.com/org/repo"
                  value={githubUrl}
                  onChange={(e) => setGithubUrl(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="websiteUrl">Live Website URL</label>
                <input
                  id="websiteUrl"
                  type="url"
                  className="form-input"
                  placeholder="https://myproduct.com"
                  value={websiteUrl}
                  onChange={(e) => setWebsiteUrl(e.target.value)}
                />
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn btn-primary btn-lg btn-full">
                Publish Product to Feed
              </button>
            </div>
          </form>
        </div>

        {/* Right Column: Live Preview Box */}
        <div className="submit-preview-column">
          <div className="preview-sticky-wrapper">
            <span className="badge badge-dark preview-label">Live Feed Card Preview</span>
            <div className="preview-card-wrapper">
              <ProductCard product={previewProduct} />
            </div>
            <p className="preview-hint">
              This is how your product listing will appear in the main community discovery feed.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
