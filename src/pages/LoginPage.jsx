import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import backgroundImage from "../images/facemask1.webp";
import "../assets/Login.css";  // Import your custom CSS file

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/login", formData, {
        withCredentials: true,
      });
      alert("Login successful!");
      navigate("/dashboard"); // Replace with your dashboard route
    } catch (error) {
      console.error("Login failed:", error);
      alert("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="login-page">
      {/* Left Section */}
      <div className="left-section"></div>

      {/* Right Section */}
      <div className="right-section">
        <div className="form-container">
          <h2>Welcome back!</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-container">
              <label htmlFor="email" className="label">Email address</label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="input"
                placeholder="Enter your email"
              />
            </div>
            <div className="input-container">
              <label htmlFor="password" className="label">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={formData.password}
                onChange={handleChange}
                className="input"
                placeholder="Enter your password"
              />
              <div className="show-password">
                <input
                  type="checkbox"
                  id="showPassword"
                  className="checkbox"
                  checked={showPassword}
                  onChange={() => setShowPassword((prev) => !prev)}
                />
                <label htmlFor="showPassword" className="show-password-label">
                  Show Password
                </label>
              </div>
            </div>
            <div className="forgot-password">
              <a href="#" className="forgot-password-link">
                Forgot password?
              </a>
            </div>
            <button type="submit" className="submit-button">
              Log In
            </button>
          </form>
          <div className="sign-up">
            <Link to="/signup" className="sign-up-link">
              Don't have an account? Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
