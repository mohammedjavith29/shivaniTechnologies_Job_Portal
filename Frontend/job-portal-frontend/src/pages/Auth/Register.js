import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";

function Register() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        mobile: "",
        password: "",
        role: "CANDIDATE",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.username.trim()) {
            alert("Please enter your username.");
            return;
        }

        if (!formData.email.trim()) {
            alert("Please enter your email.");
            return;
        }

        if (!formData.mobile.trim()) {
            alert("Please enter your mobile number.");
            return;
        }

        if (!formData.password.trim()) {
            alert("Please enter your password.");
            return;
        }

        setLoading(true);

        try {
            // Backend API integration can be added here.
            // Example:
            /*
            const response = await fetch(
                "http://localhost:8080/api/auth/register",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                }
            );

            if (!response.ok) {
                throw new Error("Registration failed");
            }
            */

            setTimeout(() => {
                alert("Registration successful!");

                navigate("/");
            }, 700);

        } catch (error) {
            console.error(error);
            alert("Registration failed. Please try again.");
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 700);
        }
    };

    return (
        <div className="register-page">

            {/* LEFT BRAND SECTION */}
            <div className="register-left">

                <div className="register-brand">

                    <div className="register-logo">
                        ST
                    </div>

                    <div>
                        <h2>Shivani Technologies</h2>

                        <p>
                            JOB PORTAL MANAGEMENT SYSTEM
                        </p>
                    </div>

                </div>


                <div className="register-left-content">

                    <span className="register-tag">
                        JOIN OUR PLATFORM
                    </span>

                    <h1>
                        Build your future.
                        <br />
                        Find your opportunity.
                    </h1>

                    <p className="register-description">
                        Create your account and connect with
                        opportunities, companies, and talented
                        professionals.
                    </p>


                    <div className="register-benefits">

                        <div className="register-benefit">

                            <div className="benefit-icon">
                                <i className="bi bi-briefcase"></i>
                            </div>

                            <div>
                                <h3>Find Opportunities</h3>

                                <p>
                                    Discover jobs that match your skills.
                                </p>
                            </div>

                        </div>


                        <div className="register-benefit">

                            <div className="benefit-icon">
                                <i className="bi bi-people"></i>
                            </div>

                            <div>
                                <h3>Connect With Companies</h3>

                                <p>
                                    Build your professional network.
                                </p>
                            </div>

                        </div>


                        <div className="register-benefit">

                            <div className="benefit-icon">
                                <i className="bi bi-graph-up-arrow"></i>
                            </div>

                            <div>
                                <h3>Grow Your Career</h3>

                                <p>
                                    Take the next step in your career.
                                </p>
                            </div>

                        </div>

                    </div>

                </div>


                <div className="register-left-footer">
                    © 2026 Shivani Technologies
                </div>

            </div>


            {/* RIGHT REGISTER SECTION */}
            <div className="register-right">

                <div className="register-card">

                    <div className="register-card-header">

                        <h1>Create your account</h1>

                        <p>
                            Join Shivani Technologies and start your journey.
                        </p>

                    </div>


                    <form onSubmit={handleSubmit}>

                        {/* USERNAME */}

                        <div className="register-form-group">

                            <label htmlFor="username">
                                Username
                            </label>

                            <div className="register-input-wrapper">

                                <i className="bi bi-person"></i>

                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    placeholder="Enter your username"
                                    value={formData.username}
                                    onChange={handleChange}
                                />

                            </div>

                        </div>


                        {/* EMAIL */}

                        <div className="register-form-group">

                            <label htmlFor="email">
                                Email Address
                            </label>

                            <div className="register-input-wrapper">

                                <i className="bi bi-envelope"></i>

                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="Enter your email address"
                                    value={formData.email}
                                    onChange={handleChange}
                                />

                            </div>

                        </div>


                        {/* MOBILE */}

                        <div className="register-form-group">

                            <label htmlFor="mobile">
                                Mobile Number
                            </label>

                            <div className="register-input-wrapper">

                                <i className="bi bi-phone"></i>

                                <input
                                    type="tel"
                                    id="mobile"
                                    name="mobile"
                                    placeholder="Enter your mobile number"
                                    value={formData.mobile}
                                    onChange={handleChange}
                                />

                            </div>

                        </div>


                        {/* PASSWORD */}

                        <div className="register-form-group">

                            <label htmlFor="password">
                                Password
                            </label>

                            <div className="register-input-wrapper">

                                <i className="bi bi-lock"></i>

                                <input
                                    type={
                                        showPassword
                                            ? "text"
                                            : "password"
                                    }
                                    id="password"
                                    name="password"
                                    placeholder="Create a password"
                                    value={formData.password}
                                    onChange={handleChange}
                                />

                                <button
                                    type="button"
                                    className="register-password-toggle"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                >
                                    <i
                                        className={
                                            showPassword
                                                ? "bi bi-eye-slash"
                                                : "bi bi-eye"
                                        }
                                    ></i>
                                </button>

                            </div>

                        </div>


                        {/* ROLE */}

                        <div className="register-form-group">

                            <label htmlFor="role">
                                Account Type
                            </label>

                            <div className="register-select-wrapper">

                                <i className="bi bi-person-badge"></i>

                                <select
                                    id="role"
                                    name="role"
                                    value={formData.role}
                                    onChange={handleChange}
                                >

                                    <option value="CANDIDATE">
                                        Candidate
                                    </option>

                                    <option value="EMPLOYER">
                                        Employer
                                    </option>

                                    <option value="EMPLOYEE">
                                        Employee
                                    </option>

                                </select>

                            </div>

                        </div>


                        <button
                            type="submit"
                            className="register-submit"
                            disabled={loading}
                        >

                            {loading ? (
                                <>
                                    <span className="register-spinner"></span>
                                    Creating account...
                                </>
                            ) : (
                                <>
                                    Create Account
                                    <i className="bi bi-arrow-right"></i>
                                </>
                            )}

                        </button>

                    </form>


                    <div className="register-login">

                        <span>
                            Already have an account?
                        </span>

                        <Link to="/">
                            Sign In
                        </Link>

                    </div>

                </div>


                <div className="register-footer">

                    <span>
                        © 2026 Shivani Technologies
                    </span>

                    <span className="register-footer-dot">
                        •
                    </span>

                    <span>
                        Job Portal Management System
                    </span>

                </div>

            </div>

        </div>
    );
}

export default Register;