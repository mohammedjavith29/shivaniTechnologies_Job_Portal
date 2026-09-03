import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import candidateApi from "../api/candidateApi";

function CandidateLogin() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (e) => {

        e.preventDefault();

        try {

            // Call Spring Boot login API
            const token = await candidateApi.login(
                email,
                password
            );

            console.log("JWT Token:", token);

            // Save JWT token
            localStorage.setItem(
                "candidateToken",
                token
            );

            // Save candidate email
            localStorage.setItem(
                "candidateEmail",
                email
            );

            alert("Candidate login successful!");

            // Go to dashboard
            navigate("/candidate/dashboard");

        } catch (error) {

            console.error("Login error:", error);

            const message =
                error.response?.data ||
                "Invalid email or password";

            alert(message);
        }
    };

    return (
        <div>

            <h2>Candidate Login</h2>

            <form onSubmit={handleLogin}>

                <div>
                    <label>Email</label>

                    <input
                        type="email"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                        placeholder="Enter email"
                        required
                    />
                </div>

                <br />

                <div>
                    <label>Password</label>

                    <input
                        type="password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                        placeholder="Enter password"
                        required
                    />
                </div>

                <br />

                <button type="submit">
                    Login
                </button>

            </form>

        </div>
    );
}

export default CandidateLogin;