import React, { useEffect, useState } from "react";
import axios from "axios";
import "./DesignationList.css";

const API_URL = "http://localhost:8080/api/designations";

function DesignationList() {
    const [designations, setDesignations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        loadDesignations();
    }, []);

    const loadDesignations = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await axios.get(API_URL);

            setDesignations(response.data || []);
        } catch (err) {
            console.error("Error loading designations:", err);
            setError("Unable to load designations.");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this designation?")) {
            return;
        }

        try {
            await axios.delete(`${API_URL}/${id}`);

            alert("Designation deleted successfully");

            loadDesignations();
        } catch (err) {
            console.error("Delete error:", err);
            alert("Unable to delete designation.");
        }
    };

    return (
        <div className="designation-page">

            {/* Header */}
            <div className="designation-page-header">
                <div>
                    <div className="designation-breadcrumb">
                        Recruitment <span>/</span> Designations
                    </div>

                    <h1>Designations</h1>

                    <p>
                        Manage job designations used across your recruitment system.
                    </p>
                </div>

                <button
                    className="designation-add-btn"
                    onClick={() => {
                        window.location.href = "/designations/add";
                    }}
                >
                    <i className="bi bi-plus-lg"></i>
                    Add Designation
                </button>
            </div>

            {/* Summary */}
            <div className="designation-summary">
                <div className="summary-icon">
                    <i className="bi bi-person-badge"></i>
                </div>

                <div>
                    <span>Total Designations</span>
                    <strong>{designations.length}</strong>
                </div>
            </div>

            {/* Main Card */}
            <div className="designation-card">

                <div className="designation-card-header">
                    <div>
                        <h2>Designation List</h2>
                        <p>
                            View and manage all available job designations.
                        </p>
                    </div>

                    <button
                        className="refresh-btn"
                        onClick={loadDesignations}
                    >
                        <i className="bi bi-arrow-clockwise"></i>
                        Refresh
                    </button>
                </div>

                {loading ? (
                    <div className="designation-state">
                        <i className="bi bi-arrow-repeat"></i>
                        <p>Loading designations...</p>
                    </div>
                ) : error ? (
                    <div className="designation-state error">
                        <i className="bi bi-exclamation-circle"></i>
                        <p>{error}</p>

                        <button onClick={loadDesignations}>
                            Try Again
                        </button>
                    </div>
                ) : designations.length === 0 ? (
                    <div className="designation-state">
                        <div className="empty-icon">
                            <i className="bi bi-person-badge"></i>
                        </div>

                        <h3>No designations found</h3>

                        <p>
                            Add your first job designation to get started.
                        </p>
                    </div>
                ) : (
                    <div className="designation-table-wrapper">

                        <table className="designation-table">

                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Designation</th>
                                    <th>Description</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {designations.map((designation) => (
                                    <tr key={designation.designationId}>

                                        <td>
                                            <span className="designation-id">
                                                #{designation.designationId}
                                            </span>
                                        </td>

                                        <td>
                                            <div className="designation-name">
                                                <div className="designation-avatar">
                                                    <i className="bi bi-person-badge"></i>
                                                </div>

                                                <strong>
                                                    {designation.designationName}
                                                </strong>
                                            </div>
                                        </td>

                                        <td>
                                            <span className="designation-description">
                                                {designation.description || "-"}
                                            </span>
                                        </td>

                                        <td>
                                            <div className="designation-actions">

                                                <button
                                                    className="edit-btn"
                                                    onClick={() =>
                                                        window.location.href =
                                                            `/designations/edit/${designation.designationId}`
                                                    }
                                                    title="Edit"
                                                >
                                                    <i className="bi bi-pencil"></i>
                                                </button>

                                                <button
                                                    className="delete-btn"
                                                    onClick={() =>
                                                        handleDelete(
                                                            designation.designationId
                                                        )
                                                    }
                                                    title="Delete"
                                                >
                                                    <i className="bi bi-trash"></i>
                                                </button>

                                            </div>
                                        </td>

                                    </tr>
                                ))}
                            </tbody>

                        </table>
                    </div>
                )}

            </div>
        </div>
    );
}

export default DesignationList;