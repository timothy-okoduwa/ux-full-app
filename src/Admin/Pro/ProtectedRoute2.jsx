import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUserAuth } from '../../Students/components/context/UserAuthContext';
// ../context/UserAuthContext
const ProtectedRoute2 = ({ children }) => {
  const { user } = useUserAuth();

  // console.log('Check user in Private: ', user);
  if (!user) {
    return <Navigate to="/admin-signin" />;
  }
  return children;
};

export default ProtectedRoute2;
