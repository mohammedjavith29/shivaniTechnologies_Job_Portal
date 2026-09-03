import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

function Sidebar() {

  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  const menuClass = ({ isActive }) =>
    isActive ? "sidebar-link active" : "sidebar-link";

  return (
    <aside className="sidebar">

      {/* Logo */}
      <div className="sidebar-logo">
        <div className="logo-icon">
          ST
        </div>

        <div>
          <div className="logo-title">
            SHIVANI
          </div>

          <div className="logo-subtitle">
            TECHNOLOGIES
          </div>
        </div>
      </div>

      {/* Main Menu */}
      <div className="menu-section">

        <div className="menu-title">
          MAIN
        </div>

        <NavLink to="/admin" className={menuClass}>
          <i className="bi bi-grid"></i>
          <span>Dashboard</span>
        </NavLink>

      </div>

      {/* Recruitment */}
      <div className="menu-section">

        <div className="menu-title">
          RECRUITMENT
        </div>

        <NavLink to="/companies" className={menuClass}>
          <i className="bi bi-building"></i>
          <span>Companies</span>
        </NavLink>

        <NavLink to="/jobs" className={menuClass}>
          <i className="bi bi-briefcase"></i>
          <span>Jobs</span>
        </NavLink>

        <NavLink to="/categories" className={menuClass}>
          <i className="bi bi-grid-3x3-gap"></i>
          <span>Categories</span>
        </NavLink>

        <NavLink to="/designations" className={menuClass}>
          <i className="bi bi-person-badge"></i>
          <span>Designations</span>
        </NavLink>

        <NavLink to="/locations" className={menuClass}>
          <i className="bi bi-geo-alt"></i>
          <span>Locations</span>
        </NavLink>

        <NavLink to="/skills" className={menuClass}>
          <i className="bi bi-award"></i>
          <span>Skills</span>
        </NavLink>

      </div>

      {/* People */}
      <div className="menu-section">

        <div className="menu-title">
          PEOPLE
        </div>

        <NavLink to="/users" className={menuClass}>
          <i className="bi bi-people"></i>
          <span>Users</span>
        </NavLink>

        <NavLink to="/candidates" className={menuClass}>
          <i className="bi bi-person"></i>
          <span>Candidates</span>
        </NavLink>

        <NavLink to="/employers" className={menuClass}>
          <i className="bi bi-person-workspace"></i>
          <span>Employers</span>
        </NavLink>

        <NavLink to="/employees" className={menuClass}>
          <i className="bi bi-person-vcard"></i>
          <span>Employees</span>
        </NavLink>

      </div>

      {/* Operations */}
      <div className="menu-section">

        <div className="menu-title">
          OPERATIONS
        </div>

        <NavLink to="/applications" className={menuClass}>
          <i className="bi bi-file-earmark-text"></i>
          <span>Applications</span>
        </NavLink>

        <NavLink to="/interviews" className={menuClass}>
          <i className="bi bi-camera-video"></i>
          <span>Interviews</span>
        </NavLink>

        <NavLink to="/mail" className={menuClass}>
          <i className="bi bi-envelope"></i>
          <span>Mail</span>
        </NavLink>

      </div>

      {/* Employer */}
      <div className="menu-section">

        <div className="menu-title">
          EMPLOYER ZONE
        </div>

        <NavLink to="/company-registration" className={menuClass}>
          <i className="bi bi-building-add"></i>
          <span>Company Registration</span>
        </NavLink>

<NavLink to="/sms" className={menuClass}>
  <i className="bi bi-chat-dots"></i>
  <span>SMS</span>
</NavLink>

        <NavLink to="/company-verification" className={menuClass}>
          <i className="bi bi-patch-check"></i>
          <span>Company Verification</span>
        </NavLink>

      </div>

      {/* Candidate */}
      <div className="menu-section">

        <div className="menu-title">
          CANDIDATE ZONE
        </div>

        <NavLink to="/candidate-dashboard" className={menuClass}>
          <i className="bi bi-person-workspace"></i>
          <span>Candidate Dashboard</span>
        </NavLink>

       <NavLink to="/candidate/jobs" className={menuClass}>
          <i className="bi bi-search"></i>
          <span>Job Search</span>
        </NavLink>

        <NavLink
    to="/candidate/resume"
    className="sidebar-link"
>
    <i className="bi bi-file-earmark-person"></i>
    <span>Resume</span>
</NavLink>

      </div>

      {/* Other */}
      <div className="menu-section">

        <NavLink to="/profile" className={menuClass}>
          <i className="bi bi-person-circle"></i>
          <span>Profile</span>
        </NavLink>

       

      </div>

      {/* Logout */}
      <div className="sidebar-bottom">

        <button
          className="logout-button"
          onClick={logout}
        >
          <i className="bi bi-box-arrow-right"></i>
          <span>Logout</span>
        </button>
        

      </div>

    </aside>
  );
}

export default Sidebar;