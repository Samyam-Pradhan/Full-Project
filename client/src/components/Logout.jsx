import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../store/auth";

export const Logout = () => {
    const { LogoutUser } = useAuth();
    
    useEffect(() => {
        // Perform the logout
        LogoutUser();
    }, [LogoutUser]);

    // Redirect to the homepage ("/") after logout
    return <Navigate to="/" />;
};
export default Logout;