import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './authProvider';

function AuthMiddleware({ children }) {
    const { isAuthenticated } = useAuth(); 

    return isAuthenticated ? children : <Navigate to="/login" />;
}

export default AuthMiddleware;
