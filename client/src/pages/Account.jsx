import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { IoArrowBackCircle } from "react-icons/io5";
import "../assets/Account.css";
import userImg from "../images/user.png";

const Account = () => {
  const navigate = useNavigate();
  const { token, isLoggedIn, LogoutUser } = useAuth();
  const [user, setUser] = useState(null);

  // Fetch user data
  useEffect(() => {
    const fetchUser = async () => {
      if (!isLoggedIn) {
        navigate("/login");
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/api/user", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 401) {
          LogoutUser();
          navigate("/login");
          return;
        }

        const data = await response.json();
        if (response.ok) {
          setUser(data);
        } else {
          console.error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, [isLoggedIn, token, navigate, LogoutUser]);

  // Handle back button click
  const handleBack = () => {
    navigate("/dashboard");
  };

  // Handle password change button click
  const handleChangePassword = () => {
    navigate(`/users/${user?._id}/change-password`); // Redirect to change password page
  };

  return (
    <div className="account-page">
      <div className="account-container">
        <div className="account-header">
          <h1>My Account</h1>
        </div>
        <div className="account-content">
          <div className="account-info">
            <div className="profile-image-container">
              <img src={user?.profilePic || userImg} alt="Profile" className="profile-pic" />
            </div>
            <div className="info-text">
              <h2>{user?.username || "Guest"}</h2>
              <p>Email: {user?.email || "N/A"}</p>
              <p>Role: {user?.role || "User"}</p>
            </div>
          </div>

          <div className="account-actions">
            <button className="btn danger" onClick={handleBack}>
              <IoArrowBackCircle /> Back
            </button>
            {/* Add the "Change Password" button */}
            <button className="btn" onClick={handleChangePassword}>
              Change Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
