import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) =>{
    const [token , setToken] = useState(localStorage.getItem("token"));
    const storeTokenInLS = (serverToken) => {
        return localStorage.setItem("token", serverToken);
    };
    let isLoggedIn = !!token;
    console.log("isLoggedIn", isLoggedIn);
    
    
    return( 
    <AuthContext.Provider value={{ isLoggedIn, storeTokenInLS}}> 
        {children}
    </AuthContext.Provider>
    )
}

export const useAuth = () =>{
    const authContextValue = useContext(AuthContext);
    if(!authContextValue){
        throw new Error("useAuth used outside of the Provider");
    }
    return authContextValue;
}