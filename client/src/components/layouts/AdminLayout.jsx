import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { FaUser } from "react-icons/fa6";
import { FaHome } from "react-icons/fa";
const AdminLayout = () => {
  return (
    <>
    <header>
        <div className='container'>
            <nav>
                <ul>
                    <li>
                        <NavLink to ="/admin/users"><FaUser />users</NavLink>
                    </li>
                    <li>
                        <NavLink to ="/">
                            <FaHome /> Home
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    </header>
    <Outlet />
    </>
  )
}

export default AdminLayout
