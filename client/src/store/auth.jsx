import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token") || "");
    const [user, setUser] = useState(null);
    
    const storeTokenInLS = (serverToken) => {
        localStorage.setItem("token", serverToken);
        setToken(serverToken);
    };
    
    const isLoggedIn = !!token;
    
    const LogoutUser = () => {
        setToken("");
        setUser(null);
        localStorage.removeItem('token');
    };

    const userAuthentication = async () => {
        try {
            if (!token) return;
            
            const response = await fetch("http://localhost:5000/api/admin/users", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            
            if (response.ok) {
                const data = await response.json();
                setUser(data.userData);
            }
        } catch (error) {
            console.error("Authentication error:", error);
            LogoutUser();
        }
    };

    useEffect(() => {
        userAuthentication();
    }, [token]);
    
    return( 
        <AuthContext.Provider value={{ 
            isLoggedIn, 
            storeTokenInLS, 
            LogoutUser, 
            user, 
            token 
        }}> 
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const authContextValue = useContext(AuthContext);
    if (!authContextValue) {
        throw new Error("useAuth used outside of the Provider");
    }
    return authContextValue;
};