import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { ProductProvider } from './context/ProductContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ProtectedRoute } from './components/ProtectedRoute';
import { OpeningIntro } from './components/OpeningIntro';

import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { FeedPage } from './pages/FeedPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { SubmitProductPage } from './pages/SubmitProductPage';
import { ProfilePage } from './pages/ProfilePage';
import { SettingsPage } from './pages/SettingsPage';
import { EditProductPage } from './pages/EditProductPage';

export function App() {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <ThemeProvider>
      <AuthProvider>
        <ProductProvider>
          {showIntro && <OpeningIntro onFinish={() => setShowIntro(false)} />}
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
              <Route
                path="/settings"
                element={
                  <ProtectedRoute>
                    <SettingsPage />
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
    </ThemeProvider>
  );
}

export default App;
