import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllJobs, deleteJob } from "../../../services/jobService";
import "./JobList.css";

function JobList() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    useEffect(() => {
        loadJobs();
    }, []);

    const loadJobs = async () => {
        try {
            setLoading(true);

            const res = await getAllJobs();

            console.log("Jobs:", res.data);

            setJobs(Array.isArray(res.data) ? res.data : []);
        } catch (error) {
            console.error("Error loading jobs:", error);
            setJobs([]);
        } finally {
            setLoading(false);
        }
    };

    const removeJob = async (id) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this job?"
        );

        if (!confirmed) return;

        try {
            await deleteJob(id);

            alert("Job deleted successfully.");

            loadJobs();
        } catch (error) {
            console.error("Delete error:", error);
            alert("Unable to delete job.");
        }
    };

    const filteredJobs = jobs.filter((job) => {
        const title = job.title || "";
        const company = job.companyName || "";
        const location = job.location || "";

        const searchText = `${title} ${company} ${location}`.toLowerCase();

        return searchText.includes(search.toLowerCase());
    });

    return (
        <div className="job-page">

            {/* =========================
                PAGE HEADER
            ========================== */}

            <div className="job-page-header">

                <div>
                    <div className="job-breadcrumb">
                        Recruitment / Jobs
                    </div>

                    <h1>Jobs</h1>

                    <p>
                        Manage job openings and organize your recruitment
                        workflow.
                    </p>
                </div>

                <Link
                    to="/jobs/add"
                    className="job-add-button"
                >
                    <i className="bi bi-plus-lg"></i>
                    Add Job
                </Link>

            </div>


            {/* =========================
                JOB CARD
            ========================== */}

            <div className="job-card">

                {/* CARD HEADER */}

                <div className="job-card-header">

                    <div>
                        <h2>Job List</h2>

                        <span>
                            {filteredJobs.length}{" "}
                            {filteredJobs.length === 1 ? "job" : "jobs"}
                        </span>
                    </div>

                    <div className="job-header-actions">

                        <div className="job-search">

                            <i className="bi bi-search"></i>

                            <input
                                type="text"
                                placeholder="Search jobs..."
                                value={search}
                                onChange={(e) =>
                                    setSearch(e.target.value)
                                }
                            />

                        </div>

                        <button
                            className="job-refresh-button"
                            onClick={loadJobs}
                            title="Refresh"
                        >
                            <i className="bi bi-arrow-clockwise"></i>
                        </button>

                    </div>

                </div>


                {/* =========================
                    TABLE
                ========================== */}

                <div className="job-table-wrapper">

                    <table className="job-table">

                        <thead>

                            <tr>
                                <th>ID</th>
                                <th>JOB TITLE</th>
                                <th>COMPANY</th>
                                <th>LOCATION</th>
                                <th>SALARY</th>
                                <th>ACTIONS</th>
                            </tr>

                        </thead>

                        <tbody>

                            {loading ? (

                                <tr>
                                    <td
                                        colSpan="6"
                                        className="job-empty"
                                    >
                                        <div className="job-loading">
                                            <i className="bi bi-arrow-repeat"></i>
                                            Loading jobs...
                                        </div>
                                    </td>
                                </tr>

                            ) : filteredJobs.length === 0 ? (

                                <tr>
                                    <td
                                        colSpan="6"
                                        className="job-empty"
                                    >

                                        <div className="job-empty-icon">
                                            <i className="bi bi-briefcase"></i>
                                        </div>

                                        <h3>
                                            {search
                                                ? "No jobs found"
                                                : "No jobs available"}
                                        </h3>

                                        <p>
                                            {search
                                                ? "Try searching with a different keyword."
                                                : "Create your first job opening to get started."}
                                        </p>

                                        {!search && (
                                            <Link
                                                to="/jobs/add"
                                                className="job-empty-button"
                                            >
                                                <i className="bi bi-plus-lg"></i>
                                                Add Job
                                            </Link>
                                        )}

                                    </td>
                                </tr>

                            ) : (

                                filteredJobs.map((job) => (

                                    <tr key={job.jobId}>

                                        {/* ID */}

                                        <td>
                                            <span className="job-id">
                                                #{job.jobId}
                                            </span>
                                        </td>


                                        {/* TITLE */}

                                        <td>

                                            <div className="job-title-cell">

                                                <div className="job-icon">
                                                    <i className="bi bi-briefcase"></i>
                                                </div>

                                                <div>

                                                    <strong>
                                                        {job.title || "Untitled Job"}
                                                    </strong>

                                                    <span>
                                                        Job Opening
                                                    </span>

                                                </div>

                                            </div>

                                        </td>


                                        {/* COMPANY */}

                                        <td>

                                            <div className="job-info">

                                                <i className="bi bi-building"></i>

                                                <span>
                                                    {job.companyName || "—"}
                                                </span>

                                            </div>

                                        </td>


                                        {/* LOCATION */}

                                        <td>

                                            <div className="job-info">

                                                <i className="bi bi-geo-alt"></i>

                                                <span>
                                                    {job.location || "—"}
                                                </span>

                                            </div>

                                        </td>


                                        {/* SALARY */}

                                        <td>

                                            <span className="salary-badge">

                                                <i className="bi bi-currency-rupee"></i>

                                                {job.salary || "Not specified"}

                                            </span>

                                        </td>


                                        {/* ACTIONS */}

                                        <td>

                                            <div className="job-actions">

                                                <Link
                                                    to={`/jobs/edit/${job.jobId}`}
                                                    className="job-edit-button"
                                                    title="Edit Job"
                                                >
                                                    <i className="bi bi-pencil"></i>
                                                </Link>

                                                <button
                                                    className="job-delete-button"
                                                    onClick={() =>
                                                        removeJob(job.jobId)
                                                    }
                                                    title="Delete Job"
                                                >
                                                    <i className="bi bi-trash3"></i>
                                                </button>

                                            </div>

                                        </td>

                                    </tr>

                                ))

                            )}

                        </tbody>

                    </table>

                </div>


                {/* =========================
                    CARD FOOTER
                ========================== */}

                {!loading && jobs.length > 0 && (

                    <div className="job-card-footer">

                        <span>
                            Showing{" "}
                            <strong>
                                {filteredJobs.length}
                            </strong>{" "}
                            of{" "}
                            <strong>
                                {jobs.length}
                            </strong>{" "}
                            jobs
                        </span>

                    </div>

                )}

            </div>

        </div>
    );
}

export default JobList;