import React, { useState } from "react";
import "../assets/Sidebar.css";
import { MdDashboard, MdAccountCircle } from "react-icons/md";
import { FcAbout } from "react-icons/fc";
import { IoIosHelpCircle } from "react-icons/io";
import { TbReportSearch, TbLogout } from "react-icons/tb";
import { useAuth } from "../store/auth"; // Import AuthContext
import { useNavigate, Link } from "react-router-dom"; // Import Link

const Sidebar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { LogoutUser } = useAuth();
  const navigate = useNavigate();

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle("dark-mode", !isDarkMode);
  };

  const handleLogout = () => {
    LogoutUser();
    navigate("/");
  };

  return (
    <div className="sidebar">
      <div className="logo">Welcome</div>
      <ul className="menu">
        <li style={{ display: "flex", alignItems: "center" }}>
          <MdDashboard style={{ marginRight: "8px" }} />
          Dashboard
        </li>
        <li style={{ display: "flex", alignItems: "center" }}>
          <MdAccountCircle style={{ marginRight: "8px" }} />
          <Link to ="/account" style={{textDecoration: "none", color: "inherit"}}>Account</Link>
        </li>
        <li style={{ display: "flex", alignItems: "center" }}>
          <FcAbout style={{ marginRight: "8px" }} />
          About
        </li>
        <li style={{ display: "flex", alignItems: "center" }}>
          <IoIosHelpCircle style={{ marginRight: "8px" }} />
          Help
        </li>
        
        <li style={{ display: "flex", alignItems: "center" }}>
          <TbReportSearch style={{ marginRight: "8px" }} />
          <Link to="/report" style={{ textDecoration: "none", color: "inherit" }}>Reports</Link>
        </li>
        <hr />
        <li
          style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
          onClick={handleLogout}
        >
          <TbLogout style={{ marginRight: "8px" }} />
          Logout
        </li>
        <li className="dark-mode-toggle">
          <span>Dark Mode</span>
          <div
            className={`toggle-switch ${isDarkMode ? "active" : ""}`}
            onClick={toggleDarkMode}
          >
            <div className="switch-handle"></div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
