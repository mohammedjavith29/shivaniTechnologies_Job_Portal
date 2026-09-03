import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./JobSearch.css";

function JobSearch() {
    const navigate = useNavigate();

    const [search, setSearch] = useState("");

    const jobs = [
        {
            id: 1,
            title: "Java Developer",
            company: "Shivani Technologies",
            location: "Hyderabad",
            type: "Full Time",
        },
        {
            id: 2,
            title: "React Developer",
            company: "Tech Solutions",
            location: "Bangalore",
            type: "Full Time",
        },
        {
            id: 3,
            title: "Software Engineer",
            company: "ABC Technologies",
            location: "Pune",
            type: "Full Time",
        },
    ];

    const filteredJobs = jobs.filter((job) => {
        const title = job.title.toLowerCase();
        const company = job.company.toLowerCase();
        const location = job.location.toLowerCase();
        const keyword = search.toLowerCase();

        return (
            title.includes(keyword) ||
            company.includes(keyword) ||
            location.includes(keyword)
        );
    });

    const handleSearch = (e) => {
        e.preventDefault();
    };

    const handleApply = (job) => {
        navigate("/applications/add", {
            state: {
                jobId: job.id,
                jobTitle: job.title,
                companyName: job.company,
                location: job.location,
            },
        });
    };

    const handleDashboard = () => {
        navigate("/candidate");
    };

    return (
        <div className="job-search-page">

            {/* HEADER */}
            <div className="job-search-header">

                <div className="job-header-left">

                    <div className="job-breadcrumb">

                        <button
                            type="button"
                            onClick={handleDashboard}
                        >
                            Candidate Dashboard
                        </button>

                        <span>/</span>

                        <span>Find Jobs</span>

                    </div>

                    <h1>Find Jobs</h1>

                    <p>
                        Search and find your next career opportunity
                    </p>

                </div>

                <button
                    type="button"
                    className="back-dashboard-button"
                    onClick={handleDashboard}
                >
                    <i className="bi bi-arrow-left"></i>
                    Dashboard
                </button>

            </div>


            {/* SEARCH */}
            <form
                className="job-search-box"
                onSubmit={handleSearch}
            >

                <div className="search-input-wrapper">

                    <i className="bi bi-search"></i>

                    <input
                        type="text"
                        placeholder="Search jobs, skills or companies..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    {search.length > 0 && (
                        <button
                            type="button"
                            className="clear-search"
                            onClick={() => setSearch("")}
                        >
                            <i className="bi bi-x"></i>
                        </button>
                    )}

                </div>

                <button
                    type="submit"
                    className="search-button"
                >
                    <i className="bi bi-search"></i>
                    Search
                </button>

            </form>


            {/* RESULTS HEADER */}
            <div className="jobs-result-header">

                <div>

                    <h2>Available Jobs</h2>

                    <p>
                        Browse available career opportunities
                    </p>

                </div>

                <div className="job-count">
                    {filteredJobs.length} jobs found
                </div>

            </div>


            {/* JOB RESULTS */}
            <div className="job-results">

                {filteredJobs.length === 0 ? (

                    <div className="no-jobs">

                        <div className="no-jobs-icon">
                            <i className="bi bi-search"></i>
                        </div>

                        <h3>No jobs found</h3>

                        <p>
                            Try another job title, skill or company.
                        </p>

                        <button
                            type="button"
                            onClick={() => setSearch("")}
                        >
                            Clear Search
                        </button>

                    </div>

                ) : (

                    filteredJobs.map((job) => (

                        <div
                            className="job-card"
                            key={job.id}
                        >

                            <div className="job-card-top">

                                <div className="job-icon">
                                    <i className="bi bi-briefcase-fill"></i>
                                </div>

                                <div className="job-title-section">

                                    <h3>
                                        {job.title}
                                    </h3>

                                    <p>
                                        <i className="bi bi-building"></i>
                                        {job.company}
                                    </p>

                                </div>

                            </div>


                            <div className="job-details">

                                <span>
                                    <i className="bi bi-geo-alt"></i>
                                    {job.location}
                                </span>

                                <span>
                                    <i className="bi bi-clock"></i>
                                    {job.type}
                                </span>

                            </div>


                            <div className="job-card-footer">

                                <span className="job-status">
                                    <i className="bi bi-check-circle-fill"></i>
                                    Active
                                </span>

                                <button
                                    type="button"
                                    className="apply-button"
                                    onClick={() => handleApply(job)}
                                >
                                    Apply Now
                                    <i className="bi bi-arrow-right"></i>
                                </button>

                            </div>

                        </div>

                    ))

                )}

            </div>

        </div>
    );
}

export default JobSearch;
