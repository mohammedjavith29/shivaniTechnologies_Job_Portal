import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./CandidateDashboard.css";

function CandidateDashboard() {
    const navigate = useNavigate();

    const candidateEmail =
        localStorage.getItem("candidateEmail") || "Candidate";

    const handleLogout = () => {
        localStorage.removeItem("candidateLoggedIn");
        localStorage.removeItem("candidateEmail");

        navigate("/candidate/login", { replace: true });
    };

    return (
        <div className="candidate-dashboard">

            {/* ================= SIDEBAR ================= */}
            <aside className="candidate-sidebar">

                <div className="candidate-sidebar-brand">
                    <div className="candidate-sidebar-logo">
                        ST
                    </div>

                    <div>
                        <h3>Shivani</h3>
                        <span>Job Portal</span>
                    </div>
                </div>

                <nav className="candidate-navigation">

                    <Link
                        to="/candidate"
                        className="candidate-nav-item active"
                    >
                        <i className="bi bi-grid"></i>
                        <span>Dashboard</span>
                    </Link>

                    <Link
                        to="/candidate/jobs"
                        className="candidate-nav-item"
                    >
                        <i className="bi bi-briefcase"></i>
                        <span>Find Jobs</span>
                    </Link>

                    <Link
                        to="/candidate/applications"
                        className="candidate-nav-item"
                    >
                        <i className="bi bi-file-earmark-text"></i>
                        <span>My Applications</span>
                    </Link>

                    <Link
                        to="/candidate/interviews"
                        className="candidate-nav-item"
                    >
                        <i className="bi bi-calendar-event"></i>
                        <span>Interviews</span>
                    </Link>

                    <Link
                        to="/candidate/resume"
                        className="candidate-nav-item"
                    >
                        <i className="bi bi-file-earmark-person"></i>
                        <span>My Resume</span>
                    </Link>

                    <Link
                        to="/candidate/profile"
                        className="candidate-nav-item"
                    >
                        <i className="bi bi-person"></i>
                        <span>My Profile</span>
                    </Link>

                </nav>

                <div className="candidate-sidebar-bottom">

                    <button
                        type="button"
                        className="candidate-logout"
                        onClick={handleLogout}
                    >
                        <i className="bi bi-box-arrow-right"></i>
                        <span>Logout</span>
                    </button>

                </div>

            </aside>


            {/* ================= MAIN CONTENT ================= */}
            <main className="candidate-main">

                {/* HEADER */}
                <header className="candidate-topbar">

                    <div>
                        <h1>Candidate Dashboard</h1>

                        <p>
                            Welcome back! Here's what's happening with your job search.
                        </p>
                    </div>


                    <div className="candidate-profile">

                        <div className="candidate-avatar">
                            {candidateEmail.charAt(0).toUpperCase()}
                        </div>

                        <div className="candidate-profile-info">
                            <strong>Candidate</strong>
                            <span>{candidateEmail}</span>
                        </div>

                    </div>

                </header>


                {/* ================= STATISTICS ================= */}
                <section className="candidate-stat-grid">

                    <div className="candidate-stat-card">

                        <div className="candidate-stat-icon blue">
                            <i className="bi bi-file-earmark-text"></i>
                        </div>

                        <div>
                            <span>Total Applications</span>
                            <strong>0</strong>
                        </div>

                    </div>


                    <div className="candidate-stat-card">

                        <div className="candidate-stat-icon orange">
                            <i className="bi bi-clock-history"></i>
                        </div>

                        <div>
                            <span>Pending Applications</span>
                            <strong>0</strong>
                        </div>

                    </div>


                    <div className="candidate-stat-card">

                        <div className="candidate-stat-icon green">
                            <i className="bi bi-calendar-check"></i>
                        </div>

                        <div>
                            <span>Interviews</span>
                            <strong>0</strong>
                        </div>

                    </div>


                    <div className="candidate-stat-card">

                        <div className="candidate-stat-icon purple">
                            <i className="bi bi-heart"></i>
                        </div>

                        <div>
                            <span>Saved Jobs</span>
                            <strong>0</strong>
                        </div>

                    </div>

                </section>


                {/* ================= CONTENT ================= */}
                <section className="candidate-content-grid">

                    {/* QUICK ACTIONS */}
                    <div className="candidate-panel">

                        <div className="candidate-panel-header">
                            <div>
                                <h2>Quick Actions</h2>
                                <p>Manage your job search</p>
                            </div>
                        </div>


                        <div className="candidate-actions">

                            <Link
                                to="/candidate/jobs"
                                className="candidate-action-card"
                            >
                                <div className="candidate-action-icon">
                                    <i className="bi bi-search"></i>
                                </div>

                                <div>
                                    <strong>Find Jobs</strong>
                                    <span>Explore available jobs</span>
                                </div>

                                <i className="bi bi-chevron-right"></i>
                            </Link>


                            <Link
                                to="/candidate/applications"
                                className="candidate-action-card"
                            >
                                <div className="candidate-action-icon">
                                    <i className="bi bi-file-earmark-text"></i>
                                </div>

                                <div>
                                    <strong>My Applications</strong>
                                    <span>Track your applications</span>
                                </div>

                                <i className="bi bi-chevron-right"></i>
                            </Link>


                            <Link
                                to="/candidate/resume"
                                className="candidate-action-card"
                            >
                                <div className="candidate-action-icon">
                                    <i className="bi bi-file-earmark-person"></i>
                                </div>

                                <div>
                                    <strong>My Resume</strong>
                                    <span>Upload and manage your resume</span>
                                </div>

                                <i className="bi bi-chevron-right"></i>
                            </Link>


                            <Link
                                to="/candidate/profile"
                                className="candidate-action-card"
                            >
                                <div className="candidate-action-icon">
                                    <i className="bi bi-person"></i>
                                </div>

                                <div>
                                    <strong>Update Profile</strong>
                                    <span>Keep your profile updated</span>
                                </div>

                                <i className="bi bi-chevron-right"></i>
                            </Link>

                        </div>

                    </div>


                    {/* PROFILE */}
                    <div className="candidate-panel">

                        <div className="candidate-panel-header">

                            <div>
                                <h2>Profile</h2>
                                <p>Complete your candidate profile</p>
                            </div>

                        </div>


                        <div className="candidate-profile-progress">

                            <div className="candidate-progress-circle">
                                <span>60%</span>
                            </div>


                            <div className="candidate-progress-info">

                                <strong>
                                    Profile 60% complete
                                </strong>

                                <p>
                                    Complete your profile to increase your
                                    chances of getting noticed.
                                </p>

                                <Link to="/candidate/profile">
                                    Complete Profile
                                    <i className="bi bi-arrow-right"></i>
                                </Link>

                            </div>

                        </div>

                    </div>

                </section>


                {/* ================= RECENT ACTIVITY ================= */}
                <section className="candidate-panel candidate-recent-panel">

                    <div className="candidate-panel-header">

                        <div>
                            <h2>Recent Activity</h2>
                            <p>Your latest job activity</p>
                        </div>

                        <Link to="/candidate/applications">
                            View All
                        </Link>

                    </div>


                    <div className="candidate-empty-state">

                        <div className="candidate-empty-icon">
                            <i className="bi bi-inbox"></i>
                        </div>

                        <h3>No recent activity</h3>

                        <p>
                            Start applying for jobs to see your activity here.
                        </p>

                        <Link
                            to="/candidate/jobs"
                            className="candidate-primary-button"
                        >
                            Browse Jobs
                            <i className="bi bi-arrow-right"></i>
                        </Link>

                    </div>

                </section>

            </main>

        </div>
    );
}

export default CandidateDashboard;