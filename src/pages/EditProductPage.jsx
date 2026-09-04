import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useProducts } from '../context/ProductContext';
import { ProductCard } from '../components/ProductCard';
import './SubmitProductPage.css';

const CATEGORIES = ["Developer Tools", "AI & Data", "Productivity", "Design Tools"];

export const EditProductPage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const { getProductById, updateProduct } = useProducts();
  const navigate = useNavigate();

  const product = getProductById(id);

  // Authorization Guard: Check if product exists and current user is the author
  useEffect(() => {
    if (!product) {
      navigate('/feed', { replace: true });
      return;
    }
    if (user && product.author?._id !== user._id) {
      navigate('/feed', { replace: true });
    }
  }, [product, user, navigate]);

  // Pre-filled form state
  const [title, setTitle] = useState(product?.title || '');
  const [tagline, setTagline] = useState(product?.tagline || '');
  const [description, setDescription] = useState(product?.description || '');
  const [category, setCategory] = useState(product?.category || 'Developer Tools');
  const [githubUrl, setGithubUrl] = useState(product?.githubUrl || '');
  const [websiteUrl, setWebsiteUrl] = useState(product?.websiteUrl || '');
  const [error, setError] = useState('');

  // Sync state if product changes or finishes loading
  useEffect(() => {
    if (product) {
      setTitle(product.title || '');
      setTagline(product.tagline || '');
      setDescription(product.description || '');
      setCategory(product.category || 'Developer Tools');
      setGithubUrl(product.githubUrl || '');
      setWebsiteUrl(product.websiteUrl || '');
    }
  }, [product]);

  if (!product || (user && product.author?._id !== user._id)) {
    return null;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !tagline.trim() || !description.trim()) {
      setError('Please provide a product title, tagline, and full description.');
      return;
    }

    updateProduct(id, {
      title,
      tagline,
      description,
      category,
      githubUrl,
      websiteUrl
    });

    // Redirect user back to profile
    navigate('/profile');
  };

  // Live Card Preview
  const previewProduct = {
    ...product,
    title: title.trim() || product.title,
    tagline: tagline.trim() || product.tagline,
    description: description.trim() || product.description,
    category: category,
    githubUrl: githubUrl.trim(),
    websiteUrl: websiteUrl.trim()
  };

  return (
    <div className="submit-page container">
      <div className="submit-page-header">
        <div className="edit-header-row">
          <Link to="/profile" className="back-link">
            ← Back to Profile
          </Link>
          <span className="badge badge-peach">Edit Product</span>
        </div>
        <h1>Edit {product.title}</h1>
        <p>Update your project details and links on BuildBoard.</p>
      </div>

      <div className="submit-content-grid">
        {/* Left Column: Edit Form */}
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
              <button type="submit" className="btn btn-secondary btn-lg btn-full">
                Save Changes & Update Product
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
              Real-time preview of your edited listing as it will appear in the main feed.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
