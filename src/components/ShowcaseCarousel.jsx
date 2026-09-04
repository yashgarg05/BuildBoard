import React from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import './ShowcaseCarousel.css';

export const ShowcaseCarousel = () => {
  const { products } = useProducts();

  // Pick featured top products or duplicate for continuous smooth scrolling marquee
  const featured = products.slice(0, 5);
  const displayItems = [...featured, ...featured];

  return (
    <div className="showcase-slider">
      <div className="showcase-track">
        {displayItems.map((prod, idx) => (
          <Link
            to={`/product/${prod._id}`}
            key={`${prod._id}-${idx}`}
            className="showcase-card"
          >
            <div className="showcase-overlay"></div>
            <div className="showcase-card-content">
              <div className="showcase-card-header">
                <span className="badge badge-dark">{prod.category}</span>
                <span className="showcase-votes">
                  <svg className="showcase-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="18 15 12 9 6 15"/>
                  </svg>
                  {prod.upvotes.length}
                </span>
              </div>
              <h4 className="showcase-title">{prod.title}</h4>
              <p className="showcase-tagline">{prod.tagline}</p>
              <div className="showcase-author">
                <img src={prod.author.avatarUrl} alt={prod.author.name} className="showcase-avatar" />
                <span>{prod.author.name}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
