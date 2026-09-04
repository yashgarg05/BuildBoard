import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_USERS } from '../data/mockData';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load persisted authentication state from localStorage
    try {
      const storedUser = localStorage.getItem('buildboard_user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (err) {
      console.error('Failed to restore auth session:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const saveUserSession = (userObj) => {
    setUser(userObj);
    localStorage.setItem('buildboard_user', JSON.stringify(userObj));
  };

  const login = (email, password) => {
    // Find matching user or fallback to demo user authentication
    const foundUser = INITIAL_USERS.find(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );

    if (foundUser) {
      saveUserSession(foundUser);
      return { success: true, user: foundUser };
    }

    // Default mock user for arbitrary login credentials
    const newMockUser = {
      _id: `usr_${Date.now()}`,
      name: email.split('@')[0].replace('.', ' '),
      username: email.split('@')[0],
      email: email,
      avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
      bio: "Software creator exploring products on BuildBoard.",
      createdAt: new Date().toISOString()
    };

    saveUserSession(newMockUser);
    return { success: true, user: newMockUser };
  };

  const signup = (name, username, email, password) => {
    const newUser = {
      _id: `usr_${Date.now()}`,
      name: name.trim(),
      username: username.trim().toLowerCase(),
      email: email.trim().toLowerCase(),
      avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
      bio: "New creator on BuildBoard.",
      createdAt: new Date().toISOString()
    };

    saveUserSession(newUser);
    return { success: true, user: newUser };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('buildboard_user');
  };

  const demoLogin = () => {
    const demoUser = INITIAL_USERS[0]; // Alex Rivera
    saveUserSession(demoUser);
    return demoUser;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loading,
        login,
        signup,
        logout,
        demoLogin
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
