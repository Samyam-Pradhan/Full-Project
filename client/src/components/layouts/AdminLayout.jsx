import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { FaUser } from 'react-icons/fa6';
import { FaHome } from 'react-icons/fa';
import { MdDashboard } from "react-icons/md";
import '../../assets/AdminLayout.css';  

const AdminLayout = () => {
  return (
    <>
      <header className="admin-header">
        <div className="container">
          <nav className="admin-nav">
            <ul>
            <li>
                <NavLink to="/dashboard" className="nav-link">
                <MdDashboard /> Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink to="/admin/users" className="nav-link">
                  <FaUser /> Users
                </NavLink>
              </li>
              <li>
                <NavLink to="/" className="nav-link">
                  <FaHome /> Home
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <main>
        <div className="admin-container">
          <Outlet />
        </div>
      </main>
    </>
  );
};

export default AdminLayout;
