```jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./ForgotPassword.css";

function ForgotPassword() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!email.trim()) {
            alert("Please enter your email address.");
            return;
        }

        setSubmitted(true);
    };

    return (
        <div className="forgot-page">

            {/* ================= TOP BAR ================= */}
            <header className="forgot-topbar">

                <div className="forgot-brand">

                    <div className="forgot-logo">
                        ST
                    </div>

                    <div>
                        <h2>Shivani Technologies</h2>
                        <span>Job Portal</span>
                    </div>

                </div>

                <Link
                    to="/login"
                    className="back-login"
                >
                    Back to Login
                </Link>

            </header>


            {/* ================= MAIN CONTENT ================= */}
            <main className="forgot-container">

                <div className="forgot-card">

                    {/* LOCK ICON */}
                    <div className="forgot-icon">
                        <i className="bi bi-lock"></i>
                    </div>


                    {/* ================= EMAIL FORM ================= */}
                    {!submitted && (
                        <>
                            <h1>
                                Forgot Password?
                            </h1>

                            <p className="forgot-description">
                                Enter your registered email address and
                                we'll help you reset your password.
                            </p>


                            <form onSubmit={handleSubmit}>

                                <div className="forgot-form-group">

                                    <label htmlFor="email">
                                        Email Address
                                    </label>

                                    <div className="forgot-input">

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


                                <button
                                    type="submit"
                                    className="forgot-submit"
                                >
                                    <span>
                                        Send Reset Link
                                    </span>

                                    <i className="bi bi-arrow-right"></i>
                                </button>

                            </form>


                            <div className="forgot-help">

                                <span>
                                    Remember your password?
                                </span>

                                <Link to="/login">
                                    Sign in
                                </Link>

                            </div>
                        </>
                    )}


                    {/* ================= SUCCESS ================= */}
                    {submitted && (
                        <div className="forgot-success">

                            <div className="success-icon">
                                <i className="bi bi-check-lg"></i>
                            </div>

                            <h1>
                                Check Your Email
                            </h1>

                            <p>
                                If an account exists for
                                <strong>
                                    {" "}{email}
                                </strong>
                                , password reset instructions have been sent.
                            </p>

                            <button
                                type="button"
                                className="forgot-submit"
                                onClick={() => navigate("/login")}
                            >
                                <span>
                                    Back to Login
                                </span>

                                <i className="bi bi-arrow-right"></i>
                            </button>

                        </div>
                    )}

                </div>

            </main>


            {/* ================= FOOTER ================= */}
            <footer className="forgot-footer">

                <span>
                    © 2026 Shivani Technologies
                </span>

                <span>
                    |
                </span>

                <span>
                    Job Portal Management System
                </span>

            </footer>

        </div>
    );
}

export default ForgotPassword;
```
