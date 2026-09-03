import React from "react";
import { useNavigate } from "react-router-dom";

function CandidateLogin() {
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        console.log("LOGIN BUTTON CLICKED");

        localStorage.setItem("candidateLoggedIn", "true");

        console.log("REDIRECTING TO /candidate");

        navigate("/candidate");
    };

    return (
        <div style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#f5f7fa"
        }}>

            <div style={{
                width: "400px",
                background: "#fff",
                padding: "40px",
                borderRadius: "12px",
                boxShadow: "0 10px 30px rgba(0,0,0,0.10)"
            }}>

                <h1 style={{
                    marginBottom: "10px",
                    color: "#172033"
                }}>
                    Candidate Login
                </h1>

                <p style={{
                    color: "#667085",
                    marginBottom: "30px"
                }}>
                    Sign in to your candidate account
                </p>

                <form onSubmit={handleLogin}>

                    <div style={{ marginBottom: "20px" }}>
                        <label>Email Address</label>

                        <input
                            type="email"
                            placeholder="Enter email"
                            defaultValue="test@gmail.com"
                            style={{
                                width: "100%",
                                height: "48px",
                                marginTop: "8px",
                                padding: "0 12px",
                                boxSizing: "border-box",
                                border: "1px solid #d0d5dd",
                                borderRadius: "6px"
                            }}
                        />
                    </div>

                    <div style={{ marginBottom: "25px" }}>
                        <label>Password</label>

                        <input
                            type="password"
                            placeholder="Enter password"
                            defaultValue="123456"
                            style={{
                                width: "100%",
                                height: "48px",
                                marginTop: "8px",
                                padding: "0 12px",
                                boxSizing: "border-box",
                                border: "1px solid #d0d5dd",
                                borderRadius: "6px"
                            }}
                        />
                    </div>

                    <button
                        type="submit"
                        style={{
                            width: "100%",
                            height: "50px",
                            border: "none",
                            borderRadius: "6px",
                            background: "#1677ff",
                            color: "#fff",
                            fontSize: "16px",
                            fontWeight: "600",
                            cursor: "pointer"
                        }}
                    >
                        Login →
                    </button>

                </form>

            </div>
        </div>
    );
}

export default CandidateLogin;