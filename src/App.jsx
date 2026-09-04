import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProductProvider } from './context/ProductContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ProtectedRoute } from './components/ProtectedRoute';

import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { FeedPage } from './pages/FeedPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { SubmitProductPage } from './pages/SubmitProductPage';
import { ProfilePage } from './pages/ProfilePage';
import { EditProductPage } from './pages/EditProductPage';

export function App() {
  return (
    <AuthProvider>
      <ProductProvider>
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/feed" element={<FeedPage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route
              path="/add"
              element={
                <ProtectedRoute>
                  <SubmitProductPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/edit/:id"
              element={
                <ProtectedRoute>
                  <EditProductPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
            {/* Catch-all redirect to home */}
            <Route path="*" element={<LandingPage />} />
          </Routes>
        </main>
        <Footer />
      </ProductProvider>
    </AuthProvider>
  );
}

export default App;
