import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useProducts } from '../context/ProductContext';
import './UpvoteButton.css';

export const UpvoteButton = ({ productId, upvotes = [], size = 'default' }) => {
  const { user, isAuthenticated } = useAuth();
  const { toggleUpvote } = useProducts();
  const navigate = useNavigate();

  const isVoted = user && upvotes.includes(user._id);
  const upvoteCount = upvotes.length;

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    toggleUpvote(productId, user._id);
  };

  return (
    <button
      onClick={handleClick}
      className={`upvote-btn ${isVoted ? 'voted' : ''} size-${size}`}
      title={isVoted ? "Remove Upvote" : "Upvote Product"}
      aria-label="Upvote"
    >
      <svg className="upvote-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="18 15 12 9 6 15"/>
      </svg>
      <span className="upvote-count">{upvoteCount}</span>
    </button>
  );
};
