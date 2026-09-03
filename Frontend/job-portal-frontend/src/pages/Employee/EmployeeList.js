import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiPlus,
  FiSearch,
  FiEdit2,
  FiTrash2,
  FiRefreshCw,
  FiUsers,
  FiMail,
  FiPhone,
  FiMapPin,
  FiBriefcase,
} from "react-icons/fi";

import {
  getEmployees,
  deleteEmployee,
} from "../../services/employeeService";

import "./EmployeeList.css";

const EmployeeList = () => {
  const navigate = useNavigate();

  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // ==========================================
  // FETCH EMPLOYEES
  // ==========================================
  const fetchEmployees = async () => {
    try {
      setLoading(true);

      const response = await getEmployees();

      const data = response?.data ?? response;

      const employeeData = Array.isArray(data)
        ? data
        : data?.content ||
          data?.employees ||
          data?.data ||
          [];

      setEmployees(employeeData);
      setFilteredEmployees(employeeData);
    } catch (error) {
      console.error("Error fetching employees:", error);

      setEmployees([]);
      setFilteredEmployees([]);
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // INITIAL LOAD
  // ==========================================
  useEffect(() => {
    fetchEmployees();
  }, []);

  // ==========================================
  // SEARCH
  // ==========================================
  useEffect(() => {
    const text = search.toLowerCase().trim();

    if (!text) {
      setFilteredEmployees(employees);
      return;
    }

    const filtered = employees.filter((employee) => {
      const name =
        employee.name ||
        employee.employeeName ||
        employee.fullName ||
        "";

      const email =
        employee.email ||
        employee.emailAddress ||
        "";

      const phone =
        employee.phone ||
        employee.mobile ||
        employee.phoneNumber ||
        "";

      const designation =
        employee.designation ||
        employee.designationName ||
        employee.jobTitle ||
        "";

      const location =
        employee.location ||
        employee.city ||
        employee.address ||
        "";

      return (
        String(name).toLowerCase().includes(text) ||
        String(email).toLowerCase().includes(text) ||
        String(phone).toLowerCase().includes(text) ||
        String(designation).toLowerCase().includes(text) ||
        String(location).toLowerCase().includes(text)
      );
    });

    setFilteredEmployees(filtered);
  }, [search, employees]);

  // ==========================================
  // DELETE
  // ==========================================
  const handleDelete = async (id) => {
    if (!id) {
      alert("Employee ID not found.");
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to delete this employee?"
    );

    if (!confirmed) return;

    try {
      await deleteEmployee(id);

      alert("Employee deleted successfully.");

      fetchEmployees();
    } catch (error) {
      console.error("Error deleting employee:", error);

      const message =
        error?.response?.data?.message ||
        "Failed to delete employee.";

      alert(message);
    }
  };

  // ==========================================
  // EDIT
  // ==========================================
  const handleEdit = (id) => {
    if (!id) {
      alert("Employee ID not found.");
      return;
    }

    navigate(`/employees/edit/${id}`);
  };

  // ==========================================
  // ADD
  // ==========================================
  const handleAdd = () => {
    navigate("/employees/add");
  };

  // ==========================================
  // GET NAME
  // ==========================================
  const getName = (employee) => {
    return (
      employee.name ||
      employee.employeeName ||
      employee.fullName ||
      "Unnamed Employee"
    );
  };

  // ==========================================
  // GET EMAIL
  // ==========================================
  const getEmail = (employee) => {
    return (
      employee.email ||
      employee.emailAddress ||
      "—"
    );
  };

  // ==========================================
  // GET PHONE
  // ==========================================
  const getPhone = (employee) => {
    return (
      employee.phone ||
      employee.mobile ||
      employee.phoneNumber ||
      "—"
    );
  };

  // ==========================================
  // GET DESIGNATION
  // ==========================================
  const getDesignation = (employee) => {
    if (typeof employee.designation === "object") {
      return (
        employee.designation?.name ||
        employee.designation?.designationName ||
        "—"
      );
    }

    return (
      employee.designation ||
      employee.designationName ||
      employee.jobTitle ||
      "—"
    );
  };

  // ==========================================
  // GET LOCATION
  // ==========================================
  const getLocation = (employee) => {
    return (
      employee.location ||
      employee.city ||
      employee.address ||
      "—"
    );
  };

  // ==========================================
  // GET STATUS
  // ==========================================
  const getStatus = (employee) => {
    if (employee.status) {
      return employee.status;
    }

    if (employee.active === true) {
      return "Active";
    }

    if (employee.active === false) {
      return "Inactive";
    }

    return "Active";
  };

  return (
    <div className="employee-page">

      {/* ======================================
          HEADER
      ====================================== */}
      <div className="employee-header">

        <div>
          <h1>Employee List</h1>

          <p>
            Manage employees and employee information
          </p>
        </div>

        <button
          className="add-employee-btn"
          onClick={handleAdd}
        >
          <FiPlus size={18} />
          Add Employee
        </button>

      </div>


      {/* ======================================
          TOOLBAR
      ====================================== */}
      <div className="employee-toolbar">

        <div className="employee-search">

          <FiSearch size={18} />

          <input
            type="text"
            placeholder="Search employees..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>


        <div className="employee-toolbar-right">

          <div className="employee-count">

            <FiUsers size={18} />

            <span>
              {filteredEmployees.length} Employees
            </span>

          </div>


          <button
            className="employee-refresh-btn"
            onClick={fetchEmployees}
            title="Refresh"
          >
            <FiRefreshCw size={18} />
          </button>

        </div>

      </div>


      {/* ======================================
          TABLE CARD
      ====================================== */}
      <div className="employee-card">

        {loading ? (

          <div className="employee-loading">

            <FiRefreshCw
              size={30}
              className="employee-loading-icon"
            />

            <p>
              Loading employees...
            </p>

          </div>

        ) : filteredEmployees.length === 0 ? (

          <div className="employee-empty">

            <FiUsers size={48} />

            <h3>
              No Employees Found
            </h3>

            <p>
              {search
                ? "No employees match your search."
                : "Start by adding your first employee."}
            </p>

            {!search && (
              <button
                className="add-employee-btn"
                onClick={handleAdd}
              >
                <FiPlus size={18} />
                Add Employee
              </button>
            )}

          </div>

        ) : (

          <div className="employee-table-wrapper">

            <table className="employee-table">

              <thead>

                <tr>
                  <th>EMPLOYEE</th>
                  <th>CONTACT</th>
                  <th>DESIGNATION</th>
                  <th>LOCATION</th>
                  <th>STATUS</th>
                  <th>ACTIONS</th>
                </tr>

              </thead>


              <tbody>

                {filteredEmployees.map(
                  (employee, index) => {

                    const id =
                      employee.id ||
                      employee.employeeId;

                    const name =
                      getName(employee);

                    const email =
                      getEmail(employee);

                    const phone =
                      getPhone(employee);

                    const designation =
                      getDesignation(employee);

                    const location =
                      getLocation(employee);

                    const status =
                      getStatus(employee);

                    return (
                      <tr key={id || index}>

                        {/* EMPLOYEE */}
                        <td>

                          <div className="employee-info">

                            <div className="employee-avatar">
                              {name
                                .charAt(0)
                                .toUpperCase()}
                            </div>

                            <div>

                              <div className="employee-name">
                                {name}
                              </div>

                              <div className="employee-id">
                                ID: {id || "—"}
                              </div>

                            </div>

                          </div>

                        </td>


                        {/* CONTACT */}
                        <td>

                          <div className="employee-contact">

                            <div>
                              <FiMail size={14} />
                              <span>
                                {email}
                              </span>
                            </div>

                            <div>
                              <FiPhone size={14} />
                              <span>
                                {phone}
                              </span>
                            </div>

                          </div>

                        </td>


                        {/* DESIGNATION */}
                        <td>

                          <div className="employee-designation">

                            <FiBriefcase size={16} />

                            <span>
                              {designation}
                            </span>

                          </div>

                        </td>


                        {/* LOCATION */}
                        <td>

                          <div className="employee-location">

                            <FiMapPin size={16} />

                            <span>
                              {location}
                            </span>

                          </div>

                        </td>


                        {/* STATUS */}
                        <td>

                          <span
                            className={`employee-status ${
                              String(status)
                                .toLowerCase() ===
                              "active"
                                ? "active"
                                : "inactive"
                            }`}
                          >
                            {status}
                          </span>

                        </td>


                        {/* ACTIONS */}
                        <td>

                          <div className="employee-actions">

                            <button
                              className="employee-edit-btn"
                              title="Edit Employee"
                              onClick={() =>
                                handleEdit(id)
                              }
                            >
                              <FiEdit2 size={16} />
                            </button>

                            <button
                              className="employee-delete-btn"
                              title="Delete Employee"
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
                  }
                )}

              </tbody>

            </table>

          </div>

        )}

      </div>

    </div>
  );
};

export default EmployeeList;