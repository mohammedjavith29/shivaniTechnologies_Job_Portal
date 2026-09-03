import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiArrowLeft,
  FiSave,
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiBriefcase,
  FiGlobe,
  FiFileText,
} from "react-icons/fi";

import { addEmployer } from "../../services/employerService";

import "./AddEmployer.css";

const AddEmployer = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    companyName: "",
    address: "",
    city: "",
    state: "",
    country: "",
    website: "",
    description: "",
    status: "Active",
  });

  const [loading, setLoading] = useState(false);

  // ============================
  // HANDLE INPUT
  // ============================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ============================
  // SUBMIT
  // ============================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      alert("Please enter employer name.");
      return;
    }

    if (!formData.email.trim()) {
      alert("Please enter email address.");
      return;
    }

    if (!formData.phone.trim()) {
      alert("Please enter phone number.");
      return;
    }

    try {
      setLoading(true);

      await addEmployer(formData);

      alert("Employer added successfully!");

      navigate("/employers");
    } catch (error) {
      console.error("Error adding employer:", error);

      const message =
        error?.response?.data?.message ||
        error?.response?.data ||
        "Failed to add employer.";

      alert(message);
    } finally {
      setLoading(false);
    }
  };

  // ============================
  // CANCEL
  // ============================
  const handleCancel = () => {
    navigate("/employers");
  };

  return (
    <div className="add-employer-page">

      {/* ============================
          HEADER
      ============================ */}
      <div className="add-employer-header">

        <div className="header-left">

          <button
            type="button"
            className="back-button"
            onClick={handleCancel}
            title="Back"
          >
            <FiArrowLeft size={20} />
          </button>

          <div>
            <h1>Add Employer</h1>

            <p>
              Create a new employer account
            </p>
          </div>

        </div>

      </div>


      {/* ============================
          FORM CARD
      ============================ */}
      <form
        className="employer-form"
        onSubmit={handleSubmit}
      >

        {/* ============================
            BASIC INFORMATION
        ============================ */}
        <div className="form-section">

          <div className="section-heading">

            <div className="section-icon">
              <FiUser size={20} />
            </div>

            <div>
              <h2>Basic Information</h2>
              <p>
                Enter the employer's basic details
              </p>
            </div>

          </div>


          <div className="form-grid">

            {/* NAME */}
            <div className="form-group">

              <label>
                Employer Name
                <span>*</span>
              </label>

              <div className="input-wrapper">
                <FiUser size={17} />

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter employer name"
                  required
                />
              </div>

            </div>


            {/* COMPANY */}
            <div className="form-group">

              <label>
                Company Name
              </label>

              <div className="input-wrapper">
                <FiBriefcase size={17} />

                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  placeholder="Enter company name"
                />
              </div>

            </div>


            {/* EMAIL */}
            <div className="form-group">

              <label>
                Email Address
                <span>*</span>
              </label>

              <div className="input-wrapper">
                <FiMail size={17} />

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="example@company.com"
                  required
                />
              </div>

            </div>


            {/* PHONE */}
            <div className="form-group">

              <label>
                Phone Number
                <span>*</span>
              </label>

              <div className="input-wrapper">
                <FiPhone size={17} />

                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                  required
                />
              </div>

            </div>


            {/* WEBSITE */}
            <div className="form-group">

              <label>
                Website
              </label>

              <div className="input-wrapper">
                <FiGlobe size={17} />

                <input
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  placeholder="https://example.com"
                />
              </div>

            </div>


            {/* STATUS */}
            <div className="form-group">

              <label>
                Status
              </label>

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="Active">
                  Active
                </option>

                <option value="Inactive">
                  Inactive
                </option>

                <option value="Pending">
                  Pending
                </option>
              </select>

            </div>

          </div>

        </div>


        {/* ============================
            LOCATION
        ============================ */}
        <div className="form-section">

          <div className="section-heading">

            <div className="section-icon">
              <FiMapPin size={20} />
            </div>

            <div>
              <h2>Location</h2>

              <p>
                Enter the employer's location
              </p>
            </div>

          </div>


          <div className="form-grid">

            {/* ADDRESS */}
            <div className="form-group full-width">

              <label>
                Address
              </label>

              <div className="input-wrapper">
                <FiMapPin size={17} />

                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter complete address"
                />
              </div>

            </div>


            {/* CITY */}
            <div className="form-group">

              <label>
                City
              </label>

              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="Enter city"
              />

            </div>


            {/* STATE */}
            <div className="form-group">

              <label>
                State
              </label>

              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                placeholder="Enter state"
              />

            </div>


            {/* COUNTRY */}
            <div className="form-group">

              <label>
                Country
              </label>

              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                placeholder="Enter country"
              />

            </div>

          </div>

        </div>


        {/* ============================
            DESCRIPTION
        ============================ */}
        <div className="form-section">

          <div className="section-heading">

            <div className="section-icon">
              <FiFileText size={20} />
            </div>

            <div>
              <h2>Additional Information</h2>

              <p>
                Add a short description about the employer
              </p>
            </div>

          </div>


          <div className="form-group">

            <label>
              Description
            </label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter employer or company description..."
              rows="5"
            />

          </div>

        </div>


        {/* ============================
            ACTIONS
        ============================ */}
        <div className="form-actions">

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
            <FiSave size={18} />

            {loading
              ? "Saving..."
              : "Save Employer"}
          </button>

        </div>

      </form>

    </div>
  );
};

export default AddEmployer;