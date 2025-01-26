import React, { useState, useEffect } from 'react';
import { useAuth } from '../store/auth';
import { useNavigate } from 'react-router-dom';
import "../assets/AdminUsers.css";
import { Link } from 'react-router-dom';

const AdminUsers = () => {
    const { token, isLoggedIn, LogoutUser } = useAuth();
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const getAllUsersData = async () => {
        if (!isLoggedIn) {
            navigate('/login');
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/api/admin/users", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            if (response.status === 401) {
                LogoutUser();
                navigate('/login');
                return;
            }

            if (!response.ok) {
                throw new Error('Failed to fetch users');
            }

            const data = await response.json();
            setUsers(data);
            setError(null);
        } catch (error) {
            console.error(error);
            setError('Unable to retrieve users');
        }
    };

    //delete the user on clicking delete button
    const deleteUser = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/admin/users/delete/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            const data = await response.json();
            console.log(`users after DELETE: ${data}`);

            if (response.ok) {
                getAllUsersData();
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllUsersData();
    }, [isLoggedIn, token]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <section className='admin-users-section'>
            <div className='container'>
                <h1>Admin User</h1>
            </div>
            <div className='container admin-user'>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length === 0 ? (
                            <tr>
                                <td colSpan="5">No users found</td>
                            </tr>
                        ) : (
                            users.map((curUser, index) => (
                                <tr key={curUser._id || index}>
                                    <td>{curUser.username}</td>
                                    <td>{curUser.email}</td>
                                    <td>
                                        <Link to={`/admin/users/${curUser._id}/edit`}>Edit</Link>
                                    </td>
                                    <td>
                                        <button onClick={() => deleteUser(curUser._id)}>Delete</button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default AdminUsers;
