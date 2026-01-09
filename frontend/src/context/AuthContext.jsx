import { createContext, useContext, useState, useEffect } from 'react';
import { getAdmin, clearAuth, isAuthenticated } from '../utils/auth';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on mount
    if (isAuthenticated()) {
      setAdmin(getAdmin());
    }
    setLoading(false);
  }, []);

  const login = (adminData) => {
    setAdmin(adminData);
  };

  const logout = () => {
    clearAuth();
    setAdmin(null);
  };

  const value = {
    admin,
    login,
    logout,
    isAuthenticated: !!admin,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
