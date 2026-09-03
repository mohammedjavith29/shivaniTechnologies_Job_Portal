import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiPlus,
  FiSearch,
  FiEdit2,
  FiTrash2,
  FiRefreshCw,
  FiUsers,
  FiMapPin,
  FiMail,
  FiPhone,
} from "react-icons/fi";

import {
  getEmployers,
  deleteEmployer,
} from "../../services/employerService";

import "./EmployerList.css";

const EmployerList = () => {
  const navigate = useNavigate();

  const [employers, setEmployers] = useState([]);
  const [filteredEmployers, setFilteredEmployers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // ============================
  // FETCH EMPLOYERS
  // ============================
  const fetchEmployers = async () => {
    try {
      setLoading(true);

      const response = await getEmployers();

      // Axios response handling
      const data = response?.data ?? response;

      const employerData = Array.isArray(data)
        ? data
        : data?.content || data?.employers || [];

      setEmployers(employerData);
      setFilteredEmployers(employerData);
    } catch (error) {
      console.error("Error fetching employers:", error);

      setEmployers([]);
      setFilteredEmployers([]);
    } finally {
      setLoading(false);
    }
  };

  // ============================
  // INITIAL LOAD
  // ============================
  useEffect(() => {
    fetchEmployers();
  }, []);

  // ============================
  // SEARCH
  // ============================
  useEffect(() => {
    const searchText = search.toLowerCase().trim();

    if (!searchText) {
      setFilteredEmployers(employers);
      return;
    }

    const filtered = employers.filter((employer) => {
      const name =
        employer.name ||
        employer.employerName ||
        employer.companyName ||
        "";

      const email = employer.email || "";
      const phone = employer.phone || employer.mobile || "";
      const location =
        employer.location ||
        employer.city ||
        employer.address ||
        "";

      return (
        String(name).toLowerCase().includes(searchText) ||
        String(email).toLowerCase().includes(searchText) ||
        String(phone).toLowerCase().includes(searchText) ||
        String(location).toLowerCase().includes(searchText)
      );
    });

    setFilteredEmployers(filtered);
  }, [search, employers]);

  // ============================
  // DELETE EMPLOYER
  // ============================
  const handleDelete = async (id) => {
    if (!id) return;

    const confirmed = window.confirm(
      "Are you sure you want to delete this employer?"
    );

    if (!confirmed) return;

    try {
      await deleteEmployer(id);

      alert("Employer deleted successfully.");

      fetchEmployers();
    } catch (error) {
      console.error("Error deleting employer:", error);

      alert("Failed to delete employer.");
    }
  };

  // ============================
  // EDIT
  // ============================
  const handleEdit = (id) => {
    navigate(`/employers/edit/${id}`);
  };

  // ============================
  // ADD
  // ============================
  const handleAdd = () => {
    navigate("/employers/add");
  };

  // ============================
  // EMPLOYER NAME
  // ============================
  const getEmployerName = (employer) => {
    return (
      employer.name ||
      employer.employerName ||
      employer.companyName ||
      "Unnamed Employer"
    );
  };

  // ============================
  // EMAIL
  // ============================
  const getEmail = (employer) => {
    return employer.email || employer.emailAddress || "—";
  };

  // ============================
  // PHONE
  // ============================
  const getPhone = (employer) => {
    return (
      employer.phone ||
      employer.mobile ||
      employer.phoneNumber ||
      "—"
    );
  };

  // ============================
  // LOCATION
  // ============================
  const getLocation = (employer) => {
    return (
      employer.location ||
      employer.city ||
      employer.address ||
      "—"
    );
  };

  // ============================
  // STATUS
  // ============================
  const getStatus = (employer) => {
    if (employer.status) {
      return employer.status;
    }

    if (employer.active === true) {
      return "Active";
    }

    if (employer.active === false) {
      return "Inactive";
    }

    return "Active";
  };

  return (
    <div className="employer-page">

      {/* ============================
          HEADER
      ============================ */}
      <div className="employer-header">

        <div>
          <h1>Employer List</h1>

          <p>
            Manage employers and company accounts
          </p>
        </div>

        <button
          className="add-employer-btn"
          onClick={handleAdd}
        >
          <FiPlus size={18} />
          Add Employer
        </button>

      </div>


      {/* ============================
          TOOLBAR
      ============================ */}
      <div className="employer-toolbar">

        <div className="search-box">

          <FiSearch size={18} />

          <input
            type="text"
            placeholder="Search employers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>


        <div className="toolbar-right">

          <div className="employer-count">
            <FiUsers size={18} />

            <span>
              {filteredEmployers.length} Employers
            </span>
          </div>

          <button
            className="refresh-btn"
            onClick={fetchEmployers}
            title="Refresh"
          >
            <FiRefreshCw size={18} />
          </button>

        </div>

      </div>


      {/* ============================
          TABLE
      ============================ */}
      <div className="employer-card">

        {loading ? (

          <div className="employer-loading">
            <FiRefreshCw
              className="loading-icon"
              size={28}
            />

            <p>Loading employers...</p>
          </div>

        ) : filteredEmployers.length === 0 ? (

          <div className="employer-empty">

            <FiUsers size={45} />

            <h3>No Employers Found</h3>

            <p>
              {search
                ? "No employers match your search."
                : "Start by adding your first employer."}
            </p>

            {!search && (
              <button
                className="add-employer-btn"
                onClick={handleAdd}
              >
                <FiPlus size={18} />
                Add Employer
              </button>
            )}

          </div>

        ) : (

          <div className="table-wrapper">

            <table className="employer-table">

              <thead>
                <tr>
                  <th>EMPLOYER</th>
                  <th>CONTACT</th>
                  <th>LOCATION</th>
                  <th>STATUS</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>

              <tbody>

                {filteredEmployers.map((employer, index) => {

                  const id =
                    employer.id ||
                    employer.employerId;

                  const name = getEmployerName(employer);
                  const email = getEmail(employer);
                  const phone = getPhone(employer);
                  const location = getLocation(employer);
                  const status = getStatus(employer);

                  return (
                    <tr key={id || index}>

                      {/* EMPLOYER */}
                      <td>

                        <div className="employer-info">

                          <div className="company-avatar">
                            {name
                              .charAt(0)
                              .toUpperCase()}
                          </div>

                          <div>

                            <div className="company-name">
                              {name}
                            </div>

                            <div className="company-id">
                              ID: {id || "—"}
                            </div>

                          </div>

                        </div>

                      </td>


                      {/* CONTACT */}
                      <td>

                        <div className="contact-info">

                          <div>
                            <FiMail size={14} />
                            <span>{email}</span>
                          </div>

                          <div>
                            <FiPhone size={14} />
                            <span>{phone}</span>
                          </div>

                        </div>

                      </td>


                      {/* LOCATION */}
                      <td>

                        <div className="location-info">

                          <FiMapPin size={16} />

                          <span>
                            {location}
                          </span>

                        </div>

                      </td>


                      {/* STATUS */}
                      <td>

                        <span
                          className={`status-badge ${
                            String(status)
                              .toLowerCase() === "active"
                              ? "active"
                              : "inactive"
                          }`}
                        >
                          {status}
                        </span>

                      </td>


                      {/* ACTIONS */}
                      <td>

                        <div className="action-buttons">

                          <button
                            className="edit-btn"
                            title="Edit Employer"
                            onClick={() =>
                              handleEdit(id)
                            }
                          >
                            <FiEdit2 size={16} />
                          </button>

                          <button
                            className="delete-btn"
                            title="Delete Employer"
                            onClick={() =>
                              handleDelete(id)
                            }
                          >
                            <FiTrash2 size={16} />
                          </button>

                        </div>

                      </td>

                    </tr>
                  );
                })}

              </tbody>

            </table>

          </div>

        )}

      </div>

    </div>
  );
};

export default EmployerList;