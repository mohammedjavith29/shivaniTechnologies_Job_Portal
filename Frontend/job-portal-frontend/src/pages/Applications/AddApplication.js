import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft, FiSave } from "react-icons/fi";
import "./AddApplication.css";

import { addApplication } from "../../services/applicationService";

const AddApplication = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    candidateName: "",
    email: "",
    phone: "",
    jobTitle: "",
    companyName: "",
    status: "Pending",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.candidateName.trim()) {
      alert("Please enter candidate name.");
      return;
    }

    if (!formData.email.trim()) {
      alert("Please enter email.");
      return;
    }

    if (!formData.jobTitle.trim()) {
      alert("Please enter job title.");
      return;
    }

    try {
      setLoading(true);

      await addApplication(formData);

      alert("Application added successfully.");

      navigate("/applications");
    } catch (error) {
      console.error("Error adding application:", error);

      const message =
        error?.response?.data?.message ||
        error?.response?.data ||
        "Failed to add application.";

      alert(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-application-page">
      <div className="add-application-container">

        {/* Header */}
        <div className="add-application-header">
          <div>
            <h1>Add Application</h1>
            <p>Create a new job application</p>
          </div>

          <button
            type="button"
            className="back-btn"
            onClick={() => navigate("/applications")}
          >
            <FiArrowLeft />
            Back
          </button>
        </div>

        {/* Form Card */}
        <div className="add-application-card">

          <form onSubmit={handleSubmit}>

            <div className="section-title">
              Application Information
            </div>

            <div className="form-grid">

              {/* Candidate Name */}
              <div className="form-group">
                <label>
                  Candidate Name <span>*</span>
                </label>

                <input
                  type="text"
                  name="candidateName"
                  value={formData.candidateName}
                  onChange={handleChange}
                  placeholder="Enter candidate name"
                />
              </div>

              {/* Email */}
              <div className="form-group">
                <label>
                  Email <span>*</span>
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter candidate email"
                />
              </div>

              {/* Phone */}
              <div className="form-group">
                <label>Phone</label>

                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                />
              </div>

              {/* Job */}
              <div className="form-group">
                <label>
                  Job Title <span>*</span>
                </label>

                <input
                  type="text"
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleChange}
                  placeholder="Enter job title"
                />
              </div>

              {/* Company */}
              <div className="form-group">
                <label>Company</label>

                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  placeholder="Enter company name"
                />
              </div>

              {/* Status */}
              <div className="form-group">
                <label>Status</label>

                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="Pending">Pending</option>
                  <option value="Shortlisted">Shortlisted</option>
                  <option value="Interview">Interview</option>
                  <option value="Selected">Selected</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>

            </div>

            {/* Actions */}
            <div className="form-actions">

              <button
                type="button"
                className="cancel-btn"
                onClick={() => navigate("/applications")}
                disabled={loading}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="save-btn"
                disabled={loading}
              >
                <FiSave />

                {loading
                  ? "Saving..."
                  : "Save Application"}
              </button>

            </div>

          </form>

        </div>
      </div>
    </div>
  );
};

export default AddApplication;