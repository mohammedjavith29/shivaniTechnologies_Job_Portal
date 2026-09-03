import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CandidateResume.css";

function CandidateResume() {
    const navigate = useNavigate();

    const [resume, setResume] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            setResume(file);
        }
    };

    const handleUpload = () => {
        if (!resume) {
            alert("Please select a resume file first.");
            return;
        }

        alert("Resume uploaded successfully!");

        console.log("Selected Resume:", resume);
    };

    return (
        <div className="candidate-resume-page">

            {/* HEADER */}
            <div className="resume-header">

                <div>
                    <div className="resume-breadcrumb">

                        <button
                            type="button"
                            onClick={() => navigate("/candidate")}
                        >
                            Candidate Dashboard
                        </button>

                        <span>/</span>

                        <span>My Resume</span>

                    </div>

                    <h1>My Resume</h1>

                    <p>
                        Upload and manage your resume
                    </p>

                </div>


                <button
                    type="button"
                    className="resume-back-button"
                    onClick={() => navigate("/candidate")}
                >
                    <i className="bi bi-arrow-left"></i>
                    Dashboard
                </button>

            </div>


            {/* MAIN CARD */}
            <div className="resume-card">

                <div className="resume-card-header">

                    <div>
                        <h2>Resume</h2>

                        <p>
                            Keep your resume updated to improve your job opportunities.
                        </p>
                    </div>


                    <div className="resume-status">
                        <i className="bi bi-check-circle-fill"></i>
                        Candidate Profile
                    </div>

                </div>


                {/* UPLOAD AREA */}
                <div className="resume-upload-section">

                    <div className="resume-upload-icon">
                        <i className="bi bi-file-earmark-pdf"></i>
                    </div>


                    <h3>
                        Upload Your Resume
                    </h3>


                    <p>
                        Upload your latest resume in PDF, DOC or DOCX format.
                    </p>


                    <label
                        htmlFor="resumeFile"
                        className="choose-resume-button"
                    >
                        <i className="bi bi-upload"></i>
                        Choose Resume
                    </label>


                    <input
                        id="resumeFile"
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                        hidden
                    />


                    {resume && (
                        <div className="selected-resume">

                            <div className="selected-resume-icon">
                                <i className="bi bi-file-earmark-text"></i>
                            </div>


                            <div className="selected-resume-info">

                                <strong>
                                    {resume.name}
                                </strong>

                                <span>
                                    {(resume.size / 1024 / 1024).toFixed(2)} MB
                                </span>

                            </div>


                            <button
                                type="button"
                                onClick={() => setResume(null)}
                            >
                                <i className="bi bi-x"></i>
                            </button>

                        </div>
                    )}


                    {resume && (
                        <button
                            type="button"
                            className="upload-resume-button"
                            onClick={handleUpload}
                        >
                            <i className="bi bi-cloud-arrow-up"></i>
                            Upload Resume
                        </button>
                    )}

                </div>


                {/* RESUME INFORMATION */}
                <div className="resume-information">

                    <div className="information-title">

                        <i className="bi bi-info-circle"></i>


                        <div>

                            <h3>
                                Resume Guidelines
                            </h3>

                            <p>
                                Make sure your resume contains accurate and updated information.
                            </p>

                        </div>

                    </div>


                    <div className="guideline-grid">

                        <div className="guideline-item">
                            <i className="bi bi-check2"></i>
                            <span>Keep your resume updated</span>
                        </div>


                        <div className="guideline-item">
                            <i className="bi bi-check2"></i>
                            <span>Use a professional format</span>
                        </div>


                        <div className="guideline-item">
                            <i className="bi bi-check2"></i>
                            <span>Highlight your technical skills</span>
                        </div>


                        <div className="guideline-item">
                            <i className="bi bi-check2"></i>
                            <span>Check your contact information</span>
                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default CandidateResume;

