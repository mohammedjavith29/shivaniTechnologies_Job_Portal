import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getInterviews,
  deleteInterview,
  addInterview,
} from "../../services/interviewService";
import "./InterviewList.css";

const InterviewList = () => {
  const navigate = useNavigate();

  const [interviews, setInterviews] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);

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

  useEffect(() => {
    loadInterviews();
  }, []);

  const loadInterviews = async () => {
    try {
      setLoading(true);

      const response = await getInterviews();

      const data = Array.isArray(response)
        ? response
        : response?.data || response?.data?.content || [];

      setInterviews(data);
    } catch (error) {
      console.error("Error loading interviews:", error);
      setInterviews([]);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddInterview = async (e) => {
    e.preventDefault();

    try {
      await addInterview(formData);

      alert("Interview added successfully!");

      setFormData({
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

      setShowAddForm(false);
      loadInterviews();
    } catch (error) {
      console.error("Add interview error:", error);
      alert("Failed to add interview.");
    }
  };

  const handleDelete = async (id) => {
    if (!id) {
      alert("Interview ID not found.");
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to delete this interview?"
    );

    if (!confirmed) return;

    try {
      await deleteInterview(id);

      alert("Interview deleted successfully.");

      loadInterviews();
    } catch (error) {
      console.error("Delete interview error:", error);
      alert("Failed to delete interview.");
    }
  };

  const getId = (item) =>
    item.interviewId ||
    item.id;

  const getCompany = (item) =>
    item.companyName ||
    item.company?.companyName ||
    item.company?.name ||
    item.companyId ||
    "N/A";

  const getDesignation = (item) =>
    item.designationName ||
    item.designation?.designationName ||
    item.designation?.name ||
    item.designationId ||
    "N/A";

  const getCategory = (item) =>
    item.categoryName ||
    item.category?.categoryName ||
    item.category?.name ||
    item.categoryId ||
    "N/A";

  const getLocation = (item) =>
    item.locationName ||
    item.location?.locationName ||
    item.location?.name ||
    item.locationId ||
    "N/A";

  const getDate = (item) =>
    item.interviewDate ||
    item.date ||
    "N/A";

  const getTime = (item) =>
    item.interviewTime ||
    item.time ||
    "N/A";

  const getMode = (item) =>
    item.interviewMode ||
    item.mode ||
    "N/A";

  const getStatus = (item) =>
    item.status ||
    "SCHEDULED";

  const filteredInterviews = interviews.filter((item) => {
    const searchText = `
      ${getCompany(item)}
      ${getDesignation(item)}
      ${getCategory(item)}
      ${getLocation(item)}
      ${getMode(item)}
      ${getStatus(item)}
    `.toLowerCase();

    return searchText.includes(search.toLowerCase());
  });

  return (
    <div className="interview-page">

      {/* ================= HEADER ================= */}

      <div className="interview-header">

        <div>
          <div className="breadcrumb">
            Dashboard <span>›</span> Interviews
          </div>

          <h1>Interview List</h1>

          <p>
            Schedule, manage and track candidate interviews
          </p>
        </div>

        <button
          className={`add-interview-btn ${
            showAddForm ? "active" : ""
          }`}
          onClick={() => setShowAddForm(!showAddForm)}
        >
          <span>
            {showAddForm ? "−" : "+"}
          </span>

          {showAddForm
            ? "Close Form"
            : "Add Interview"}
        </button>

      </div>

      {/* ================= COLLAPSIBLE FORM ================= */}

      <div
        className={`add-interview-wrapper ${
          showAddForm ? "open" : ""
        }`}
      >
        <div className="add-interview-card">

          <div className="form-header">

            <div className="form-header-icon">
              📅
            </div>

            <div>
              <h2>Schedule New Interview</h2>

              <p>
                Enter the interview details below
              </p>
            </div>

          </div>

          <form onSubmit={handleAddInterview}>

            <div className="form-grid">

              {/* DATE */}

              <div className="form-group">
                <label>
                  Interview Date
                  <span>*</span>
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

              <div className="form-group">
                <label>
                  Interview Time
                  <span>*</span>
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

              <div className="form-group">
                <label>
                  Company ID
                  <span>*</span>
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

              <div className="form-group">
                <label>
                  Designation ID
                  <span>*</span>
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

              <div className="form-group">
                <label>
                  Category ID
                  <span>*</span>
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

              <div className="form-group">
                <label>
                  Location ID
                  <span>*</span>
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

              <div className="form-group">
                <label>
                  Interview Mode
                  <span>*</span>
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

              <div className="form-group">
                <label>
                  Status
                  <span>*</span>
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

              <div className="form-group full-width">
                <label>Description</label>

                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter interview details..."
                  rows="4"
                />
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
                className="save-interview-btn"
              >
                Save Interview
              </button>

            </div>

          </form>

        </div>
      </div>

      {/* ================= MAIN CARD ================= */}

      <div className="interview-card">

        {/* CARD HEADER */}

        <div className="card-top">

          <div>
            <h2>Interviews</h2>

            <p>
              View and manage all scheduled interviews
            </p>
          </div>

          <div className="total-count">
            {filteredInterviews.length} Interviews
          </div>

        </div>

        {/* TOOLBAR */}

        <div className="interview-toolbar">

          <div className="search-box">

            <span className="search-icon">
              ⌕
            </span>

            <input
              type="text"
              placeholder="Search company, designation, location..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

            {search && (
              <button
                className="clear-search"
                onClick={() => setSearch("")}
              >
                ×
              </button>
            )}

          </div>

          <button
            className="refresh-btn"
            onClick={loadInterviews}
          >
            ↻ Refresh
          </button>

        </div>

        {/* ================= TABLE ================= */}

        {loading ? (

          <div className="loading-box">
            <div className="spinner"></div>
            <p>Loading interviews...</p>
          </div>

        ) : (

          <div className="table-container">

            <table className="interview-table">

              <thead>

                <tr>
                  <th>#</th>
                  <th>Date & Time</th>
                  <th>Company</th>
                  <th>Designation</th>
                  <th>Category</th>
                  <th>Location</th>
                  <th>Mode</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>

              </thead>

              <tbody>

                {filteredInterviews.length === 0 ? (

                  <tr>

                    <td
                      colSpan="9"
                      className="empty-state"
                    >

                      <div className="empty-icon">
                        📅
                      </div>

                      <strong>
                        No interviews found
                      </strong>

                      <span>
                        Add an interview to get started.
                      </span>

                    </td>

                  </tr>

                ) : (

                  filteredInterviews.map(
                    (item, index) => {

                      const id = getId(item);

                      const status =
                        getStatus(item);

                      return (

                        <tr key={id || index}>

                          {/* NUMBER */}

                          <td className="number-cell">
                            {index + 1}
                          </td>

                          {/* DATE */}

                          <td>

                            <div className="date-cell">

                              <strong>
                                {getDate(item)}
                              </strong>

                              <span>
                                🕐 {getTime(item)}
                              </span>

                            </div>

                          </td>

                          {/* COMPANY */}

                          <td>

                            <div className="company-cell">

                              <div className="company-avatar">
                                {String(
                                  getCompany(item)
                                )
                                  .charAt(0)
                                  .toUpperCase()}
                              </div>

                              <div>
                                <strong>
                                  {getCompany(item)}
                                </strong>

                                <small>
                                  Interview #{id || "N/A"}
                                </small>
                              </div>

                            </div>

                          </td>

                          {/* DESIGNATION */}

                          <td>
                            <span className="designation-cell">
                              {getDesignation(item)}
                            </span>
                          </td>

                          {/* CATEGORY */}

                          <td>
                            <span className="category-cell">
                              {getCategory(item)}
                            </span>
                          </td>

                          {/* LOCATION */}

                          <td>

                            <span className="location-cell">
                              📍 {getLocation(item)}
                            </span>

                          </td>

                          {/* MODE */}

                          <td>

                            <span
                              className={`mode-badge mode-${String(
                                getMode(item)
                              ).toLowerCase()}`}
                            >
                              {getMode(item)}
                            </span>

                          </td>

                          {/* STATUS */}

                          <td>

                            <span
                              className={`interview-status status-${String(
                                status
                              )
                                .toLowerCase()
                                .replace(
                                  /\s+/g,
                                  "-"
                                )}`}
                            >
                              <span className="status-dot"></span>

                              {status}
                            </span>

                          </td>

                          {/* ACTIONS */}

                          <td>

                            <div className="action-buttons">

                              <button
                                className="edit-btn"
                                title="Edit Interview"
                                onClick={() =>
                                  navigate(
                                    `/interviews/edit/${id}`
                                  )
                                }
                              >
                                ✎
                              </button>

                              <button
                                className="delete-btn"
                                title="Delete Interview"
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
                    }
                  )

                )}

              </tbody>

            </table>

          </div>

        )}

        {/* FOOTER */}

        {!loading && (
          <div className="interview-footer">

            Showing{" "}
            <strong>
              {filteredInterviews.length}
            </strong>{" "}
            of{" "}
            <strong>
              {interviews.length}
            </strong>{" "}
            interviews

          </div>
        )}

      </div>

    </div>
  );
};

export default InterviewList;