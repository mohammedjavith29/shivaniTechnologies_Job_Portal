import React from "react";
import DashboardCards from "../../components/DashboardCards";

function AdminDashboard() {

  const username = localStorage.getItem("username") || "Admin";

  return (
    <div>

      {/* Page Header */}

      <div className="page-header">

        <div>

          <h1>
            Dashboard
          </h1>

          <p>
            Welcome back, {username}. Here's what's happening today.
          </p>

        </div>

        <div className="page-date">

          <i className="bi bi-calendar3"></i>

          Today

        </div>

      </div>


      {/* Dashboard Cards */}

      <DashboardCards />


      {/* Main Dashboard Grid */}

      <div className="dashboard-grid">


        {/* Recent Companies */}

        <div className="dashboard-panel">

          <div className="panel-header">

            <div>

              <h3>
                Recent Companies
              </h3>

              <p>
                Recently registered companies
              </p>

            </div>

            <button className="panel-link">
              View All
            </button>

          </div>


          <div className="empty-state">

            <div className="empty-icon">
              <i className="bi bi-building"></i>
            </div>

            <h4>
              No companies yet
            </h4>

            <p>
              Companies registered in the system will appear here.
            </p>

          </div>

        </div>


        {/* Recent Applications */}

        <div className="dashboard-panel">

          <div className="panel-header">

            <div>

              <h3>
                Recent Applications
              </h3>

              <p>
                Latest candidate applications
              </p>

            </div>

            <button className="panel-link">
              View All
            </button>

          </div>


          <div className="empty-state">

            <div className="empty-icon">
              <i className="bi bi-file-earmark-text"></i>
            </div>

            <h4>
              No applications yet
            </h4>

            <p>
              Candidate applications will appear here.
            </p>

          </div>

        </div>

      </div>


      {/* Quick Actions */}

      <div className="dashboard-panel quick-actions-panel">

        <div className="panel-header">

          <div>

            <h3>
              Quick Actions
            </h3>

            <p>
              Frequently used administration functions
            </p>

          </div>

        </div>


        <div className="quick-actions">

          <a href="/companies" className="quick-action">

            <div className="quick-action-icon blue">
              <i className="bi bi-building"></i>
            </div>

            <div>
              <strong>Add Company</strong>
              <span>Create a recruitment company</span>
            </div>

            <i className="bi bi-chevron-right"></i>

          </a>


          <a href="/jobs" className="quick-action">

            <div className="quick-action-icon green">
              <i className="bi bi-briefcase"></i>
            </div>

            <div>
              <strong>Create Job</strong>
              <span>Create a new job opening</span>
            </div>

            <i className="bi bi-chevron-right"></i>

          </a>


          <a href="/candidates" className="quick-action">

            <div className="quick-action-icon orange">
              <i className="bi bi-person-plus"></i>
            </div>

            <div>
              <strong>View Candidates</strong>
              <span>Manage registered candidates</span>
            </div>

            <i className="bi bi-chevron-right"></i>

          </a>


          <a href="/mail" className="quick-action">

            <div className="quick-action-icon purple">
              <i className="bi bi-envelope"></i>
            </div>

            <div>
              <strong>Send Mail</strong>
              <span>Send mail to users</span>
            </div>

            <i className="bi bi-chevron-right"></i>

          </a>

        </div>

      </div>

    </div>
  );
}

export default AdminDashboard;