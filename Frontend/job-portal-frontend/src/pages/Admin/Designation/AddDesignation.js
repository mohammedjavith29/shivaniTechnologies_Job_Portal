import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AddDesignation.css";

const API_URL = "http://localhost:8080/api/designations";

function AddDesignation() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        designationName: "",
        description: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");

        if (!formData.designationName.trim()) {
            setError("Designation name is required.");
            return;
        }

        try {
            setLoading(true);

            await axios.post(API_URL, {
                designationName: formData.designationName.trim(),
                description: formData.description.trim(),
            });

            alert("Designation added successfully.");

            navigate("/designations");
        } catch (err) {
            console.error("Add designation error:", err);

            if (err.response?.status === 409) {
                setError("This designation already exists.");
            } else if (err.response?.data?.message) {
                setError(err.response.data.message);
            } else {
                setError(
                    "Unable to add designation. Please check that the backend is running."
                );
            }
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        navigate("/designations");
    };

    return (
        <div className="add-designation-page">

            {/* Breadcrumb */}
            <div className="designation-breadcrumb">
                <button
                    type="button"
                    onClick={() => navigate("/designations")}
                    className="breadcrumb-link"
                >
                    Designations
                </button>

                <span>/</span>

                <span>Add Designation</span>
            </div>

            {/* Header */}
            <div className="add-designation-header">

                <div className="header-left">

                    <div className="page-icon">
                        <i className="bi bi-person-badge"></i>
                    </div>

                    <div>
                        <h1>Add Designation</h1>

                        <p>
                            Create a new job designation for your recruitment system.
                        </p>
                    </div>

                </div>

                <button
                    type="button"
                    className="back-button"
                    onClick={handleCancel}
                >
                    <i className="bi bi-arrow-left"></i>
                    Back to Designations
                </button>

            </div>

            {/* Form Card */}
            <div className="add-designation-card">

                <div className="card-heading">

                    <div className="card-heading-icon">
                        <i className="bi bi-person-vcard"></i>
                    </div>

                    <div>
                        <h2>Designation Information</h2>

                        <p>
                            Enter the details of the new designation below.
                        </p>
                    </div>

                </div>

                <form onSubmit={handleSubmit}>

                    <div className="form-content">

                        {/* Error */}
                        {error && (
                            <div className="form-error">
                                <i className="bi bi-exclamation-circle"></i>
                                <span>{error}</span>
                            </div>
                        )}

                        {/* Designation Name */}
                        <div className="form-group">

                            <label htmlFor="designationName">
                                Designation Name
                                <span className="required">*</span>
                            </label>

                            <div className="input-container">

                                <i className="bi bi-person-badge input-icon"></i>

                                <input
                                    id="designationName"
                                    type="text"
                                    name="designationName"
                                    value={formData.designationName}
                                    onChange={handleChange}
                                    placeholder="e.g. Software Developer"
                                    maxLength="100"
                                    required
                                    autoFocus
                                />

                            </div>

                            <small>
                                Enter the official name of the job designation.
                            </small>

                        </div>

                        {/* Description */}
                        <div className="form-group">

                            <label htmlFor="description">
                                Description
                            </label>

                            <div className="textarea-container">

                                <i className="bi bi-card-text textarea-icon"></i>

                                <textarea
                                    id="description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    placeholder="Describe the responsibilities or purpose of this designation..."
                                    maxLength="500"
                                    rows="6"
                                />

                            </div>

                            <div className="field-bottom">
                                <small>
                                    Optional description for this designation.
                                </small>

                                <span>
                                    {formData.description.length}/500
                                </span>
                            </div>

                        </div>

                    </div>

                    {/* Footer */}
                    <div className="form-footer">

                        <button
                            type="button"
                            className="cancel-button"
                            onClick={handleCancel}
                            disabled={loading}
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="save-button"
                            disabled={loading}
                        >

                            {loading ? (
                                <>
                                    <i className="bi bi-arrow-repeat spinning"></i>
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <i className="bi bi-check-lg"></i>
                                    Save Designation
                                </>
                            )}

                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}

export default AddDesignation;