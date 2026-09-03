import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!email.trim()) {
            alert("Please enter your email address.");
            return;
        }

        if (!password.trim()) {
            alert("Please enter your password.");
            return;
        }

        localStorage.setItem("userEmail", email);

        if (rememberMe) {
            localStorage.setItem("rememberMe", "true");
        } else {
            localStorage.removeItem("rememberMe");
        }

        navigate("/admin");
    };

    return (
        <div className="login-page">

            <div className="login-left">

                <div className="login-brand">
                    <div className="login-logo">
                        ST
                    </div>

                    <div>
                        <h2>Shivani Technologies</h2>
                        <span>
                            Job Portal Management System
                        </span>
                    </div>
                </div>

                <div className="login-left-content">

                    <h1>
                        Find the right talent.
                        <br />
                        Build the right future.
                    </h1>

                    <p>
                        Manage jobs, candidates, employers and
                        applications from one powerful platform.
                    </p>

                    <div className="login-features">

                        <div className="login-feature">
                            <i className="bi bi-briefcase"></i>

                            <div>
                                <strong>Manage Jobs</strong>
                                <span>
                                    Create and manage job opportunities.
                                </span>
                            </div>
                        </div>

                        <div className="login-feature">
                            <i className="bi bi-people"></i>

                            <div>
                                <strong>Find Candidates</strong>
                                <span>
                                    Connect with qualified candidates.
                                </span>
                            </div>
                        </div>

                        <div className="login-feature">
                            <i className="bi bi-building"></i>

                            <div>
                                <strong>Manage Companies</strong>
                                <span>
                                    Manage employers and company details.
                                </span>
                            </div>
                        </div>

                    </div>
                </div>

                <div className="login-left-footer">
                    © 2026 Shivani Technologies
                </div>

            </div>

            <div className="login-right">

                <div className="login-card">

                    <div className="login-card-header">

                        <div className="login-mobile-logo">
                            ST
                        </div>

                        <h1>Welcome Back</h1>

                        <p>
                            Sign in to your account to continue
                        </p>

                    </div>

                    <form onSubmit={handleSubmit}>

                        <div className="login-form-group">

                            <label htmlFor="email">
                                Email Address
                            </label>

                            <div className="login-input-wrapper">

                                <i className="bi bi-envelope"></i>

                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) =>
                                        setEmail(e.target.value)
                                    }
                                    placeholder="Enter your email address"
                                    autoComplete="email"
                                />

                            </div>

                        </div>

                        <div className="login-form-group">

                            <div className="login-label-row">

                                <label htmlFor="password">
                                    Password
                                </label>

                                <Link
                                    to="/forgot-password"
                                    className="forgot-password-link"
                                >
                                    Forgot Password?
                                </Link>

                            </div>

                            <div className="login-input-wrapper">

                                <i className="bi bi-lock"></i>

                                <input
                                    id="password"
                                    type={
                                        showPassword
                                            ? "text"
                                            : "password"
                                    }
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    placeholder="Enter your password"
                                    autoComplete="current-password"
                                />

                                <button
                                    type="button"
                                    className="password-toggle"
                                    onClick={() =>
                                        setShowPassword(
                                            !showPassword
                                        )
                                    }
                                    aria-label={
                                        showPassword
                                            ? "Hide password"
                                            : "Show password"
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

                        <div className="login-options">

                            <label className="remember-option">

                                <input
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={(e) =>
                                        setRememberMe(
                                            e.target.checked
                                        )
                                    }
                                />

                                <span>
                                    Remember me
                                </span>

                            </label>

                        </div>

                        <button
                            type="submit"
                            className="login-submit"
                        >
                            <span>Sign In</span>
                            <i className="bi bi-arrow-right"></i>
                        </button>

                    </form>

                    <div className="login-register">

                        <span>
                            Don't have an account?
                        </span>

                        <Link to="/register">
                            Create an account
                        </Link>

                    </div>

                </div>

                <div className="login-footer">

                    <span>
                        © 2026 Shivani Technologies
                    </span>

                    <span className="footer-divider">
                        |
                    </span>

                    <span>
                        Job Portal Management System
                    </span>

                </div>

            </div>

        </div>
    );
}

export default Login;