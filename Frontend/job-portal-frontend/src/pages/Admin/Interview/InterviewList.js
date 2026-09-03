import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    getInterviews,
    deleteInterview
} from "../../services/interviewService";
import "./InterviewList.css";

const InterviewList = () => {

    const [interviews, setInterviews] = useState([]);
    const [search, setSearch] = useState("");
    const [showSchedule, setShowSchedule] = useState(false);

    useEffect(() => {
        loadInterviews();
    }, []);

    const loadInterviews = async () => {
        try {
            const response = await getInterviews();

            const data = Array.isArray(response.data)
                ? response.data
                : response.data?.content || [];

            setInterviews(data);
        } catch (error) {
            console.error("Error loading interviews:", error);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this interview?")) {
            return;
        }

        try {
            await deleteInterview(id);
            loadInterviews();
        } catch (error) {
            console.error("Delete failed:", error);
        }
    };

    const filteredInterviews = interviews.filter((item) => {

        const candidate =
            item.candidateName ||
            item.candidate?.name ||
            "";

        const company =
            item.companyName ||
            item.company?.name ||
            item.company?.companyName ||
            "";

        const job =
            item.jobTitle ||
            item.job?.title ||
            "";

        const status = item.status || "";

        const text =
            `${candidate} ${company} ${job} ${status}`.toLowerCase();

        return text.includes(search.toLowerCase());
    });

    return (
        <div className="interview-list-page">

            {/* PAGE HEADER */}

            <div className="page-top">

                <div>
                    <div className="page-breadcrumb">
                        Home <span>/</span> Interviews
                    </div>

                    <h2>Interviews</h2>
                </div>

                <button
                    className="schedule-interview-btn"
                    onClick={() => setShowSchedule(!showSchedule)}
                >
                    <span>
                        {showSchedule ? "−" : "+"}
                    </span>

                    {showSchedule
                        ? "Close"
                        : "Schedule Interview"}
                </button>

            </div>


            {/* COLLAPSED SCHEDULE AREA */}

            {showSchedule && (
                <div className="schedule-box">

                    <div className="schedule-title">
                        <div>
                            <h3>Schedule Interview</h3>
                            <p>
                                Create a new interview schedule
                            </p>
                        </div>

                        <button
                            onClick={() => setShowSchedule(false)}
                            className="schedule-close"
                        >
                            ×
                        </button>
                    </div>

                    <div className="schedule-content">

                        <div className="schedule-field">
                            <label>Candidate</label>
                            <input
                                type="text"
                                placeholder="Select candidate"
                            />
                        </div>

                        <div className="schedule-field">
                            <label>Company</label>
                            <input
                                type="text"
                                placeholder="Select company"
                            />
                        </div>

                        <div className="schedule-field">
                            <label>Job</label>
                            <input
                                type="text"
                                placeholder="Select job"
                            />
                        </div>

                        <div className="schedule-field">
                            <label>Date</label>
                            <input type="date" />
                        </div>

                        <div className="schedule-field">
                            <label>Time</label>
                            <input type="time" />
                        </div>

                        <div className="schedule-field">
                            <label>Mode</label>

                            <select defaultValue="ONLINE">
                                <option value="ONLINE">
                                    Online
                                </option>

                                <option value="OFFLINE">
                                    Offline
                                </option>

                                <option value="PHONE">
                                    Phone
                                </option>
                            </select>
                        </div>

                    </div>

                    <div className="schedule-footer">

                        <button
                            className="cancel-btn"
                            onClick={() => setShowSchedule(false)}
                        >
                            Cancel
                        </button>

                        <Link
                            to="/interviews/add"
                            className="continue-btn"
                        >
                            Continue
                        </Link>

                    </div>

                </div>
            )}


            {/* MAIN LIST */}

            <div className="interview-card">

                {/* TOOLBAR */}

                <div className="list-toolbar">

                    <div className="toolbar-left">

                        <span className="all-text">
                            All Interviews
                        </span>

                        <span className="count">
                            {filteredInterviews.length}
                        </span>

                    </div>

                    <div className="toolbar-right">

                        <div className="search-wrapper">

                            <span>⌕</span>

                            <input
                                type="text"
                                placeholder="Search"
                                value={search}
                                onChange={(e) =>
                                    setSearch(e.target.value)
                                }
                            />

                        </div>

                        <button
                            className="refresh-btn"
                            onClick={loadInterviews}
                            title="Refresh"
                        >
                            ↻
                        </button>

                    </div>

                </div>


                {/* TABLE */}

                <div className="table-container">

                    <table>

                        <thead>

                            <tr>
                                <th>ID</th>
                                <th>Candidate</th>
                                <th>Company</th>
                                <th>Job</th>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Mode</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>

                        </thead>

                        <tbody>

                            {filteredInterviews.length === 0 ? (

                                <tr>

                                    <td
                                        colSpan="9"
                                        className="no-data"
                                    >
                                        No interviews found
                                    </td>

                                </tr>

                            ) : (

                                filteredInterviews.map((item) => {

                                    const id =
                                        item.interviewId ||
                                        item.id;

                                    const candidate =
                                        item.candidateName ||
                                        item.candidate?.name ||
                                        "-";

                                    const company =
                                        item.companyName ||
                                        item.company?.name ||
                                        item.company?.companyName ||
                                        "-";

                                    const job =
                                        item.jobTitle ||
                                        item.job?.title ||
                                        "-";

                                    return (
                                        <tr key={id}>

                                            <td>
                                                {id}
                                            </td>

                                            <td>
                                                <div className="candidate">

                                                    <div className="candidate-avatar">
                                                        {candidate
                                                            .charAt(0)
                                                            .toUpperCase()}
                                                    </div>

                                                    <span>
                                                        {candidate}
                                                    </span>

                                                </div>
                                            </td>

                                            <td>
                                                {company}
                                            </td>

                                            <td>
                                                {job}
                                            </td>

                                            <td>
                                                {item.interviewDate || "-"}
                                            </td>

                                            <td>
                                                {item.interviewTime || "-"}
                                            </td>

                                            <td>
                                                {item.interviewMode || "-"}
                                            </td>

                                            <td>

                                                <span
                                                    className={`status status-${(
                                                        item.status || "pending"
                                                    ).toLowerCase()}`}
                                                >
                                                    {item.status || "Pending"}
                                                </span>

                                            </td>

                                            <td>

                                                <div className="actions">

                                                    <Link
                                                        to={`/interviews/view/${id}`}
                                                        className="action-view"
                                                    >
                                                        View
                                                    </Link>

                                                    <Link
                                                        to={`/interviews/edit/${id}`}
                                                        className="action-edit"
                                                    >
                                                        Edit
                                                    </Link>

                                                    <button
                                                        onClick={() =>
                                                            handleDelete(id)
                                                        }
                                                        className="action-delete"
                                                    >
                                                        Delete
                                                    </button>

                                                </div>

                                            </td>

                                        </tr>
                                    );
                                })
                            )}

                        </tbody>

                    </table>

                </div>

            </div>

        </div>
    );
};

export default InterviewList;