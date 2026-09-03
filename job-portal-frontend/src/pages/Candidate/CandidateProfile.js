import React from "react";
import { useNavigate } from "react-router-dom";
import "./CandidateProfile.css";

function CandidateProfile() {
    const navigate = useNavigate();

    const candidateEmail =
        localStorage.getItem("candidateEmail") || "Candidate";

    return (
        <div className="candidate-profile-page">

            <div className="candidate-profile-header">

                <div>
                    <button
                        type="button"
                        onClick={() => navigate("/candidate")}
                    >
                        ← Back to Dashboard
                    </button>

                    <h1>My Profile</h1>

                    <p>
                        Manage and update your candidate profile.
                    </p>
                </div>

            </div>


            <div className="candidate-profile-card">

                <div className="profile-avatar-large">
                    {candidateEmail.charAt(0).toUpperCase()}
                </div>


                <div className="profile-details">

                    <h2>Candidate</h2>

                    <p>{candidateEmail}</p>

                </div>

            </div>


            <div className="candidate-profile-card">

                <h2>Profile Information</h2>


                <div className="profile-form">

                    <div className="profile-form-group">
                        <label>Full Name</label>

                        <input
                            type="text"
                            placeholder="Enter your full name"
                        />
                    </div>


                    <div className="profile-form-group">
                        <label>Email Address</label>

                        <input
                            type="email"
                            value={candidateEmail}
                            readOnly
                        />
                    </div>


                    <div className="profile-form-group">
                        <label>Phone Number</label>

                        <input
                            type="text"
                            placeholder="Enter your phone number"
                        />
                    </div>


                    <div className="profile-form-group">
                        <label>Location</label>

                        <input
                            type="text"
                            placeholder="Enter your location"
                        />
                    </div>


                    <div className="profile-form-group">
                        <label>Skills</label>

                        <input
                            type="text"
                            placeholder="Example: Java, Spring Boot, React"
                        />
                    </div>


                    <button
                        type="button"
                        className="save-profile-button"
                        onClick={() => alert("Profile saved successfully!")}
                    >
                        Save Profile
                    </button>

                </div>

            </div>

        </div>
    );
}

export default CandidateProfile;
