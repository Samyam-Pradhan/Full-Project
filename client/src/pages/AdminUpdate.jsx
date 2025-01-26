import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../store/auth";

const AdminUpdate = () => {
  const [data, setData] = useState({
    username: "",
    email: "",
  });
  const params = useParams();
  console.log("single data params", params);
 const { token, isLoggedIn, LogoutUser } = useAuth();

  // Fetch single user data
  const getSingleUserData = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/users/${params.id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();
      console.log("User single data:", result);

      setData({
        username: result.username || "",
        email: result.email || "",
      });
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  // Update state on input change
  const handleInput = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Submit updated data
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api/admin/users/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log("User updated successfully");
        // Optionally redirect or show a success message
      } else {
        console.error("Failed to update user");
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  useEffect(() => {
    getSingleUserData();
  }, [isLoggedIn, token]); // Fetch data on mount

  return (
    <section className="section-contact">
      <div className="contact-content container">
        <h1 className="main-heading">Update Users</h1>
      </div>

      <div className="container grid grid-two-cols">
        <section className="section-form">
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                id="username"
                autoComplete="off"
                value={data.username}
                onChange={handleInput}
                required
              />
            </div>

            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                autoComplete="off"
                value={data.email}
                onChange={handleInput}
                required
              />
            </div>
            <div>
              <button type="submit">Update</button>
            </div>
          </form>
        </section>
      </div>
    </section>
  );
};

export default AdminUpdate;
