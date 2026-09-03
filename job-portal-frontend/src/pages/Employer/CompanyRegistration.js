import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CompanyRegistration.css";

const CompanyRegistration = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        companyName: "",
        companyType: "",
        registrationNumber: "",
        industry: "",
        email: "",
        phone: "",
        website: "",
        address: "",
        city: "",
        state: "",
        country: "",
        postalCode: "",
        contactPerson: "",
        contactEmail: "",
        contactPhone: "",
        description: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log("Company Registration:", formData);

        alert("Company registered successfully!");

        navigate("/company-verification");
    };

    return (
        <div className="company-registration-page">

            {/* PAGE HEADER */}

            <div className="company-page-header">

                <div>
                    <div className="company-breadcrumb">
                        Home <span>/</span> Company Registration
                    </div>

                    <h1>Company Registration</h1>

                    <p>
                        Register a new company and provide the required business details
                    </p>
                </div>

            </div>


            {/* FORM CARD */}

            <form
                className="company-form-card"
                onSubmit={handleSubmit}
            >

                {/* COMPANY INFORMATION */}

                <div className="form-section">

                    <div className="section-header">

                        <div className="section-icon">
                            🏢
                        </div>

                        <div>
                            <h2>Company Information</h2>
                            <p>
                                Basic information about the company
                            </p>
                        </div>

                    </div>


                    <div className="form-grid">

                        <div className="form-field">

                            <label>
                                Company Name
                                <span>*</span>
                            </label>

                            <input
                                type="text"
                                name="companyName"
                                value={formData.companyName}
                                onChange={handleChange}
                                placeholder="Enter company name"
                                required
                            />

                        </div>


                        <div className="form-field">

                            <label>
                                Company Type
                                <span>*</span>
                            </label>

                            <select
                                name="companyType"
                                value={formData.companyType}
                                onChange={handleChange}
                                required
                            >
                                <option value="">
                                    Select company type
                                </option>

                                <option value="PRIVATE">
                                    Private Limited
                                </option>

                                <option value="PUBLIC">
                                    Public Limited
                                </option>

                                <option value="PARTNERSHIP">
                                    Partnership
                                </option>

                                <option value="PROPRIETORSHIP">
                                    Proprietorship
                                </option>

                                <option value="LLP">
                                    LLP
                                </option>
                            </select>

                        </div>


                        <div className="form-field">

                            <label>
                                Registration Number
                            </label>

                            <input
                                type="text"
                                name="registrationNumber"
                                value={formData.registrationNumber}
                                onChange={handleChange}
                                placeholder="Enter registration number"
                            />

                        </div>


                        <div className="form-field">

                            <label>
                                Industry
                                <span>*</span>
                            </label>

                            <select
                                name="industry"
                                value={formData.industry}
                                onChange={handleChange}
                                required
                            >
                                <option value="">
                                    Select industry
                                </option>

                                <option value="IT">
                                    Information Technology
                                </option>

                                <option value="FINANCE">
                                    Finance
                                </option>

                                <option value="HEALTHCARE">
                                    Healthcare
                                </option>

                                <option value="EDUCATION">
                                    Education
                                </option>

                                <option value="RETAIL">
                                    Retail
                                </option>

                                <option value="MANUFACTURING">
                                    Manufacturing
                                </option>

                                <option value="OTHER">
                                    Other
                                </option>
                            </select>

                        </div>

                    </div>

                </div>


                {/* CONTACT INFORMATION */}

                <div className="form-section">

                    <div className="section-header">

                        <div className="section-icon">
                            📞
                        </div>

                        <div>
                            <h2>Contact Information</h2>
                            <p>
                                Company contact and communication details
                            </p>
                        </div>

                    </div>


                    <div className="form-grid">

                        <div className="form-field">

                            <label>
                                Email Address
                                <span>*</span>
                            </label>

                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="company@example.com"
                                required
                            />

                        </div>


                        <div className="form-field">

                            <label>
                                Phone Number
                                <span>*</span>
                            </label>

                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="Enter phone number"
                                required
                            />

                        </div>


                        <div className="form-field full-width">

                            <label>
                                Website
                            </label>

                            <input
                                type="url"
                                name="website"
                                value={formData.website}
                                onChange={handleChange}
                                placeholder="https://www.example.com"
                            />

                        </div>

                    </div>

                </div>


                {/* ADDRESS */}

                <div className="form-section">

                    <div className="section-header">

                        <div className="section-icon">
                            📍
                        </div>

                        <div>
                            <h2>Company Address</h2>
                            <p>
                                Registered office and location details
                            </p>
                        </div>

                    </div>


                    <div className="form-grid">

                        <div className="form-field full-width">

                            <label>
                                Address
                                <span>*</span>
                            </label>

                            <textarea
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                placeholder="Enter complete company address"
                                rows="3"
                                required
                            />

                        </div>


                        <div className="form-field">

                            <label>
                                City
                                <span>*</span>
                            </label>

                            <input
                                type="text"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                placeholder="Enter city"
                                required
                            />

                        </div>


                        <div className="form-field">

                            <label>
                                State
                                <span>*</span>
                            </label>

                            <input
                                type="text"
                                name="state"
                                value={formData.state}
                                onChange={handleChange}
                                placeholder="Enter state"
                                required
                            />

                        </div>


                        <div className="form-field">

                            <label>
                                Country
                                <span>*</span>
                            </label>

                            <select
                                name="country"
                                value={formData.country}
                                onChange={handleChange}
                                required
                            >
                                <option value="">
                                    Select country
                                </option>

                                <option value="INDIA">
                                    India
                                </option>

                                <option value="USA">
                                    United States
                                </option>

                                <option value="UK">
                                    United Kingdom
                                </option>

                                <option value="CANADA">
                                    Canada
                                </option>

                                <option value="AUSTRALIA">
                                    Australia
                                </option>
                            </select>

                        </div>


                        <div className="form-field">

                            <label>
                                Postal Code
                            </label>

                            <input
                                type="text"
                                name="postalCode"
                                value={formData.postalCode}
                                onChange={handleChange}
                                placeholder="Enter postal code"
                            />

                        </div>

                    </div>

                </div>


                {/* PRIMARY CONTACT */}

                <div className="form-section">

                    <div className="section-header">

                        <div className="section-icon">
                            👤
                        </div>

                        <div>
                            <h2>Primary Contact</h2>
                            <p>
                                Person responsible for company communication
                            </p>
                        </div>

                    </div>


                    <div className="form-grid">

                        <div className="form-field">

                            <label>
                                Contact Person
                                <span>*</span>
                            </label>

                            <input
                                type="text"
                                name="contactPerson"
                                value={formData.contactPerson}
                                onChange={handleChange}
                                placeholder="Enter contact person"
                                required
                            />

                        </div>


                        <div className="form-field">

                            <label>
                                Contact Email
                                <span>*</span>
                            </label>

                            <input
                                type="email"
                                name="contactEmail"
                                value={formData.contactEmail}
                                onChange={handleChange}
                                placeholder="contact@example.com"
                                required
                            />

                        </div>


                        <div className="form-field">

                            <label>
                                Contact Phone
                            </label>

                            <input
                                type="tel"
                                name="contactPhone"
                                value={formData.contactPhone}
                                onChange={handleChange}
                                placeholder="Enter contact phone"
                            />

                        </div>


                        <div className="form-field full-width">

                            <label>
                                Company Description
                            </label>

                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Enter a short description about the company"
                                rows="4"
                            />

                        </div>

                    </div>

                </div>


                {/* FOOTER */}

                <div className="company-form-footer">

                    <button
                        type="button"
                        className="form-cancel-btn"
                        onClick={() => navigate(-1)}
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        className="form-save-btn"
                    >
                        Register Company
                    </button>

                </div>

            </form>

        </div>
    );
};

export default CompanyRegistration;