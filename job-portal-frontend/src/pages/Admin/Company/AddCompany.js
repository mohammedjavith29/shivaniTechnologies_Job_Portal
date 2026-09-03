import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { addCompany } from "../../../services/companyService";
import "./AddCompany.css";

function AddCompany() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        companyName: "",
        email: "",
        phone: "",
        location: "",
        website: "",
        description: ""
    });

    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");

        if (!formData.companyName.trim()) {
            setError("Company name is required.");
            return;
        }

        if (!formData.email.trim()) {
            setError("Email is required.");
            return;
        }

        try {
            setSaving(true);

            await addCompany(formData);

            alert("Company added successfully.");

            navigate("/companies");

        } catch (err) {
            console.error("Add company error:", err);

            setError(
                err.response?.data?.message ||
                "Unable to add company. Please try again."
            );
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="add-company-page">

            {/* ================= PAGE HEADER ================= */}

            <div className="add-company-header">

                <div className="add-company-header-left">

                    <div className="add-company-breadcrumb">
                        <Link to="/companies">
                            Companies
                        </Link>

                        <i className="bi bi-chevron-right"></i>

                        <span>Add Company</span>
                    </div>

                    <div className="add-company-title-row">

                        <div className="add-company-title-icon">
                            <i className="bi bi-building-add"></i>
                        </div>

                        <div>
                            <h1>Add Company</h1>

                            <p>
                                Add a new company to your organization
                            </p>
                        </div>

                    </div>

                </div>

                <Link
                    to="/companies"
                    className="back-company-btn"
                >
                    <i className="bi bi-arrow-left"></i>
                    Back to Companies
                </Link>

            </div>


            {/* ================= FORM CARD ================= */}

            <div className="add-company-card">

                <div className="add-company-card-header">

                    <div>
                        <h2>Company Information</h2>

                        <p>
                            Enter the details of the company below.
                        </p>
                    </div>

                    <span className="required-note">
                        <span>*</span> Required fields
                    </span>

                </div>


                {/* ================= ERROR ================= */}

                {error && (
                    <div className="company-form-error">
                        <i className="bi bi-exclamation-circle"></i>
                        <span>{error}</span>
                    </div>
                )}


                {/* ================= FORM ================= */}

                <form
                    className="company-form"
                    onSubmit={handleSubmit}
                >

                    {/* BASIC INFORMATION */}

                    <div className="form-section">

                        <div className="form-section-title">

                            <div className="section-icon">
                                <i className="bi bi-building"></i>
                            </div>

                            <div>
                                <h3>Basic Information</h3>
                                <p>Provide the company's basic details.</p>
                            </div>

                        </div>


                        <div className="form-grid">

                            {/* COMPANY NAME */}

                            <div className="form-group">

                                <label htmlFor="companyName">
                                    Company Name
                                    <span>*</span>
                                </label>

                                <div className="input-wrapper">

                                    <i className="bi bi-building"></i>

                                    <input
                                        id="companyName"
                                        name="companyName"
                                        type="text"
                                        placeholder="Enter company name"
                                        value={formData.companyName}
                                        onChange={handleChange}
                                    />

                                </div>

                            </div>


                            {/* EMAIL */}

                            <div className="form-group">

                                <label htmlFor="email">
                                    Email
                                    <span>*</span>
                                </label>

                                <div className="input-wrapper">

                                    <i className="bi bi-envelope"></i>

                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="company@example.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />

                                </div>

                            </div>


                            {/* PHONE */}

                            <div className="form-group">

                                <label htmlFor="phone">
                                    Phone Number
                                </label>

                                <div className="input-wrapper">

                                    <i className="bi bi-telephone"></i>

                                    <input
                                        id="phone"
                                        name="phone"
                                        type="text"
                                        placeholder="Enter phone number"
                                        value={formData.phone}
                                        onChange={handleChange}
                                    />

                                </div>

                            </div>


                            {/* LOCATION */}

                            <div className="form-group">

                                <label htmlFor="location">
                                    Location
                                </label>

                                <div className="input-wrapper">

                                    <i className="bi bi-geo-alt"></i>

                                    <input
                                        id="location"
                                        name="location"
                                        type="text"
                                        placeholder="e.g. Bangalore, India"
                                        value={formData.location}
                                        onChange={handleChange}
                                    />

                                </div>

                            </div>


                            {/* WEBSITE */}

                            <div className="form-group full-width">

                                <label htmlFor="website">
                                    Website
                                </label>

                                <div className="input-wrapper">

                                    <i className="bi bi-globe2"></i>

                                    <input
                                        id="website"
                                        name="website"
                                        type="text"
                                        placeholder="https://www.example.com"
                                        value={formData.website}
                                        onChange={handleChange}
                                    />

                                </div>

                            </div>

                        </div>

                    </div>


                    {/* DESCRIPTION */}

                    <div className="form-section description-section">

                        <div className="form-section-title">

                            <div className="section-icon">
                                <i className="bi bi-file-text"></i>
                            </div>

                            <div>
                                <h3>Company Description</h3>

                                <p>
                                    Provide a short description of the company,
                                    its services, or business activities.
                                </p>
                            </div>

                        </div>


                        <div className="form-group">

                            <label htmlFor="description">
                                Description
                            </label>

                            <textarea
                                id="description"
                                name="description"
                                rows="5"
                                placeholder="Describe the company, its services, business activities, and other relevant information..."
                                value={formData.description}
                                onChange={handleChange}
                            />

                            <div className="field-hint">
                                Keep the description clear and concise.
                            </div>

                        </div>

                    </div>


                    {/* ================= FORM FOOTER ================= */}

                    <div className="company-form-footer">

                        <Link
                            to="/companies"
                            className="cancel-company-btn"
                        >
                            Cancel
                        </Link>

                        <button
                            type="submit"
                            className="save-company-btn"
                            disabled={saving}
                        >

                            {saving ? (
                                <>
                                    <span className="save-spinner"></span>
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <i className="bi bi-check2"></i>
                                    Save Company
                                </>
                            )}

                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}

export default AddCompany;