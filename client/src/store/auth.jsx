import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Initially set the token from localStorage
  const [token, setToken] = useState(localStorage.getItem("token"));

  const storeTokenInLS = (serverToken) => {
    localStorage.setItem("token", serverToken); // Save token in localStorage
    setToken(serverToken); // Update the state
  };

  const LogoutUser = () => {
    // Clear token from localStorage and state
    localStorage.removeItem("token");
    setToken(null); // Or you can use "" to reset it to empty string
  };

  // isLoggedIn will be true if there's a valid token, false otherwise
  let isLoggedIn = !!token;

  console.log("isLoggedIn", isLoggedIn);

  return (
    <AuthContext.Provider value={{ isLoggedIn, storeTokenInLS, LogoutUser }}>
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
