import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

const ProtectedRoute = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        const validateToken = async () => {
            try {
                const tokenToValidate = localStorage.getItem("authToken");

                if (!tokenToValidate) {
                    setIsAuthenticated(false);
                    return;
                }

                const res = await axios.post("http://localhost:8080/students/validate", {}, {
                    headers: {
                        'Authorization': `Bearer ${tokenToValidate}`
                    }
                });

                setIsAuthenticated(res.data === true);
            } catch (err) {
                console.error("Token validation error:", err);
                setIsAuthenticated(false);
            }
        };

        validateToken();
    }, []);

    if (isAuthenticated === null) {
        // Still checking authentication, you could add a loading spinner here
        return <div>Loading...</div>;
    }

    return isAuthenticated ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;