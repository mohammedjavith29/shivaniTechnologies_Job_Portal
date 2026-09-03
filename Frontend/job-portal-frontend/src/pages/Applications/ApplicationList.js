import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getApplications,
  deleteApplication,
  addApplication,
} from "../../services/applicationService";
import "./ApplicationList.css";

const ApplicationList = () => {
  const navigate = useNavigate();

  const [applications, setApplications] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // Collapse / expand Add Application
  const [showAddForm, setShowAddForm] = useState(false);

  const [formData, setFormData] = useState({
    candidateName: "",
    email: "",
    phone: "",
    jobTitle: "",
    companyName: "",
    status: "Applied",
  });

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = async () => {
    try {
      setLoading(true);

      const response = await getApplications();

      const data = Array.isArray(response)
        ? response
        : response?.data || [];

      setApplications(data);
    } catch (error) {
      console.error("Error loading applications:", error);
      setApplications([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this application?")) {
      return;
    }

    try {
      await deleteApplication(id);
      loadApplications();
    } catch (error) {
      console.error("Delete application error:", error);
      alert("Failed to delete application.");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddApplication = async (e) => {
    e.preventDefault();

    try {
      await addApplication(formData);

      alert("Application added successfully!");

      setFormData({
        candidateName: "",
        email: "",
        phone: "",
        jobTitle: "",
        companyName: "",
        status: "Applied",
      });

      setShowAddForm(false);
      loadApplications();
    } catch (error) {
      console.error("Add application error:", error);
      alert("Failed to add application.");
    }
  };

  const filteredApplications = applications.filter((application) => {
    const candidate =
      application.candidateName ||
      application.candidate?.name ||
      application.candidate?.fullName ||
      application.name ||
      "";

    const email =
      application.email ||
      application.candidate?.email ||
      "";

    const job =
      application.jobTitle ||
      application.job?.title ||
      application.job?.jobTitle ||
      "";

    const company =
      application.companyName ||
      application.company?.name ||
      application.job?.company?.name ||
      "";

    const text = `${candidate} ${email} ${job} ${company}`.toLowerCase();

    return text.includes(search.toLowerCase());
  });

  const getCandidateName = (application) =>
    application.candidateName ||
    application.candidate?.name ||
    application.candidate?.fullName ||
    application.name ||
    "N/A";

  const getEmail = (application) =>
    application.email ||
    application.candidate?.email ||
    "N/A";

  const getPhone = (application) =>
    application.phone ||
    application.mobile ||
    application.candidate?.phone ||
    application.candidate?.mobile ||
    "N/A";

  const getJobTitle = (application) =>
    application.jobTitle ||
    application.job?.title ||
    application.job?.jobTitle ||
    "N/A";

  const getCompanyName = (application) =>
    application.companyName ||
    application.company?.name ||
    application.job?.company?.name ||
    "N/A";

  const getStatus = (application) =>
    application.status ||
    application.applicationStatus ||
    "Applied";

  return (
    <div className="application-page">

      {/* HEADER */}
      <div className="application-header">
        <div>
          <h1>Application List</h1>
          <p>Manage and review all job applications</p>
        </div>

        <button
          className={`add-application-btn ${
            showAddForm ? "active" : ""
          }`}
          onClick={() => setShowAddForm(!showAddForm)}
        >
          <span>{showAddForm ? "−" : "+"}</span>
          {showAddForm ? "Close Form" : "Add Application"}
        </button>
      </div>

      {/* COLLAPSIBLE ADD APPLICATION */}
      <div className={`add-application-wrapper ${
        showAddForm ? "open" : ""
      }`}>
        <div className="add-application-card">

          <div className="form-title">
            <div>
              <h2>Add New Application</h2>
              <p>Enter candidate application details</p>
            </div>
          </div>

          <form onSubmit={handleAddApplication}>

            <div className="form-grid">

              <div className="form-group">
                <label>Candidate Name</label>
                <input
                  type="text"
                  name="candidateName"
                  value={formData.candidateName}
                  onChange={handleChange}
                  placeholder="Enter candidate name"
                  required
                />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter email address"
                  required
                />
              </div>

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

              <div className="form-group">
                <label>Job Title</label>
                <input
                  type="text"
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleChange}
                  placeholder="Enter job title"
                  required
                />
              </div>

              <div className="form-group">
                <label>Company Name</label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  placeholder="Enter company name"
                />
              </div>

              <div className="form-group">
                <label>Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="Applied">Applied</option>
                  <option value="Interview">Interview</option>
                  <option value="Selected">Selected</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>

            </div>

            <div className="form-actions">
              <button
                type="button"
                className="cancel-btn"
                onClick={() => setShowAddForm(false)}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="save-application-btn"
              >
                Save Application
              </button>
            </div>

          </form>
        </div>
      </div>

      {/* APPLICATION LIST CARD */}
      <div className="application-card">

        {/* TOOLBAR */}
        <div className="application-toolbar">

          <div className="search-box">
            <span className="search-icon">⌕</span>

            <input
              type="text"
              placeholder="Search applications..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <button
            className="refresh-btn"
            onClick={loadApplications}
          >
            ↻ Refresh
          </button>

        </div>

        {/* TABLE */}
        {loading ? (
          <div className="application-loading">
            <div className="spinner"></div>
            <p>Loading applications...</p>
          </div>
        ) : (
          <>
            <div className="table-container">

              <table className="application-table">

                <thead>
                  <tr>
                    <th>#</th>
                    <th>Candidate</th>
                    <th>Contact</th>
                    <th>Job</th>
                    <th>Company</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>

                  {filteredApplications.length === 0 ? (
                    <tr>
                      <td
                        colSpan="7"
                        className="empty-state"
                      >
                        <div className="empty-icon">📋</div>
                        <strong>No applications found</strong>
                        <span>
                          Try another search or add a new application.
                        </span>
                      </td>
                    </tr>
                  ) : (
                    filteredApplications.map((application, index) => {

                      const id =
                        application.id ||
                        application.applicationId;

                      const candidateName =
                        getCandidateName(application);

                      const status =
                        getStatus(application);

                      return (
                        <tr key={id || index}>

                          <td className="number-cell">
                            {index + 1}
                          </td>

                          <td>
                            <div className="candidate-cell">
                              <div className="avatar">
                                {candidateName
                                  .charAt(0)
                                  .toUpperCase()}
                              </div>

                              <div>
                                <strong>
                                  {candidateName}
                                </strong>

                                <small>
                                  ID: {id || "N/A"}
                                </small>
                              </div>
                            </div>
                          </td>

                          <td>
                            <div className="contact-cell">

                              <span>
                                ✉ {getEmail(application)}
                              </span>

                              <span className="phone">
                                ☎ {getPhone(application)}
                              </span>

                            </div>
                          </td>

                          <td>
                            <span className="job-cell">
                              💼 {getJobTitle(application)}
                            </span>
                          </td>

                          <td>
                            <span className="company-cell">
                              {getCompanyName(application)}
                            </span>
                          </td>

                          <td>
                            <span
                              className={`status-badge status-${String(
                                status
                              )
                                .toLowerCase()
                                .replace(/\s+/g, "-")}`}
                            >
                              {status}
                            </span>
                          </td>

                          <td>
                            <div className="action-buttons">

                              <button
                                className="edit-btn"
                                title="Edit Application"
                                onClick={() =>
                                  navigate(
                                    `/applications/edit/${id}`
                                  )
                                }
                              >
                                ✎
                              </button>

                              <button
                                className="delete-btn"
                                title="Delete Application"
                                onClick={() =>
                                  handleDelete(id)
                                }
                              >
                                🗑
                              </button>

                            </div>
                          </td>

                        </tr>
                      );
                    })
                  )}

                </tbody>

              </table>

            </div>

            <div className="application-footer">
              Showing{" "}
              <strong>
                {filteredApplications.length}
              </strong>{" "}
              of{" "}
              <strong>
                {applications.length}
              </strong>{" "}
              applications
            </div>
          </>
        )}

      </div>
    </div>
  );
};

export default ApplicationList;