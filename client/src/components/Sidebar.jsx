import React, { useState } from "react";
import "../assets/Sidebar.css";
import { MdDashboard } from "react-icons/md";
import { MdAccountCircle } from "react-icons/md";
import { FcAbout } from "react-icons/fc";
import { IoIosHelpCircle } from "react-icons/io";
import { TbReportSearch } from "react-icons/tb";
import { TbLogout } from "react-icons/tb";

const Sidebar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle("dark-mode", !isDarkMode);
  };

  return (
    <div className="sidebar">
      <div className="logo">Your Logo</div>
      <ul className="menu">
      <li style={{ display: "flex", alignItems: "center" }}>
        <MdDashboard style={{ marginRight: "8px" }} />
            Dashboard
        </li>
        <li style={{ display: "flex", alignItems: "center" }}>
        <MdAccountCircle style={{ marginRight: "8px" }} />
            Account
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
            Reports
        </li>
        <hr />
        <li style={{ display: "flex", alignItems: "center" }}>
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
