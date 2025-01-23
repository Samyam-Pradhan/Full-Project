import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "../assets/SignUp.css";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    try {
      await axios.post("http://localhost:5000/signup", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      alert("Signup successful! Redirecting to login...");
      navigate("/login");
    } catch (error) {
      console.error("Signup failed:", error);
      alert("Signup failed. Please try again.");
    }
  };

  return (
    <div className="sign-up-page">
      <div className="form-container">
        <h2 className="header">Create an Account</h2>
        <form onSubmit={handleSubmit}>
          {/* Full Name */}
          <div className="input-container">
            <label htmlFor="name" className="label">Full Name</label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className="input"
              placeholder="Enter your full name"
            />
          </div>

          {/* Email Address */}
          <div className="input-container">
            <label htmlFor="email" className="label">Email Address</label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="input"
              placeholder="Enter your email"
            />
          </div>

          {/* Password */}
          <div className="input-container">
            <label htmlFor="password" className="label">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={formData.password}
              onChange={handleChange}
              className="input"
              placeholder="Create a password"
            />
          </div>

          {/* Confirm Password */}
          <div className="input-container">
            <label htmlFor="confirmPassword" className="label">Confirm Password</label>
            <input
              type={showPassword ? "text" : "password"}
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="input"
              placeholder="Confirm your password"
            />
          </div>

          {/* Show Password Checkbox */}
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

          {/* Submit Button */}
          <button type="submit" className="submit-button">
            Sign Up
          </button>
        </form>

        {/* Link to Login Page */}
        <div className="sign-up-link">
          <Link to="/login" className="link">
            Already have an account? Log in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
