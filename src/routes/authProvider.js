import React, { createContext, useContext, useState, useEffect } from 'react';

// Create an authentication context
const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

// AuthProvider component
export function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Check for an access token in local storage
        const token = localStorage.getItem('accessToken');
        setIsAuthenticated(!!token);
    }, []);

    // Function to update authentication status
    function setAuthStatus(authStatus) {
        setIsAuthenticated(authStatus);
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, setAuthStatus }}>
            {children}
        </AuthContext.Provider>
    );
}
