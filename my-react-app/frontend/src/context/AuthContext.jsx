import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(false); // Changed to false for now
  
  const signup = async (email, password, userData) => {
    console.log('Signup called - Firebase not configured yet');
    alert('Firebase configuration needed for signup');
  };

  const login = async (email, password) => {
    console.log('Login called - Firebase not configured yet');
    alert('Firebase configuration needed for login');
  };

  const logout = async () => {
    console.log('Logout called');
    setCurrentUser(null);
    setUserRole(null);
  };

  const getToken = async () => {
    return null;
  };

  const value = {
    currentUser,
    userRole,
    signup,
    login,
    logout,
    getToken
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
