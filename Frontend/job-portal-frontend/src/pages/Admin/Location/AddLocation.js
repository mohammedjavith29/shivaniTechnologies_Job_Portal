import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addLocation } from "../../../services/locationService";
import "./AddLocation.css";

function AddLocation() {
  const navigate = useNavigate();

  const [location, setLocation] = useState({
    name: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setLocation({
      ...location,
      [e.target.name]: e.target.value,
    });

    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const locationName = location.name.trim();

    if (!locationName) {
      setError("Location name is required.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await addLocation({
        name: locationName,
      });

      alert("Location added successfully.");

      navigate("/locations");
    } catch (err) {
      console.error("Error adding location:", err);

      setError(
        err?.response?.data?.message ||
          "Unable to add location. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/locations");
  };

  return (
    <div className="add-location-page">

      {/* Breadcrumb */}
      <div className="add-location-breadcrumb">
        <span>Recruitment</span>
        <i className="bi bi-chevron-right"></i>
        <span>Locations</span>
        <i className="bi bi-chevron-right"></i>
        <strong>Add Location</strong>
      </div>

      {/* Page Header */}
      <div className="add-location-header">

        <div className="add-location-header-left">

          <div className="add-location-header-icon">
            <i className="bi bi-geo-alt"></i>
          </div>

          <div>
            <h1>Add Location</h1>

            <p>
              Create a new location for your recruitment system.
            </p>
          </div>

        </div>

        <button
          type="button"
          className="add-location-back-btn"
          onClick={handleCancel}
        >
          <i className="bi bi-arrow-left"></i>
          Back to Locations
        </button>

      </div>

      {/* Main Card */}
      <div className="add-location-card">

        {/* Card Header */}
        <div className="add-location-card-header">

          <div>
            <h2>Location Information</h2>

            <p>
              Enter the details below to create a new location.
            </p>
          </div>

          <div className="add-location-required-note">
            <span>*</span> Required fields
          </div>

        </div>

        {/* Form */}
        <form
          className="add-location-form"
          onSubmit={handleSubmit}
        >

          <div className="add-location-form-section">

            <div className="add-location-section-heading">

              <div className="add-location-section-icon">
                <i className="bi bi-pin-map"></i>
              </div>

              <div>
                <h3>Basic Details</h3>

                <p>
                  Provide the location name.
                </p>
              </div>

            </div>

            {/* Location Name */}
            <div className="add-location-form-group">

              <label htmlFor="location-name">
                Location Name
                <span className="required">*</span>
              </label>

              <div
                className={`add-location-input-wrapper ${
                  error ? "has-error" : ""
                }`}
              >

                <i className="bi bi-geo-alt input-icon"></i>

                <input
                  id="location-name"
                  type="text"
                  name="name"
                  value={location.name}
                  onChange={handleChange}
                  placeholder="Enter location name"
                  className="add-location-input"
                  autoComplete="off"
                />

              </div>

              <div className="add-location-help">
                Example: Bangalore, Mumbai, Chennai, Hyderabad
              </div>

              {error && (
                <div className="add-location-error">
                  <i className="bi bi-exclamation-circle"></i>
                  {error}
                </div>
              )}

            </div>

          </div>

          {/* Form Footer */}
          <div className="add-location-form-footer">

            <button
              type="button"
              className="add-location-cancel"
              onClick={handleCancel}
              disabled={loading}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="add-location-save"
              disabled={loading}
            >

              {loading ? (
                <>
                  <span className="add-location-spinner"></span>
                  Saving...
                </>
              ) : (
                <>
                  <i className="bi bi-check-lg"></i>
                  Save Location
                </>
              )}

            </button>

          </div>

        </form>

      </div>

      {/* Bottom Information */}
      <div className="add-location-info">

        <i className="bi bi-info-circle"></i>

        <span>
          Locations can be used when creating jobs and managing
          recruitment activities.
        </span>

      </div>

    </div>
  );
}

export default AddLocation;