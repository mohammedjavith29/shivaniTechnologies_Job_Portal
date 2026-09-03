import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addInterview } from "../../services/interviewService";
import "./AddInterview.css";

const AddInterview = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    interviewDate: "",
    interviewTime: "",
    companyId: "",
    designationId: "",
    categoryId: "",
    locationId: "",
    interviewMode: "ONLINE",
    status: "SCHEDULED",
    description: "",
  });

  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      await addInterview(formData);

      alert("Interview scheduled successfully!");

      navigate("/interviews");
    } catch (error) {
      console.error("Error scheduling interview:", error);

      alert(
        error?.response?.data?.message ||
          "Failed to schedule interview."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="add-interview-page">

      {/* HEADER */}

      <div className="add-interview-header">

        <div>
          <div className="breadcrumb">
            Interviews <span>›</span> Schedule Interview
          </div>

          <h1>Schedule Interview</h1>

          <p>
            Create and schedule a new candidate interview
          </p>
        </div>

        <button
          className="back-btn"
          onClick={() => navigate("/interviews")}
        >
          ← Back to Interviews
        </button>

      </div>

      {/* FORM CARD */}

      <div className="schedule-card">

        <div className="schedule-card-header">

          <div className="calendar-icon">
            📅
          </div>

          <div>
            <h2>Interview Details</h2>

            <p>
              Fill in the details to schedule the interview
            </p>
          </div>

        </div>

        <form onSubmit={handleSubmit}>

          <div className="schedule-form-grid">

            {/* DATE */}

            <div className="form-field">
              <label>
                Interview Date <span>*</span>
              </label>

              <input
                type="date"
                name="interviewDate"
                value={formData.interviewDate}
                onChange={handleChange}
                required
              />
            </div>

            {/* TIME */}

            <div className="form-field">
              <label>
                Interview Time <span>*</span>
              </label>

              <input
                type="time"
                name="interviewTime"
                value={formData.interviewTime}
                onChange={handleChange}
                required
              />
            </div>

            {/* COMPANY */}

            <div className="form-field">
              <label>
                Company ID <span>*</span>
              </label>

              <input
                type="number"
                name="companyId"
                value={formData.companyId}
                onChange={handleChange}
                placeholder="Enter company ID"
                required
              />
            </div>

            {/* DESIGNATION */}

            <div className="form-field">
              <label>
                Designation ID <span>*</span>
              </label>

              <input
                type="number"
                name="designationId"
                value={formData.designationId}
                onChange={handleChange}
                placeholder="Enter designation ID"
                required
              />
            </div>

            {/* CATEGORY */}

            <div className="form-field">
              <label>
                Category ID <span>*</span>
              </label>

              <input
                type="number"
                name="categoryId"
                value={formData.categoryId}
                onChange={handleChange}
                placeholder="Enter category ID"
                required
              />
            </div>

            {/* LOCATION */}

            <div className="form-field">
              <label>
                Location ID <span>*</span>
              </label>

              <input
                type="number"
                name="locationId"
                value={formData.locationId}
                onChange={handleChange}
                placeholder="Enter location ID"
                required
              />
            </div>

            {/* MODE */}

            <div className="form-field">
              <label>
                Interview Mode <span>*</span>
              </label>

              <select
                name="interviewMode"
                value={formData.interviewMode}
                onChange={handleChange}
                required
              >
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

            {/* STATUS */}

            <div className="form-field">
              <label>
                Status <span>*</span>
              </label>

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
              >
                <option value="SCHEDULED">
                  Scheduled
                </option>

                <option value="COMPLETED">
                  Completed
                </option>

                <option value="CANCELLED">
                  Cancelled
                </option>

                <option value="RESCHEDULED">
                  Rescheduled
                </option>
              </select>
            </div>

            {/* DESCRIPTION */}

            <div className="form-field full">
              <label>
                Description
              </label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter interview notes or additional information..."
                rows="5"
              />
            </div>

          </div>

          {/* ACTIONS */}

          <div className="schedule-actions">

            <button
              type="button"
              className="cancel-button"
              onClick={() => navigate("/interviews")}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="schedule-button"
              disabled={saving}
            >
              {saving
                ? "Scheduling..."
                : "Schedule Interview"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default AddInterview;