import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { addJob } from "../../../services/jobService";
import { getDesignations } from "../../../services/designationService";

import "./AddJob.css";

function AddJob() {

    const navigate = useNavigate();

    const [designations, setDesignations] = useState([]);

    const [job, setJob] = useState({
        title: "",
        companyName: "",
        designation: {
            designationId: ""
        },
        location: "",
        salary: "",
        experience: "",
        skills: "",
        description: ""
    });

    const [loading, setLoading] = useState(false);
    const [designationLoading, setDesignationLoading] = useState(true);

    useEffect(() => {
        loadDesignations();
    }, []);

    const loadDesignations = async () => {

        try {

            setDesignationLoading(true);

            const response = await getDesignations();

            console.log("Designations:", response.data);

            setDesignations(response.data || []);

        } catch (error) {

            console.error("Error loading designations:", error);

            alert("Unable to load designations.");

        } finally {

            setDesignationLoading(false);

        }
    };

    const handleChange = (e) => {

        const { name, value } = e.target;

        setJob((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleDesignationChange = (e) => {

        const value = e.target.value;

        setJob((prev) => ({
            ...prev,

            designation: {
                designationId: value
                    ? Number(value)
                    : ""
            }
        }));
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!job.designation.designationId) {
            alert("Please select a designation.");
            return;
        }

        try {

            setLoading(true);

            /*
             * Data sent to Spring Boot:
             *
             * designation: {
             *     designationId: 1
             * }
             */

            const jobData = {
                title: job.title,
                companyName: job.companyName,

                designation: {
                    designationId: Number(
                        job.designation.designationId
                    )
                },

                location: job.location,

                salary: job.salary
                    ? Number(job.salary)
                    : null,

                experience: job.experience,

                skills: job.skills,

                description: job.description
            };

            console.log("Saving Job:", jobData);

            await addJob(jobData);

            alert("Job added successfully!");

            navigate("/jobs");

        } catch (error) {

            console.error("Error adding job:", error);

            if (error.response) {
                console.error(
                    "Backend response:",
                    error.response.data
                );
            }

            alert("Unable to add job.");

        } finally {

            setLoading(false);

        }
    };

    const handleCancel = () => {
        navigate("/jobs");
    };

    return (
        <div className="add-job-page">

            {/* Breadcrumb */}

            <div className="job-breadcrumb">

                <span>Recruitment</span>

                <i className="bi bi-chevron-right"></i>

                <span>Jobs</span>

                <i className="bi bi-chevron-right"></i>

                <span className="active">
                    Add Job
                </span>

            </div>


            {/* Header */}

            <div className="job-page-header">

                <div>

                    <div className="job-header-icon">
                        <i className="bi bi-briefcase"></i>
                    </div>

                    <h1>Add Job</h1>

                    <p>
                        Create a new job opening and add it
                        to your recruitment workflow.
                    </p>

                </div>

                <button
                    type="button"
                    className="back-btn"
                    onClick={handleCancel}
                >
                    <i className="bi bi-arrow-left"></i>
                    Back to Jobs
                </button>

            </div>


            {/* Card */}

            <div className="job-form-card">

                {/* Card Header */}

                <div className="job-form-header">

                    <div>

                        <h2>
                            Job Information
                        </h2>

                        <p>
                            Enter the details of the new
                            job position.
                        </p>

                        <span className="required-text">
                            * Required fields
                        </span>

                    </div>

                </div>


                <form onSubmit={handleSubmit}>

                    {/* Basic Information */}

                    <div className="form-section">

                        <div className="section-heading">

                            <div className="section-icon">
                                <i className="bi bi-info-circle"></i>
                            </div>

                            <div>
                                <h3>
                                    Basic Information
                                </h3>

                                <p>
                                    Provide the basic details
                                    about this job opening.
                                </p>
                            </div>

                        </div>


                        <div className="form-grid">

                            {/* Job Title */}

                            <div className="form-group">

                                <label>
                                    Job Title
                                    <span>*</span>
                                </label>

                                <div className="input-wrapper">

                                    <i className="bi bi-briefcase input-icon"></i>

                                    <input
                                        type="text"
                                        name="title"
                                        value={job.title}
                                        onChange={handleChange}
                                        placeholder="e.g. Senior Software Developer"
                                        required
                                    />

                                </div>

                            </div>


                            {/* Designation */}

                            <div className="form-group">

                                <label>
                                    Designation
                                    <span>*</span>
                                </label>

                                <div className="input-wrapper">

                                    <i className="bi bi-person-badge input-icon"></i>

                                    <select
                                        value={
                                            job.designation.designationId
                                        }
                                        onChange={
                                            handleDesignationChange
                                        }
                                        required
                                        disabled={
                                            designationLoading
                                        }
                                    >

                                        <option value="">
                                            {designationLoading
                                                ? "Loading designations..."
                                                : "Select designation"}
                                        </option>

                                        {designations.map(
                                            (designation) => (

                                                <option
                                                    key={
                                                        designation.designationId
                                                    }
                                                    value={
                                                        designation.designationId
                                                    }
                                                >
                                                    {
                                                        designation.designationName
                                                    }
                                                </option>

                                            )
                                        )}

                                    </select>

                                </div>

                                <small>
                                    Select the designation for this
                                    job position.
                                </small>

                            </div>


                            {/* Company */}

                            <div className="form-group">

                                <label>
                                    Company Name
                                    <span>*</span>
                                </label>

                                <div className="input-wrapper">

                                    <i className="bi bi-building input-icon"></i>

                                    <input
                                        type="text"
                                        name="companyName"
                                        value={job.companyName}
                                        onChange={handleChange}
                                        placeholder="Enter company name"
                                        required
                                    />

                                </div>

                            </div>


                            {/* Location */}

                            <div className="form-group">

                                <label>
                                    Location
                                    <span>*</span>
                                </label>

                                <div className="input-wrapper">

                                    <i className="bi bi-geo-alt input-icon"></i>

                                    <input
                                        type="text"
                                        name="location"
                                        value={job.location}
                                        onChange={handleChange}
                                        placeholder="e.g. Bangalore, India"
                                        required
                                    />

                                </div>

                            </div>


                            {/* Salary */}

                            <div className="form-group">

                                <label>
                                    Salary
                                </label>

                                <div className="input-wrapper">

                                    <i className="bi bi-currency-rupee input-icon"></i>

                                    <input
                                        type="number"
                                        name="salary"
                                        value={job.salary}
                                        onChange={handleChange}
                                        placeholder="e.g. 800000"
                                        min="0"
                                    />

                                </div>

                            </div>


                            {/* Experience */}

                            <div className="form-group">

                                <label>
                                    Experience
                                </label>

                                <div className="input-wrapper">

                                    <i className="bi bi-bar-chart input-icon"></i>

                                    <input
                                        type="text"
                                        name="experience"
                                        value={job.experience}
                                        onChange={handleChange}
                                        placeholder="e.g. 2 - 5 Years"
                                    />

                                </div>

                            </div>


                            {/* Skills */}

                            <div className="form-group full-width">

                                <label>
                                    Required Skills
                                </label>

                                <div className="input-wrapper">

                                    <i className="bi bi-stars input-icon"></i>

                                    <input
                                        type="text"
                                        name="skills"
                                        value={job.skills}
                                        onChange={handleChange}
                                        placeholder="e.g. Java, React, SQL"
                                    />

                                </div>

                                <small>
                                    Separate multiple skills with commas.
                                </small>

                            </div>

                        </div>

                    </div>


                    {/* Description */}

                    <div className="form-section">

                        <div className="section-heading">

                            <div className="section-icon">
                                <i className="bi bi-file-text"></i>
                            </div>

                            <div>

                                <h3>
                                    Job Description
                                </h3>

                                <p>
                                    Describe the role,
                                    responsibilities and
                                    requirements.
                                </p>

                            </div>

                        </div>


                        <div className="form-group full-width">

                            <label>
                                Description
                                <span>*</span>
                            </label>

                            <textarea
                                name="description"
                                value={job.description}
                                onChange={handleChange}
                                placeholder="Describe the role, responsibilities, requirements and other important information..."
                                rows="7"
                                required
                            />

                            <small>
                                Provide a clear and detailed
                                description of the job position.
                            </small>

                        </div>

                    </div>


                    {/* Footer */}

                    <div className="form-footer">

                        <button
                            type="button"
                            className="btn-cancel"
                            onClick={handleCancel}
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="btn-save"
                            disabled={loading}
                        >

                            {loading ? (
                                <>
                                    <i className="bi bi-arrow-repeat"></i>
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <i className="bi bi-check-lg"></i>
                                    Save Job
                                </>
                            )}

                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}

export default AddJob;