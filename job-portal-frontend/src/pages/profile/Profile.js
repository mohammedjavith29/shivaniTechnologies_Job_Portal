import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Profile.css";

function Profile() {
    const [activeTab, setActiveTab] = useState("personal");

    const [profile, setProfile] = useState({
        firstName: "Shivani",
        lastName: "Candidate",
        email: "candidate@gmail.com",
        phone: "+91 9876543210",
        designation: "Software Developer",
        experience: "2 Years",
        location: "Hyderabad",
        gender: "Female",
        dateOfBirth: "",
        skills: "Java, React, Spring Boot",
        about:
            "Software professional looking for exciting career opportunities in technology and software development."
    });

    const handleChange = (e) => {
        setProfile({
            ...profile,
            [e.target.name]: e.target.value
        });
    };

    const handleSave = (e) => {
        e.preventDefault();

        localStorage.setItem(
            "candidateProfile",
            JSON.stringify(profile)
        );

        alert("Profile updated successfully!");
    };

    return (
        <div className="zoho-profile-page">

            {/* ================= TOP BAR ================= */}
            <header className="profile-topbar">

                <div className="profile-brand">
                    <div className="profile-logo">
                        ST
                    </div>

                    <div>
                        <h2>Shivani Technologies</h2>
                        <span>Job Portal</span>
                    </div>
                </div>

                <div className="profile-top-actions">

                    <button className="top-icon-btn">
                        <i className="bi bi-search"></i>
                    </button>

                    <button className="top-icon-btn">
                        <i className="bi bi-bell"></i>
                        <span className="notification-dot"></span>
                    </button>

                    <div className="top-user">
                        <div className="top-avatar">
                            SC
                        </div>

                        <div className="top-user-info">
                            <strong>Shivani Candidate</strong>
                            <span>Candidate</span>
                        </div>

                        <i className="bi bi-chevron-down"></i>
                    </div>

                </div>

            </header>


            {/* ================= MAIN ================= */}
            <div className="profile-layout">

                {/* ================= SIDEBAR ================= */}
                <aside className="profile-sidebar">

                    <div className="sidebar-heading">
                        PROFILE
                    </div>

                    <Link
                        to="/candidate"
                        className="profile-side-link"
                    >
                        <i className="bi bi-grid"></i>
                        <span>Dashboard</span>
                    </Link>

                    <Link
                        to="/candidate/jobs"
                        className="profile-side-link"
                    >
                        <i className="bi bi-search"></i>
                        <span>Find Jobs</span>
                    </Link>

                    <Link
                        to="/applications"
                        className="profile-side-link"
                    >
                        <i className="bi bi-file-earmark-text"></i>
                        <span>My Applications</span>
                    </Link>

                    <Link
                        to="/interviews"
                        className="profile-side-link"
                    >
                        <i className="bi bi-calendar-event"></i>
                        <span>Interviews</span>
                    </Link>

                    <Link
                        to="/candidate/resume"
                        className="profile-side-link"
                    >
                        <i className="bi bi-file-earmark-person"></i>
                        <span>My Resume</span>
                    </Link>

                    <div className="sidebar-divider"></div>

                    <Link
                        to="/profile"
                        className="profile-side-link active"
                    >
                        <i className="bi bi-person"></i>
                        <span>My Profile</span>
                    </Link>

                    <Link
                        to="/login"
                        className="profile-side-link logout-link"
                    >
                        <i className="bi bi-box-arrow-right"></i>
                        <span>Logout</span>
                    </Link>

                </aside>


                {/* ================= CONTENT ================= */}
                <main className="profile-content">

                    {/* PAGE HEADER */}
                    <div className="profile-page-header">

                        <div>
                            <div className="breadcrumb">
                                Candidate / Profile
                            </div>

                            <h1>My Profile</h1>

                            <p>
                                Manage your personal information and professional details.
                            </p>
                        </div>

                        <button
                            className="profile-save-top"
                            onClick={handleSave}
                        >
                            <i className="bi bi-check2"></i>
                            Save Changes
                        </button>

                    </div>


                    {/* PROFILE HEADER CARD */}
                    <section className="profile-header-card">

                        <div className="large-profile-avatar">
                            SC
                        </div>

                        <div className="profile-main-info">

                            <h2>
                                {profile.firstName} {profile.lastName}
                            </h2>

                            <p>
                                <i className="bi bi-briefcase"></i>
                                {profile.designation}
                            </p>

                            <p>
                                <i className="bi bi-geo-alt"></i>
                                {profile.location}
                            </p>

                        </div>

                        <div className="profile-status">

                            <span className="status-badge">
                                <span></span>
                                Profile Active
                            </span>

                            <p>
                                Profile completion
                            </p>

                            <div className="completion-row">

                                <div className="completion-bar">
                                    <div className="completion-progress"></div>
                                </div>

                                <strong>80%</strong>

                            </div>

                        </div>

                    </section>


                    {/* TABS */}
                    <div className="profile-tabs">

                        <button
                            className={
                                activeTab === "personal"
                                    ? "profile-tab active"
                                    : "profile-tab"
                            }
                            onClick={() => setActiveTab("personal")}
                        >
                            <i className="bi bi-person"></i>
                            Personal Information
                        </button>

                        <button
                            className={
                                activeTab === "professional"
                                    ? "profile-tab active"
                                    : "profile-tab"
                            }
                            onClick={() => setActiveTab("professional")}
                        >
                            <i className="bi bi-briefcase"></i>
                            Professional
                        </button>

                        <button
                            className={
                                activeTab === "about"
                                    ? "profile-tab active"
                                    : "profile-tab"
                            }
                            onClick={() => setActiveTab("about")}
                        >
                            <i className="bi bi-card-text"></i>
                            About
                        </button>

                    </div>


                    {/* FORM CARD */}
                    <section className="profile-form-card">

                        {activeTab === "personal" && (

                            <form onSubmit={handleSave}>

                                <div className="section-title">
                                    <div className="section-icon">
                                        <i className="bi bi-person"></i>
                                    </div>

                                    <div>
                                        <h3>Personal Information</h3>
                                        <p>
                                            Update your basic personal details.
                                        </p>
                                    </div>
                                </div>


                                <div className="form-grid">

                                    <div className="form-group">

                                        <label>
                                            First Name
                                        </label>

                                        <input
                                            type="text"
                                            name="firstName"
                                            value={profile.firstName}
                                            onChange={handleChange}
                                        />

                                    </div>


                                    <div className="form-group">

                                        <label>
                                            Last Name
                                        </label>

                                        <input
                                            type="text"
                                            name="lastName"
                                            value={profile.lastName}
                                            onChange={handleChange}
                                        />

                                    </div>


                                    <div className="form-group">

                                        <label>
                                            Email Address
                                        </label>

                                        <input
                                            type="email"
                                            name="email"
                                            value={profile.email}
                                            onChange={handleChange}
                                        />

                                    </div>


                                    <div className="form-group">

                                        <label>
                                            Phone Number
                                        </label>

                                        <input
                                            type="text"
                                            name="phone"
                                            value={profile.phone}
                                            onChange={handleChange}
                                        />

                                    </div>


                                    <div className="form-group">

                                        <label>
                                            Gender
                                        </label>

                                        <select
                                            name="gender"
                                            value={profile.gender}
                                            onChange={handleChange}
                                        >
                                            <option value="">
                                                Select Gender
                                            </option>

                                            <option value="Female">
                                                Female
                                            </option>

                                            <option value="Male">
                                                Male
                                            </option>

                                            <option value="Other">
                                                Other
                                            </option>
                                        </select>

                                    </div>


                                    <div className="form-group">

                                        <label>
                                            Date of Birth
                                        </label>

                                        <input
                                            type="date"
                                            name="dateOfBirth"
                                            value={profile.dateOfBirth}
                                            onChange={handleChange}
                                        />

                                    </div>


                                    <div className="form-group full-width">

                                        <label>
                                            Location
                                        </label>

                                        <input
                                            type="text"
                                            name="location"
                                            value={profile.location}
                                            onChange={handleChange}
                                        />

                                    </div>

                                </div>


                                <div className="form-actions">

                                    <button
                                        type="button"
                                        className="cancel-btn"
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        type="submit"
                                        className="save-btn"
                                    >
                                        <i className="bi bi-check-lg"></i>
                                        Save Changes
                                    </button>

                                </div>

                            </form>

                        )}


                        {activeTab === "professional" && (

                            <div>

                                <div className="section-title">

                                    <div className="section-icon">
                                        <i className="bi bi-briefcase"></i>
                                    </div>

                                    <div>
                                        <h3>Professional Information</h3>
                                        <p>
                                            Add your career and professional details.
                                        </p>
                                    </div>

                                </div>


                                <div className="form-grid">

                                    <div className="form-group">

                                        <label>
                                            Current Designation
                                        </label>

                                        <input
                                            type="text"
                                            name="designation"
                                            value={profile.designation}
                                            onChange={handleChange}
                                        />

                                    </div>


                                    <div className="form-group">

                                        <label>
                                            Experience
                                        </label>

                                        <input
                                            type="text"
                                            name="experience"
                                            value={profile.experience}
                                            onChange={handleChange}
                                        />

                                    </div>


                                    <div className="form-group full-width">

                                        <label>
                                            Skills
                                        </label>

                                        <input
                                            type="text"
                                            name="skills"
                                            value={profile.skills}
                                            onChange={handleChange}
                                            placeholder="Java, React, Spring Boot"
                                        />

                                    </div>

                                </div>


                                <div className="form-actions">

                                    <button
                                        className="save-btn"
                                        onClick={handleSave}
                                    >
                                        <i className="bi bi-check-lg"></i>
                                        Save Changes
                                    </button>

                                </div>

                            </div>

                        )}


                        {activeTab === "about" && (

                            <div>

                                <div className="section-title">

                                    <div className="section-icon">
                                        <i className="bi bi-card-text"></i>
                                    </div>

                                    <div>
                                        <h3>About Me</h3>
                                        <p>
                                            Tell employers about yourself.
                                        </p>
                                    </div>

                                </div>


                                <div className="form-group">

                                    <label>
                                        Professional Summary
                                    </label>

                                    <textarea
                                        name="about"
                                        value={profile.about}
                                        onChange={handleChange}
                                        rows="7"
                                    ></textarea>

                                </div>


                                <div className="form-actions">

                                    <button
                                        className="save-btn"
                                        onClick={handleSave}
                                    >
                                        <i className="bi bi-check-lg"></i>
                                        Save Changes
                                    </button>

                                </div>

                            </div>

                        )}

                    </section>


                    {/* FOOTER */}
                    <footer className="profile-footer">
                        © 2026 Shivani Technologies
                        <span> | </span>
                        Job Portal Management System
                    </footer>

                </main>

            </div>

        </div>
    );
}

export default Profile;