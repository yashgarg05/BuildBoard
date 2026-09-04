import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_PRODUCTS } from '../data/mockData';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState(() => {
    try {
      const stored = localStorage.getItem('buildboard_products');
      return stored ? JSON.parse(stored) : INITIAL_PRODUCTS;
    } catch (err) {
      console.error('Failed to load products from storage:', err);
      return INITIAL_PRODUCTS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('buildboard_products', JSON.stringify(products));
    } catch (err) {
      console.error('Failed to persist products:', err);
    }
  }, [products]);

  const toggleUpvote = (productId, userId) => {
    if (!userId) return false;

    setProducts((prevProducts) =>
      prevProducts.map((product) => {
        if (product._id === productId) {
          const hasVoted = product.upvotes.includes(userId);
          const updatedUpvotes = hasVoted
            ? product.upvotes.filter((id) => id !== userId)
            : [...product.upvotes, userId];

          return { ...product, upvotes: updatedUpvotes };
        }
        return product;
      })
    );
    return true;
  };

  const addProduct = (newProductData, currentUser) => {
    const newProduct = {
      _id: `prod_${Date.now()}`,
      title: newProductData.title.trim(),
      tagline: newProductData.tagline.trim(),
      description: newProductData.description.trim(),
      category: newProductData.category || "Developer Tools",
      githubUrl: newProductData.githubUrl.trim(),
      websiteUrl: newProductData.websiteUrl.trim(),
      author: {
        _id: currentUser._id,
        name: currentUser.name,
        username: currentUser.username,
        avatarUrl: currentUser.avatarUrl
      },
      upvotes: [currentUser._id], // Initial upvote by author
      isBestOfWeek: false,
      badgeText: null,
      reviews: [],
      createdAt: new Date().toISOString()
    };

    setProducts((prev) => [newProduct, ...prev]);
    return newProduct;
  };

  const addReview = (productId, reviewData, currentUser) => {
    const newReview = {
      _id: `rev_${Date.now()}`,
      userId: currentUser._id,
      userName: currentUser.name,
      userAvatar: currentUser.avatarUrl,
      comment: reviewData.comment.trim(),
      rating: Number(reviewData.rating) || 5,
      createdAt: new Date().toISOString()
    };

    setProducts((prevProducts) =>
      prevProducts.map((p) => {
        if (p._id === productId) {
          return {
            ...p,
            reviews: [newReview, ...p.reviews]
          };
        }
        return p;
      })
    );
  };

  const updateProduct = (productId, updatedData) => {
    setProducts((prevProducts) =>
      prevProducts.map((p) => {
        if (p._id === productId) {
          return {
            ...p,
            title: updatedData.title.trim(),
            tagline: updatedData.tagline.trim(),
            description: updatedData.description.trim(),
            category: updatedData.category || p.category,
            githubUrl: updatedData.githubUrl ? updatedData.githubUrl.trim() : '',
            websiteUrl: updatedData.websiteUrl ? updatedData.websiteUrl.trim() : ''
          };
        }
        return p;
      })
    );
  };

  const getProductById = (id) => {
    return products.find((p) => p._id === id);
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        toggleUpvote,
        addProduct,
        updateProduct,
        addReview,
        getProductById
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);
