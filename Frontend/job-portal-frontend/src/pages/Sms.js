import React, { useState } from "react";
import "./../styles/Sms.css";

function Sms() {
  const [activeTab, setActiveTab] = useState("compose");

  const [sms, setSms] = useState({
    recipientType: "Candidates",
    phoneNumber: "",
    message: "",
  });

  const handleChange = (e) => {
    setSms({
      ...sms,
      [e.target.name]: e.target.value,
    });
  };

  const handleSend = () => {
    if (!sms.message.trim()) {
      alert("Please enter a message");
      return;
    }

    if (activeTab === "single" && !sms.phoneNumber.trim()) {
      alert("Please enter a phone number");
      return;
    }

    console.log("SMS Data:", sms);

    alert("SMS sent successfully");

    setSms({
      recipientType: "Candidates",
      phoneNumber: "",
      message: "",
    });
  };

  return (
    <div className="zoho-sms-page">

      {/* TOP HEADER */}
      <div className="sms-header">
        <div>
          <h2>SMS</h2>
          <p>Send and manage your messages</p>
        </div>

        <button className="sms-help-btn">
          ? Help
        </button>
      </div>


      <div className="sms-layout">

        {/* LEFT SIDEBAR */}
        <div className="sms-sidebar">

          <div className="sms-sidebar-title">
            MESSAGING
          </div>

          <button
            className={`sms-nav-item ${
              activeTab === "compose" ? "active" : ""
            }`}
            onClick={() => setActiveTab("compose")}
          >
            <span>✉</span>
            Compose SMS
          </button>

          <button
            className={`sms-nav-item ${
              activeTab === "single" ? "active" : ""
            }`}
            onClick={() => setActiveTab("single")}
          >
            <span>👤</span>
            Single SMS
          </button>

          <button
            className={`sms-nav-item ${
              activeTab === "bulk" ? "active" : ""
            }`}
            onClick={() => setActiveTab("bulk")}
          >
            <span>👥</span>
            Bulk SMS
          </button>

          <div className="sms-sidebar-title mt-4">
            MANAGEMENT
          </div>

          <button
            className={`sms-nav-item ${
              activeTab === "history" ? "active" : ""
            }`}
            onClick={() => setActiveTab("history")}
          >
            <span>◷</span>
            SMS History
          </button>

          <button
            className={`sms-nav-item ${
              activeTab === "templates" ? "active" : ""
            }`}
            onClick={() => setActiveTab("templates")}
          >
            <span>▤</span>
            Templates
          </button>

        </div>


        {/* MAIN CONTENT */}
        <div className="sms-content">

          {/* COMPOSE */}
          {(activeTab === "compose" ||
            activeTab === "bulk" ||
            activeTab === "single") && (

            <div className="sms-card">

              <div className="sms-card-header">

                <div>
                  <h4>
                    {activeTab === "bulk"
                      ? "Send Bulk SMS"
                      : activeTab === "single"
                      ? "Send Single SMS"
                      : "Compose SMS"}
                  </h4>

                  <p>
                    Create and send messages to your users.
                  </p>
                </div>

              </div>


              <div className="sms-card-body">

                {/* RECIPIENT TYPE */}

                {activeTab !== "single" && (

                  <div className="form-group">

                    <label>Send To</label>

                    <select
                      className="zoho-input"
                      name="recipientType"
                      value={sms.recipientType}
                      onChange={handleChange}
                    >

                      <option>Candidates</option>
                      <option>Employees</option>
                      <option>Companies</option>
                      <option>All Candidates</option>
                      <option>All Employees</option>
                      <option>All Companies</option>

                    </select>

                  </div>

                )}


                {/* PHONE NUMBER */}

                {activeTab === "single" && (

                  <div className="form-group">

                    <label>Mobile Number</label>

                    <input
                      type="text"
                      name="phoneNumber"
                      className="zoho-input"
                      placeholder="Enter mobile number"
                      value={sms.phoneNumber}
                      onChange={handleChange}
                    />

                  </div>

                )}


                {/* MESSAGE */}

                <div className="form-group">

                  <div className="message-label">

                    <label>Message</label>

                    <span>
                      {sms.message.length}/160
                    </span>

                  </div>

                  <textarea
                    className="zoho-textarea"
                    name="message"
                    placeholder="Type your message here..."
                    value={sms.message}
                    onChange={handleChange}
                    maxLength="160"
                  />

                  <small className="sms-info">
                    Standard SMS supports up to 160 characters.
                  </small>

                </div>


                {/* OPTIONS */}

                <div className="sms-options">

                  <label className="checkbox-container">

                    <input type="checkbox" />

                    <span>
                      Schedule SMS
                    </span>

                  </label>

                  <label className="checkbox-container">

                    <input type="checkbox" />

                    <span>
                      Save as template
                    </span>

                  </label>

                </div>


                {/* ACTIONS */}

                <div className="sms-actions">

                  <button
                    className="btn-cancel"
                    onClick={() =>
                      setSms({
                        recipientType: "Candidates",
                        phoneNumber: "",
                        message: "",
                      })
                    }
                  >
                    Clear
                  </button>

                  <button
                    className="btn-send"
                    onClick={handleSend}
                  >
                    Send SMS
                  </button>

                </div>

              </div>

            </div>

          )}


          {/* HISTORY */}

          {activeTab === "history" && (

            <div className="sms-card">

              <div className="sms-card-header">
                <div>
                  <h4>SMS History</h4>
                  <p>View previously sent messages.</p>
                </div>
              </div>

              <div className="empty-state">

                <div className="empty-icon">
                  ✉
                </div>

                <h5>No SMS history available</h5>

                <p>
                  Your sent messages will appear here.
                </p>

              </div>

            </div>

          )}


          {/* TEMPLATES */}

          {activeTab === "templates" && (

            <div className="sms-card">

              <div className="sms-card-header">
                <div>
                  <h4>SMS Templates</h4>
                  <p>Create reusable message templates.</p>
                </div>

                <button className="btn-send">
                  + New Template
                </button>

              </div>

              <div className="empty-state">

                <div className="empty-icon">
                  ▤
                </div>

                <h5>No templates available</h5>

                <p>
                  Create your first SMS template.
                </p>

              </div>

            </div>

          )}

        </div>

      </div>

    </div>
  );
}

export default Sms;