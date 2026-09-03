import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    getCandidates,
    deleteCandidate
} from "../../services/candidateService";
import "./CandidateList.css";

function CandidateList() {

    const [candidates, setCandidates] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadCandidates();
    }, []);

    const loadCandidates = async () => {
        try {
            setLoading(true);

            const response = await getCandidates();

            console.log("Candidates:", response.data);

            setCandidates(
                Array.isArray(response.data)
                    ? response.data
                    : []
            );

        } catch (error) {
            console.error("Error loading candidates:", error);
            setCandidates([]);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {

        if (!id) {
            alert("Candidate ID not found");
            return;
        }

        if (
            !window.confirm(
                "Are you sure you want to delete this candidate?"
            )
        ) {
            return;
        }

        try {

            await deleteCandidate(id);

            alert("Candidate deleted successfully");

            loadCandidates();

        } catch (error) {

            console.error("Delete candidate error:", error);

            alert("Unable to delete candidate");
        }
    };

    return (
        <div className="candidate-page">

            {/* PAGE HEADER */}
            <div className="candidate-page-header">

                <div className="candidate-heading">

                    <div className="candidate-heading-icon">
                        <i className="bi bi-people-fill"></i>
                    </div>

                    <div>
                        <h1>Candidates</h1>

                        <p>
                            Manage and view all registered candidates
                        </p>
                    </div>

                </div>

                <Link
                    to="/candidates/add"
                    className="add-candidate-btn"
                >
                    <i className="bi bi-plus-lg"></i>
                    Add Candidate
                </Link>

            </div>


            {/* STAT CARD */}
            <div className="candidate-stat-row">

                <div className="candidate-stat-card">

                    <div className="candidate-stat-icon">
                        <i className="bi bi-person-check-fill"></i>
                    </div>

                    <div>
                        <span>Total Candidates</span>

                        <strong>
                            {candidates.length}
                        </strong>
                    </div>

                </div>

            </div>


            {/* MAIN CARD */}
            <div className="candidate-list-card">

                <div className="candidate-list-header">

                    <div>

                        <h2>Candidate List</h2>

                        <p>
                            View and manage registered candidates
                        </p>

                    </div>

                    <Link
                        to="/candidates/add"
                        className="header-add-btn"
                    >
                        <i className="bi bi-plus-lg"></i>
                        Add Candidate
                    </Link>

                </div>


                {/* TABLE */}
                <div className="candidate-table-container">

                    <table className="candidate-table">

                        <thead>

                            <tr>
                                <th>ID</th>
                                <th>Candidate</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>

                        </thead>

                        <tbody>

                            {loading ? (

                                <tr>

                                    <td
                                        colSpan="6"
                                        className="candidate-empty"
                                    >
                                        <div className="loading-box">
                                            <i className="bi bi-arrow-repeat"></i>
                                            Loading candidates...
                                        </div>
                                    </td>

                                </tr>

                            ) : candidates.length === 0 ? (

                                <tr>

                                    <td
                                        colSpan="6"
                                        className="candidate-empty"
                                    >

                                        <div className="empty-candidate">

                                            <div className="empty-candidate-icon">
                                                <i className="bi bi-person-x"></i>
                                            </div>

                                            <h3>
                                                No candidates found
                                            </h3>

                                            <p>
                                                Start by adding your first candidate.
                                            </p>

                                            <Link
                                                to="/candidates/add"
                                                className="empty-add-btn"
                                            >
                                                <i className="bi bi-plus-lg"></i>
                                                Add Candidate
                                            </Link>

                                        </div>

                                    </td>

                                </tr>

                            ) : (

                                candidates.map((candidate) => {

                                    const id =
                                        candidate.candidateId ||
                                        candidate.id;

                                    const name =
                                        candidate.name ||
                                        `${candidate.firstName || ""} ${candidate.lastName || ""}`.trim() ||
                                        "Unknown Candidate";

                                    const email =
                                        candidate.email || "-";

                                    const phone =
                                        candidate.phone ||
                                        candidate.mobile ||
                                        "-";

                                    return (

                                        <tr key={id}>

                                            <td>
                                                <span className="candidate-id">
                                                    #{id}
                                                </span>
                                            </td>

                                            <td>

                                                <div className="candidate-user">

                                                    <div className="candidate-avatar">
                                                        {name
                                                            .charAt(0)
                                                            .toUpperCase()}
                                                    </div>

                                                    <div>
                                                        <strong>
                                                            {name}
                                                        </strong>

                                                        <small>
                                                            Candidate
                                                        </small>
                                                    </div>

                                                </div>

                                            </td>

                                            <td>
                                                <span className="candidate-email">
                                                    {email}
                                                </span>
                                            </td>

                                            <td>
                                                {phone}
                                            </td>

                                            <td>

                                                <span className="candidate-status">
                                                    Active
                                                </span>

                                            </td>

                                            <td>

                                                <div className="candidate-actions">

                                                    <button
                                                        className="candidate-delete-btn"
                                                        onClick={() =>
                                                            handleDelete(id)
                                                        }
                                                    >
                                                        <i className="bi bi-trash3"></i>
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
}

export default CandidateList;