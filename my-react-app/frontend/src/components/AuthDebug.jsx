import React from 'react';
import { useAuth } from '../context/AuthContext';

const AuthDebug = () => {
  const { currentUser, userRole, loading } = useAuth();

  if (process.env.NODE_ENV === 'production') {
    return null; // Don't show in production
  }

  return (
    <div className="fixed bottom-4 right-4 bg-base-200 p-4 rounded-lg shadow-lg text-xs max-w-xs z-50">
      <h4 className="font-bold mb-2">Auth Debug</h4>
      <div>
        <strong>User:</strong> {currentUser ? currentUser.email : 'Not logged in'}
      </div>
      <div>
        <strong>Role:</strong> {userRole || 'None'}
      </div>
      <div>
        <strong>Loading:</strong> {loading ? 'Yes' : 'No'}
      </div>
      <div>
        <strong>UID:</strong> {currentUser?.uid || 'None'}
      </div>
    </div>
  );
};

export default AuthDebug;