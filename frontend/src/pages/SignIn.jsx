import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./auth.css";
import axios from 'axios';

export default function SignupForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateForm = () => {
    const newErrors = {};

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
        const response = await axios.post('http://localhost:3001/login', {
          email: formData.email,
          password: formData.password
        }, { withCredentials: true });

        if (response.data.Status === "Success") {
          // alert("Sign in successful!");
          navigate("/home"); // ini buat page slth Sign In
        } else {
          alert(response.data.Error || "Sign in failed :(\nAccount does not exist or incorrect password!");
        }
      } catch (error) {
        alert("Sign in failed :(\nAccount does not exist or incorrect password!");
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
          <h1 className="form-title">Welcome Back!</h1>
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

          {/* Submit Button */}
          <button
            type="button"
            onClick={handleSubmit}
            className="submit-button"
          >
            Sign In
          </button>

          <p className="login-link">
            Don't have an account?{" "}
            <button
              type="button"
              className="login-button"
              onClick={() => navigate("/sign-up")}
            >
              Sign Up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
