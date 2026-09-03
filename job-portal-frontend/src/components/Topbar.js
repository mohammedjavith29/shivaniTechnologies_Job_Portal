import React from "react";

function Topbar() {

  const username = localStorage.getItem("username") || "Admin";

  return (
    <header className="topbar">

      {/* Search */}
      <div className="topbar-search">

        <i className="bi bi-search"></i>

        <input
          type="text"
          placeholder="Search..."
        />

      </div>

      {/* Right Side */}
      <div className="topbar-right">

        <button className="topbar-icon">
          <i className="bi bi-bell"></i>
        </button>

        <button className="topbar-icon">
          <i className="bi bi-question-circle"></i>
        </button>

        <div className="profile-menu">

          <div className="profile-avatar">
            {username.charAt(0).toUpperCase()}
          </div>

          <div className="profile-info">

            <strong>
              {username}
            </strong>

            <small>
              Administrator
            </small>

          </div>

          <i className="bi bi-chevron-down"></i>

        </div>

      </div>

    </header>
  );
}

export default Topbar;