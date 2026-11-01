/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

const AUTH_STORAGE_KEY = 'buildboard_demo_user';

export function getAuthErrorMessage(error) {
  return error?.message || 'Authentication failed. Please try again.';
}

export const AuthProvider = ({ children }) => {
  // Demo user object – persisted locally on this device without passwords or secrets.
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem(AUTH_STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(AUTH_STORAGE_KEY);
      }
    } catch (e) {
      console.error('Failed to sync auth user to localStorage', e);
    }
  }, [user]);

  const signIn = async (email) => {
    const trimmed = (email || '').trim() || 'member@example.com';
    const appUser = { email: trimmed, emailVerified: true };
    setUser(appUser);
    return appUser;
  };

  const signUp = async (email) => {
    const trimmed = (email || '').trim() || 'member@example.com';
    const appUser = { email: trimmed, emailVerified: true };
    setUser(appUser);
    return appUser;
  };

  const signOut = () => {
    setUser(null);
  };

  const resetPassword = () => Promise.resolve();

  return (
    <AuthContext.Provider value={{ user, signIn, signUp, signOut, resetPassword, loading: false }}>
      {children}
    </AuthContext.Provider>
  );
};
