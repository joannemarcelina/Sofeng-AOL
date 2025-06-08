import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./auth.css";
import axios from 'axios';

export default function SignupForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        const response = await axios.post('http://localhost:3001/register', {
          name: formData.name,
          email: formData.email,
          password: formData.password
        }, { withCredentials: true });

        if (response.data.Status === "Success") {
          alert("Account created successfully!");
          navigate("/sign-in");
        } else {
          alert(response.data.Error || "Registration failed :(\nAccount Already Registered!");
        }
      } catch (err) {
        alert("Registration failed :(\nAccount Already Registered!");
      }
    }
  };


  return (
    <div className="signup-container">
      <div className="signup-card">
        {/* Logo */}
        <div className="logo-section">
          <div className="logo-wrapper">
            <div className="logo-icon">
              <div className="logo-inner"></div>
            </div>
          </div>
          <h2 className="logo-text">Skill Bridge</h2>
        </div>

        {/* Form */}
        <div className="form-container">
          <h1 className="form-title">Join Now</h1>

          {/* Name Field */}
          <div className="input-group">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleInputChange}
              className={`form-input ${errors.name ? "error" : ""}`}
            />
            {errors.name && <p className="error-message">{errors.name}</p>}
          </div>

          {/* Email Field */}
          <div className="input-group">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              className={`form-input ${errors.email ? "error" : ""}`}
            />
            {errors.email && <p className="error-message">{errors.email}</p>}
          </div>

          {/* Password Field */}
          <div className="input-group">
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                className={`form-input password-input ${
                  errors.password ? "error" : ""
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="password-toggle"
              >
                <span
                  className={`eye-icon ${showPassword ? "eye-off" : "eye-on"}`}
                ></span>
              </button>
            </div>
            {errors.password && (
              <p className="error-message">{errors.password}</p>
            )}
          </div>

          {/* Confirm Password Field */}
          <div className="input-group">
            <div className="password-wrapper">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className={`form-input password-input ${
                  errors.confirmPassword ? "error" : ""
                }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="password-toggle"
              >
                <span
                  className={`eye-icon ${
                    showConfirmPassword ? "eye-off" : "eye-on"
                  }`}
                ></span>
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="error-message">{errors.confirmPassword}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="button"
            onClick={handleSubmit}
            className="submit-button"
          >
            Sign Up
          </button>

          {/* Login Link */}
          <p className="login-link">
            Already have an account?{" "}
            <button
              type="button"
              className="login-button"
              onClick={() => navigate("/sign-in")}
            >
              Sign In
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
