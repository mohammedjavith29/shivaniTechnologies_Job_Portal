import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CompanyVerification.css";

const CompanyVerification = () => {

    const navigate = useNavigate();

    const [verificationStatus, setVerificationStatus] =
        useState("PENDING");

    const [formData, setFormData] = useState({
        companyName: "",
        registrationNumber: "",
        companyEmail: "",
        contactPerson: "",
        contactPhone: "",
        verificationType: "BUSINESS_REGISTRATION",
        registrationDocument: "",
        taxDocument: "",
        website: "",
        remarks: ""
    });

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {

        e.preventDefault();

        console.log("Company Verification:", formData);

        setVerificationStatus("VERIFIED");

        alert("Company verification submitted successfully.");
    };

    return (

        <div className="company-verification-page">

            {/* PAGE HEADER */}

            <div className="verification-page-header">

                <div>

                    <div className="verification-breadcrumb">
                        Home
                        <span>/</span>
                        Company Verification
                    </div>

                    <h1>Company Verification</h1>

                    <p>
                        Verify company information and business documents
                    </p>

                </div>

            </div>


            {/* STATUS BAR */}

            <div className="verification-status-card">

                <div className="verification-status-left">

                    <div className="verification-status-icon">
                        {verificationStatus === "VERIFIED"
                            ? "✓"
                            : "!"}
                    </div>

                    <div>

                        <h3>
                            Verification Status
                        </h3>

                        <p>
                            {verificationStatus === "VERIFIED"
                                ? "Company verification has been completed."
                                : "This company is waiting for verification."}
                        </p>

                    </div>

                </div>

                <span
                    className={`verification-badge ${
                        verificationStatus === "VERIFIED"
                            ? "verified"
                            : "pending"
                    }`}
                >
                    {verificationStatus}
                </span>

            </div>


            {/* MAIN FORM */}

            <form
                className="verification-form-card"
                onSubmit={handleSubmit}
            >

                {/* COMPANY DETAILS */}

                <div className="verification-section">

                    <div className="verification-section-header">

                        <div className="verification-section-icon">
                            🏢
                        </div>

                        <div>
                            <h2>Company Details</h2>

                            <p>
                                Verify the basic company information
                            </p>
                        </div>

                    </div>


                    <div className="verification-grid">

                        <div className="verification-field">

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


                        <div className="verification-field">

                            <label>
                                Registration Number
                                <span>*</span>
                            </label>

                            <input
                                type="text"
                                name="registrationNumber"
                                value={formData.registrationNumber}
                                onChange={handleChange}
                                placeholder="Enter registration number"
                                required
                            />

                        </div>


                        <div className="verification-field">

                            <label>
                                Company Email
                                <span>*</span>
                            </label>

                            <input
                                type="email"
                                name="companyEmail"
                                value={formData.companyEmail}
                                onChange={handleChange}
                                placeholder="company@example.com"
                                required
                            />

                        </div>


                        <div className="verification-field">

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


                {/* CONTACT PERSON */}

                <div className="verification-section">

                    <div className="verification-section-header">

                        <div className="verification-section-icon">
                            👤
                        </div>

                        <div>
                            <h2>Authorized Contact</h2>

                            <p>
                                Person responsible for company verification
                            </p>
                        </div>

                    </div>


                    <div className="verification-grid">

                        <div className="verification-field">

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


                        <div className="verification-field">

                            <label>
                                Contact Phone
                                <span>*</span>
                            </label>

                            <input
                                type="tel"
                                name="contactPhone"
                                value={formData.contactPhone}
                                onChange={handleChange}
                                placeholder="Enter contact phone"
                                required
                            />

                        </div>

                    </div>

                </div>


                {/* DOCUMENT VERIFICATION */}

                <div className="verification-section">

                    <div className="verification-section-header">

                        <div className="verification-section-icon">
                            📄
                        </div>

                        <div>
                            <h2>Document Verification</h2>

                            <p>
                                Provide the documents required to verify the company
                            </p>
                        </div>

                    </div>


                    <div className="verification-grid">

                        <div className="verification-field">

                            <label>
                                Verification Type
                                <span>*</span>
                            </label>

                            <select
                                name="verificationType"
                                value={formData.verificationType}
                                onChange={handleChange}
                                required
                            >

                                <option value="BUSINESS_REGISTRATION">
                                    Business Registration
                                </option>

                                <option value="GST">
                                    GST Verification
                                </option>

                                <option value="TAX">
                                    Tax Verification
                                </option>

                                <option value="OTHER">
                                    Other
                                </option>

                            </select>

                        </div>


                        <div className="verification-field">

                            <label>
                                Registration Document
                            </label>

                            <div className="file-input-wrapper">

                                <input
                                    type="file"
                                    name="registrationDocument"
                                    accept=".pdf,.jpg,.jpeg,.png"
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            registrationDocument:
                                                e.target.files[0]
                                                    ?.name || ""
                                        })
                                    }
                                />

                            </div>

                            {formData.registrationDocument && (

                                <small className="selected-file">
                                    Selected: {formData.registrationDocument}
                                </small>

                            )}

                        </div>


                        <div className="verification-field">

                            <label>
                                Tax / GST Document
                            </label>

                            <div className="file-input-wrapper">

                                <input
                                    type="file"
                                    name="taxDocument"
                                    accept=".pdf,.jpg,.jpeg,.png"
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            taxDocument:
                                                e.target.files[0]
                                                    ?.name || ""
                                        })
                                    }
                                />

                            </div>

                            {formData.taxDocument && (

                                <small className="selected-file">
                                    Selected: {formData.taxDocument}
                                </small>

                            )}

                        </div>


                        <div className="verification-field">

                            <label>
                                Verification Result
                            </label>

                            <select
                                value={verificationStatus}
                                onChange={(e) =>
                                    setVerificationStatus(e.target.value)
                                }
                            >

                                <option value="PENDING">
                                    Pending
                                </option>

                                <option value="VERIFIED">
                                    Verified
                                </option>

                                <option value="REJECTED">
                                    Rejected
                                </option>

                            </select>

                        </div>


                        <div className="verification-field full-width">

                            <label>
                                Verification Remarks
                            </label>

                            <textarea
                                name="remarks"
                                value={formData.remarks}
                                onChange={handleChange}
                                rows="4"
                                placeholder="Enter verification remarks or additional information"
                            />

                        </div>

                    </div>

                </div>


                {/* VERIFICATION CHECKLIST */}

                <div className="verification-section">

                    <div className="verification-section-header">

                        <div className="verification-section-icon">
                            ✓
                        </div>

                        <div>
                            <h2>Verification Checklist</h2>

                            <p>
                                Confirm that the company information has been reviewed
                            </p>
                        </div>

                    </div>


                    <div className="verification-checklist">

                        <label className="check-item">

                            <input
                                type="checkbox"
                                required
                            />

                            <span>
                                Company registration details have been reviewed
                            </span>

                        </label>


                        <label className="check-item">

                            <input
                                type="checkbox"
                                required
                            />

                            <span>
                                Company contact information has been verified
                            </span>

                        </label>


                        <label className="check-item">

                            <input
                                type="checkbox"
                                required
                            />

                            <span>
                                Submitted documents have been reviewed
                            </span>

                        </label>

                    </div>

                </div>


                {/* FOOTER */}

                <div className="verification-form-footer">

                    <button
                        type="button"
                        className="verification-cancel-btn"
                        onClick={() => navigate(-1)}
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        className="verification-submit-btn"
                    >
                        Submit Verification
                    </button>

                </div>

            </form>

        </div>
    );
};

export default CompanyVerification;