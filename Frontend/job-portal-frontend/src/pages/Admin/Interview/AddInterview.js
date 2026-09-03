import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addInterview } from "../../../services/interviewService";

function AddInterview() {

    const navigate = useNavigate();

    const [interview, setInterview] = useState({
        candidateName: "",
        companyName: "",
        jobTitle: "",
        interviewDate: "",
        interviewTime: "",
        mode: "",
        interviewerName: "",
        status: "",
        remarks: ""
    });

    const handleChange = (e) => {

        setInterview({
            ...interview,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = (e) => {

        e.preventDefault();

        console.log("Sending Interview:", interview);

        addInterview(interview)
            .then((response) => {

                console.log("Response:", response.data);

                alert("Interview Scheduled Successfully");

                navigate("/interviews");

            })
            .catch((error) => {

                console.log(error);

                alert("Failed to Schedule Interview");

            });

    };

    return (

        <div className="container mt-4">

            <div className="card shadow">

                <div className="card-header bg-primary text-white">
                    <h3>Schedule Interview</h3>
                </div>

                <div className="card-body">

                    <form onSubmit={handleSubmit}>

                        <div className="mb-3">

                            <label className="form-label">
                                Candidate Name
                            </label>

                            <input
                                type="text"
                                className="form-control"
                                name="candidateName"
                                value={interview.candidateName}
                                onChange={handleChange}
                                required
                            />

                        </div>

                        <div className="mb-3">

                            <label className="form-label">
                                Company Name
                            </label>

                            <input
                                type="text"
                                className="form-control"
                                name="companyName"
                                value={interview.companyName}
                                onChange={handleChange}
                                required
                            />

                        </div>

                        <div className="mb-3">

                            <label className="form-label">
                                Job Title
                            </label>

                            <input
                                type="text"
                                className="form-control"
                                name="jobTitle"
                                value={interview.jobTitle}
                                onChange={handleChange}
                                required
                            />

                        </div>

                        <div className="row">

                            <div className="col-md-6 mb-3">

                                <label className="form-label">
                                    Interview Date
                                </label>

                                <input
                                    type="date"
                                    className="form-control"
                                    name="interviewDate"
                                    value={interview.interviewDate}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                            <div className="col-md-6 mb-3">

                                <label className="form-label">
                                    Interview Time
                                </label>

                                <input
                                    type="time"
                                    className="form-control"
                                    name="interviewTime"
                                    value={interview.interviewTime}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                        </div>

                        <div className="mb-3">

                            <label className="form-label">
                                Interview Mode
                            </label>

                            <select
                                className="form-select"
                                name="mode"
                                value={interview.mode}
                                onChange={handleChange}
                                required
                            >

                                <option value="">
                                    Select Mode
                                </option>

                                <option value="Online">
                                    Online
                                </option>

                                <option value="Offline">
                                    Offline
                                </option>

                            </select>

                        </div>

                        <div className="mb-3">

                            <label className="form-label">
                                Interviewer Name
                            </label>

                            <input
                                type="text"
                                className="form-control"
                                name="interviewerName"
                                value={interview.interviewerName}
                                onChange={handleChange}
                            />

                        </div>

                        <div className="mb-3">

                            <label className="form-label">
                                Status
                            </label>

                            <select
                                className="form-select"
                                name="status"
                                value={interview.status}
                                onChange={handleChange}
                                required
                            >

                                <option value="">
                                    Select Status
                                </option>

                                <option value="Scheduled">
                                    Scheduled
                                </option>

                                <option value="Completed">
                                    Completed
                                </option>

                                <option value="Cancelled">
                                    Cancelled
                                </option>

                            </select>

                        </div>

                        <div className="mb-3">

                            <label className="form-label">
                                Remarks
                            </label>

                            <textarea
                                className="form-control"
                                rows="4"
                                name="remarks"
                                value={interview.remarks}
                                onChange={handleChange}
                            ></textarea>

                        </div>

                        <button
                            type="submit"
                            className="btn btn-success"
                        >
                            Save Interview
                        </button>

                    </form>

                </div>

            </div>

        </div>

    );

}

export default AddInterview;