import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token") || "");
    const [user, setUser] = useState(null);
    const [admin, setAdmin] = useState(false); // Track if the logged-in user is an admin

    // Store token in localStorage and update state
    const storeTokenInLS = (serverToken) => {
        localStorage.setItem("token", serverToken);
        setToken(serverToken);
    };

    const isLoggedIn = !!token;

    // Logout the user
    const LogoutUser = () => {
        setToken("");
        setUser(null);
        setAdmin(false); // Reset admin status on logout
        localStorage.removeItem('token');
    };

    // Fetch user data (for normal user)
    const userAuthentication = async () => {
        try {
            if (!token) return;

            const response = await fetch("http://localhost:5000/api/user", { // Get logged-in user data
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setUser(data); // Set user data
            } else {
                console.error("Failed to fetch user data");
                LogoutUser();
            }
        } catch (error) {
            console.error("Authentication error:", error);
            LogoutUser();
        }
    };

    // Fetch admin data (for admin users, such as fetching all users)
    const adminAuthentication = async () => {
        try {
            if (!token) return;

            const response = await fetch("http://localhost:5000/api/admin/users", { // Get all users for admin
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setUser(data.userData); // Set admin data (e.g., list of all users)
                setAdmin(true); // Mark the user as an admin
            } else {
                console.error("Failed to fetch admin data");
                LogoutUser();
            }
        } catch (error) {
            console.error("Authentication error:", error);
            LogoutUser();
        }
    };

    useEffect(() => {
        if (isLoggedIn) {
            // Choose which authentication to run based on role or API logic
            const checkIfAdmin = async () => {
                try {
                    const response = await fetch("http://localhost:5000/api/user", {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });

                    if (response.ok) {
                        const data = await response.json();
                        if (data.role === 'admin') {
                            adminAuthentication(); // Run admin authentication if user is admin
                        } else {
                            userAuthentication(); // Run user authentication if user is not admin
                        }
                    } else {
                        console.error("Failed to verify user role");
                        LogoutUser();
                    }
                } catch (error) {
                    console.error("Error checking role:", error);
                    LogoutUser();
                }
            };

            checkIfAdmin();
        }
    }, [token, isLoggedIn]);

    return (
        <AuthContext.Provider value={{
            isLoggedIn,
            storeTokenInLS,
            LogoutUser,
            user,
            token,
            admin // Provide admin status
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
