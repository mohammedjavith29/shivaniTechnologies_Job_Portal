import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./AddUser.css";

function AddUser() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    username: "",
    password: "",
    role: "",
    status: "ACTIVE",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must contain at least 6 characters";
    }

    if (!formData.role) {
      newErrors.role = "Please select a role";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    console.log("New User:", formData);

    alert("User added successfully!");

    navigate("/users");
  };

  const handleCancel = () => {
    navigate("/users");
  };

  return (
    <div className="add-user-page">

      {/* Page Header */}
      <div className="add-user-header">
        <div>
          <div className="add-user-breadcrumb">
            <Link to="/users">Users</Link>
            <span>/</span>
            <span>Add User</span>
          </div>

          <h1>Add User</h1>
          <p>Create a new user account and assign access permissions.</p>
        </div>

        <Link to="/users" className="back-users-btn">
          <i className="bi bi-arrow-left"></i>
          Back to Users
        </Link>
      </div>

      {/* Form Card */}
      <div className="add-user-card">

        <form onSubmit={handleSubmit}>

          {/* Basic Information */}
          <div className="form-section">

            <div className="section-heading">
              <div className="section-icon">
                <i className="bi bi-person"></i>
              </div>

              <div>
                <h2>Basic Information</h2>
                <p>Enter the user's personal information.</p>
              </div>
            </div>

            <div className="form-grid">

              <div className="form-group">
                <label>
                  First Name <span>*</span>
                </label>

                <input
                  type="text"
                  name="firstName"
                  placeholder="Enter first name"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={errors.firstName ? "input-error" : ""}
                />

                {errors.firstName && (
                  <small className="error-text">
                    {errors.firstName}
                  </small>
                )}
              </div>

              <div className="form-group">
                <label>
                  Last Name <span>*</span>
                </label>

                <input
                  type="text"
                  name="lastName"
                  placeholder="Enter last name"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={errors.lastName ? "input-error" : ""}
                />

                {errors.lastName && (
                  <small className="error-text">
                    {errors.lastName}
                  </small>
                )}
              </div>

              <div className="form-group">
                <label>
                  Email Address <span>*</span>
                </label>

                <div className="input-with-icon">
                  <i className="bi bi-envelope"></i>

                  <input
                    type="email"
                    name="email"
                    placeholder="Enter email address"
                    value={formData.email}
                    onChange={handleChange}
                    className={errors.email ? "input-error" : ""}
                  />
                </div>

                {errors.email && (
                  <small className="error-text">
                    {errors.email}
                  </small>
                )}
              </div>

              <div className="form-group">
                <label>
                  Phone Number <span>*</span>
                </label>

                <div className="input-with-icon">
                  <i className="bi bi-telephone"></i>

                  <input
                    type="text"
                    name="phone"
                    placeholder="Enter phone number"
                    value={formData.phone}
                    onChange={handleChange}
                    className={errors.phone ? "input-error" : ""}
                  />
                </div>

                {errors.phone && (
                  <small className="error-text">
                    {errors.phone}
                  </small>
                )}
              </div>

            </div>
          </div>

          {/* Login Information */}
          <div className="form-section">

            <div className="section-heading">
              <div className="section-icon">
                <i className="bi bi-shield-lock"></i>
              </div>

              <div>
                <h2>Login Information</h2>
                <p>Set the credentials used by this user to sign in.</p>
              </div>
            </div>

            <div className="form-grid">

              <div className="form-group">
                <label>
                  Username <span>*</span>
                </label>

                <div className="input-with-icon">
                  <i className="bi bi-person-circle"></i>

                  <input
                    type="text"
                    name="username"
                    placeholder="Enter username"
                    value={formData.username}
                    onChange={handleChange}
                    className={errors.username ? "input-error" : ""}
                  />
                </div>

                {errors.username && (
                  <small className="error-text">
                    {errors.username}
                  </small>
                )}
              </div>

              <div className="form-group">
                <label>
                  Password <span>*</span>
                </label>

                <div className="input-with-icon">
                  <i className="bi bi-lock"></i>

                  <input
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    value={formData.password}
                    onChange={handleChange}
                    className={errors.password ? "input-error" : ""}
                  />
                </div>

                {errors.password && (
                  <small className="error-text">
                    {errors.password}
                  </small>
                )}
              </div>

            </div>
          </div>

          {/* Access Information */}
          <div className="form-section">

            <div className="section-heading">
              <div className="section-icon">
                <i className="bi bi-person-badge"></i>
              </div>

              <div>
                <h2>Access Information</h2>
                <p>Assign the user's role and account status.</p>
              </div>
            </div>

            <div className="form-grid">

              <div className="form-group">
                <label>
                  Role <span>*</span>
                </label>

                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className={errors.role ? "input-error" : ""}
                >
                  <option value="">Select role</option>
                  <option value="ADMIN">Admin</option>
                  <option value="EMPLOYER">Employer</option>
                  <option value="EMPLOYEE">Employee</option>
                  <option value="CANDIDATE">Candidate</option>
                </select>

                {errors.role && (
                  <small className="error-text">
                    {errors.role}
                  </small>
                )}
              </div>

              <div className="form-group">
                <label>Status</label>

                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="ACTIVE">Active</option>
                  <option value="INACTIVE">Inactive</option>
                  <option value="BLOCKED">Blocked</option>
                </select>
              </div>

            </div>
          </div>

          {/* Form Footer */}
          <div className="form-footer">

            <button
              type="button"
              className="cancel-user-btn"
              onClick={handleCancel}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="save-user-btn"
            >
              <i className="bi bi-check-lg"></i>
              Save User
            </button>

          </div>

        </form>
      </div>
    </div>
  );
}

export default AddUser;