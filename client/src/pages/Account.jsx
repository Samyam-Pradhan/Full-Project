import React from "react";
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { IoArrowBackCircle } from "react-icons/io5";
import "../assets/Account.css";
import user from "../images/user.png";
const Account = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleBack = () => {
    navigate('/dashboard'); // Navigate to the dashboard route
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
              <img src={user} alt="Profile" className="profile-pic" />
            </div>
            <div className="info-text">
              <h2>John Doe</h2>
              <p>Email: johndoe@example.com</p>
              <p>Role: User</p>
            </div>
          </div>

          <div className="account-actions">
            <button className="btn">Change Password</button>
            <button className="btn danger" onClick={handleBack}><IoArrowBackCircle />Back</button> 
          </div>
        </div>
      </div>
      <div className="activity-history">
          <h3>Recent Activity</h3>
          <ul>
            <li>Last Login: Jan 28, 2025 - 3:00 PM</li>
            <li>Password Change: Jan 20, 2025</li>
          </ul>
        </div>
    </div>
  );
};

export default Account;