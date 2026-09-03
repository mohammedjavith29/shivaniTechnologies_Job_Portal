import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./UserManagement.css";

const API_URL = "http://localhost:8080/api/users";

function UserManagement() {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    loadUsers();
  }, []);

  // =========================
  // LOAD USERS
  // =========================
  const loadUsers = async () => {
    try {
      setLoading(true);

      const response = await axios.get(API_URL);

      const data = Array.isArray(response.data)
        ? response.data
        : response.data?.content || [];

      setUsers(data);
    } catch (error) {
      console.error("Error loading users:", error);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // GET USER ID
  // =========================
  const getUserId = (user) => {
    return user?.userId ?? user?.id ?? user?.userID ?? null;
  };

  // =========================
  // GET USER NAME
  // =========================
  const getUserName = (user) => {
    if (user?.name) {
      return String(user.name);
    }

    if (user?.fullName) {
      return String(user.fullName);
    }

    const fullName = `${user?.firstName || ""} ${
      user?.lastName || ""
    }`.trim();

    return fullName || "Unknown User";
  };

  // =========================
  // GET ROLE - SAFE VERSION
  // =========================
const getRole = (user) => {
  let role =
    user?.role ??
    user?.userRole ??
    user?.roleName ??
    user?.userType ??
    "User";

    /*
     * Backend may return:
     *
     * role: "ADMIN"
     *
     * OR
     *
     * role: {
     *   roleName: "ADMIN"
     * }
     *
     * OR
     *
     * role: {
     *   name: "ADMIN"
     * }
     */

  if (typeof role === "object" && role !== null) {
    role =
      role?.roleName ??
      role?.name ??
      role?.authority ??
      role?.value ??
      "User";
  }

  return String(role);
};

  // =========================
  // NORMALIZE ROLE
  // =========================
  const normalizeRole = (role) => {
    const value = String(role || "")
      .trim()
      .toLowerCase()
      .replace("role_", "");

    if (value === "admin") return "Admin";
    if (value === "employer") return "Employer";
    if (value === "employee") return "Employee";
    if (value === "candidate") return "Candidate";
    if (value === "user") return "User";

    return role || "User";
  };

  // =========================
  // GET STATUS
  // =========================
  const getStatus = (user) => {
    if (typeof user?.active === "boolean") {
      return user.active ? "Active" : "Inactive";
    }

    if (typeof user?.enabled === "boolean") {
      return user.enabled ? "Active" : "Inactive";
    }

    const status = String(user?.status || "Active").toLowerCase();

    return status === "inactive" ||
      status === "disabled" ||
      status === "false"
      ? "Inactive"
      : "Active";
  };

  // =========================
  // DELETE USER
  // =========================
  const handleDelete = async (user) => {
    const id = getUserId(user);

    if (!id) {
      alert("User ID not found");
      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to delete ${getUserName(user)}?`
    );

    if (!confirmed) {
      return;
    }

    try {
      await axios.delete(`${API_URL}/${id}`);

      alert("User deleted successfully");

      loadUsers();
    } catch (error) {
      console.error("Delete user error:", error);
      alert("Unable to delete user");
    }
  };

  // =========================
  // FILTER USERS
  // =========================
  const filteredUsers = users.filter((user) => {
    const name = getUserName(user).toLowerCase();

    const email = String(user?.email || "").toLowerCase();

    const role = normalizeRole(getRole(user));

    const status = getStatus(user);

    const searchText = String(search || "")
      .trim()
      .toLowerCase();

    const matchesSearch =
      name.includes(searchText) ||
      email.includes(searchText);

    const matchesRole =
      roleFilter === "All" ||
      role.toLowerCase() === roleFilter.toLowerCase();

    const matchesStatus =
      statusFilter === "All" ||
      status.toLowerCase() === statusFilter.toLowerCase();

    return (
      matchesSearch &&
      matchesRole &&
      matchesStatus
    );
  });

  // =========================
  // COUNTS
  // =========================
  const totalUsers = users.length;

  const activeUsers = users.filter(
    (user) => getStatus(user) === "Active"
  ).length;

  const inactiveUsers = users.filter(
    (user) => getStatus(user) === "Inactive"
  ).length;

  const adminUsers = users.filter(
    (user) =>
      normalizeRole(getRole(user))
        .toLowerCase() === "admin"
  ).length;

  return (
    <div className="user-management-page">

      {/* =========================
          BREADCRUMB
      ========================= */}
      <div className="user-breadcrumb">

        <span
          className="breadcrumb-link"
          onClick={() => navigate("/dashboard")}
        >
          Dashboard
        </span>

        <span className="breadcrumb-arrow">
          ›
        </span>

        <span>
          Manage Users
        </span>

      </div>

      {/* =========================
          PAGE HEADER
      ========================= */}
      <div className="user-page-header">

        <div className="user-title-area">

          <div className="user-title-icon">
            <i className="bi bi-people-fill"></i>
          </div>

          <div>
            <h1>
              Manage Users
            </h1>

            <p>
              View, manage and control all registered users.
            </p>
          </div>

        </div>

        <button
          className="add-user-btn"
          onClick={() => navigate("/users/add")}
        >
          <i className="bi bi-plus-lg"></i>
          Add User
        </button>

      </div>

      {/* =========================
          STATISTICS
      ========================= */}
      <div className="user-stats">

        {/* Total */}
        <div className="user-stat-card">

          <div className="stat-icon stat-blue">
            <i className="bi bi-people"></i>
          </div>

          <div className="stat-content">
            <span>Total Users</span>
            <strong>{totalUsers}</strong>
          </div>

        </div>

        {/* Active */}
        <div className="user-stat-card">

          <div className="stat-icon stat-green">
            <i className="bi bi-person-check-fill"></i>
          </div>

          <div className="stat-content">
            <span>Active Users</span>
            <strong>{activeUsers}</strong>
          </div>

        </div>

        {/* Admin */}
        <div className="user-stat-card">

          <div className="stat-icon stat-orange">
            <i className="bi bi-shield-check"></i>
          </div>

          <div className="stat-content">
            <span>Administrators</span>
            <strong>{adminUsers}</strong>
          </div>

        </div>

        {/* Inactive */}
        <div className="user-stat-card">

          <div className="stat-icon stat-purple">
            <i className="bi bi-person-x-fill"></i>
          </div>

          <div className="stat-content">
            <span>Inactive Users</span>
            <strong>{inactiveUsers}</strong>
          </div>

        </div>

      </div>

      {/* =========================
          MAIN CARD
      ========================= */}
      <div className="users-card">

        {/* Card Header */}
        <div className="users-card-header">

          <div>
            <h2>
              Users
            </h2>

            <p>
              Manage user accounts and permissions.
            </p>
          </div>

          <div className="users-total">
            {filteredUsers.length} users
          </div>

        </div>

        {/* =========================
            TOOLBAR
        ========================= */}
        <div className="users-toolbar">

          {/* Search */}
          <div className="user-search">

            <i className="bi bi-search"></i>

            <input
              type="text"
              placeholder="Search by name or email..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

            {search && (
              <button
                type="button"
                className="clear-search"
                onClick={() => setSearch("")}
              >
                <i className="bi bi-x-lg"></i>
              </button>
            )}

          </div>

          {/* Role Filter */}
          <select
            value={roleFilter}
            onChange={(e) =>
              setRoleFilter(e.target.value)
            }
            className="user-filter"
          >
            <option value="All">
              All Roles
            </option>

            <option value="Admin">
              Admin
            </option>

            <option value="Employer">
              Employer
            </option>

            <option value="Employee">
              Employee
            </option>

            <option value="Candidate">
              Candidate
            </option>

            <option value="User">
              User
            </option>
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value)
            }
            className="user-filter"
          >
            <option value="All">
              All Status
            </option>

            <option value="Active">
              Active
            </option>

            <option value="Inactive">
              Inactive
            </option>
          </select>

          {/* Refresh */}
          <button
            type="button"
            className="refresh-btn"
            onClick={loadUsers}
            title="Refresh Users"
          >
            <i className="bi bi-arrow-clockwise"></i>
          </button>

        </div>

        {/* =========================
            TABLE
        ========================= */}
        <div className="users-table-wrapper">

          <table className="users-table">

            <thead>
              <tr>
                <th>USER</th>
                <th>EMAIL</th>
                <th>ROLE</th>
                <th>STATUS</th>
                <th>ACTION</th>
              </tr>
            </thead>

            <tbody>

              {/* Loading */}
              {loading ? (

                <tr>

                  <td
                    colSpan="5"
                    className="users-empty"
                  >

                    <div className="loading-box">

                      <div className="loading-spinner">
                        <i className="bi bi-arrow-repeat"></i>
                      </div>

                      <span>
                        Loading users...
                      </span>

                    </div>

                  </td>

                </tr>

              ) : filteredUsers.length === 0 ? (

                /* Empty */
                <tr>

                  <td
                    colSpan="5"
                    className="users-empty"
                  >

                    <div className="empty-box">

                      <div className="empty-icon">
                        <i className="bi bi-people"></i>
                      </div>

                      <h3>
                        No users found
                      </h3>

                      <p>
                        There are no users matching
                        your search or filter criteria.
                      </p>

                      {(search ||
                        roleFilter !== "All" ||
                        statusFilter !== "All") && (

                        <button
                          type="button"
                          className="clear-filter-btn"
                          onClick={() => {
                            setSearch("");
                            setRoleFilter("All");
                            setStatusFilter("All");
                          }}
                        >
                          Clear Filters
                        </button>

                      )}

                    </div>

                  </td>

                </tr>

              ) : (

                /* Users */
                filteredUsers.map((user) => {

                  const id = getUserId(user);
                  const name = getUserName(user);

                  const role = normalizeRole(
                    getRole(user)
                  );

                  const status = getStatus(user);

                  const roleClass = role
                    .toLowerCase()
                    .replace(/\s+/g, "-");

                  return (

                    <tr key={id || name}>

                      {/* USER */}
                      <td>

                        <div className="user-cell">

                          <div className="user-avatar">
                            {name
                              .charAt(0)
                              .toUpperCase()}
                          </div>

                          <div className="user-details">

                            <strong>
                              {name}
                            </strong>

                            {id && (
                              <span>
                                ID: {id}
                              </span>
                            )}

                          </div>

                        </div>

                      </td>

                      {/* EMAIL */}
                      <td>

                        <span className="user-email">
                          {user?.email || "-"}
                        </span>

                      </td>

                      {/* ROLE */}
                      <td>

                        <span
                          className={`role-badge role-${roleClass}`}
                        >
                          {role}
                        </span>

                      </td>

                      {/* STATUS */}
                      <td>

                        <span
                          className={`status-badge ${
                            status === "Active"
                              ? "status-active"
                              : "status-inactive"
                          }`}
                        >

                          <span className="status-dot"></span>

                          {status}

                        </span>

                      </td>

                      {/* ACTION */}
                      <td>

                        <div className="user-actions">

                          <button
                            type="button"
                            className="action-btn edit-btn"
                            title="Edit User"
                            onClick={() =>
                              navigate(
                                `/users/edit/${id}`
                              )
                            }
                          >
                            <i className="bi bi-pencil"></i>
                          </button>

                          <button
                            type="button"
                            className="action-btn delete-btn"
                            title="Delete User"
                            onClick={() =>
                              handleDelete(user)
                            }
                          >
                            <i className="bi bi-trash3"></i>
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

        {/* =========================
            FOOTER
        ========================= */}
        {!loading &&
          filteredUsers.length > 0 && (

            <div className="users-card-footer">

              Showing{" "}
              <strong>
                {filteredUsers.length}
              </strong>{" "}
              of{" "}
              <strong>
                {users.length}
              </strong>{" "}
              users

            </div>

          )}

      </div>

    </div>
  );
}

export default UserManagement;