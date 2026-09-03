import React, { useState } from "react";
import { sendSingleMail } from "../services/emailService";
import "./Mail.css";

function Mail() {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setStatus("");

    try {
      const requestData = {
        emailAddresses: [email],
        subject: subject,
        message: message,
      };

      const response = await sendSingleMail(requestData);

      setStatus({
        type: "success",
        message: response.data || "Mail sent successfully",
      });

      setEmail("");
      setSubject("");
      setMessage("");

    } catch (error) {
      console.error(error);

      let errorMessage = "Cannot connect to Spring Boot Backend";

      if (error.response) {
        errorMessage =
          error.response.data || "Failed to send mail";
      }

      setStatus({
        type: "error",
        message: errorMessage,
      });

    } finally {
      setLoading(false);
    }
  };

  const clearForm = () => {
    setEmail("");
    setSubject("");
    setMessage("");
    setStatus("");
  };

  return (
    <div className="zoho-mail-page">

      {/* Top Header */}
      <div className="zoho-mail-header">

        <div className="zoho-logo">
          <div className="zoho-logo-icon">
            S
          </div>

          <div>
            <h4>Shivani Mail</h4>
            <span>Shivani Technologies</span>
          </div>
        </div>

        <div className="zoho-header-right">
          <span className="user-circle">
            A
          </span>
        </div>

      </div>


      <div className="zoho-mail-body">

        {/* Sidebar */}
        <div className="zoho-sidebar">

          <button className="compose-button">
            <span>＋</span>
            Compose
          </button>

          <div className="mail-menu">

            <div className="mail-menu-item active">
              <span>📥</span>
              Inbox
              <span className="mail-count">0</span>
            </div>

            <div className="mail-menu-item">
              <span>⭐</span>
              Starred
            </div>

            <div className="mail-menu-item">
              <span>📤</span>
              Sent
            </div>

            <div className="mail-menu-item">
              <span>📝</span>
              Drafts
            </div>

            <div className="mail-menu-item">
              <span>🗑️</span>
              Trash
            </div>

          </div>

          <div className="sidebar-footer">

            <p>Shivani Technologies</p>
            <span>Mail Management</span>

          </div>

        </div>


        {/* Main Compose Area */}
        <div className="zoho-main">

          <div className="mail-toolbar">

            <div>
              <h3>New Message</h3>
              <p>Compose and send email</p>
            </div>

            <button
              className="discard-top-button"
              onClick={clearForm}
            >
              Discard
            </button>

          </div>


          <div className="compose-container">

            {status && (
              <div
                className={
                  status.type === "success"
                    ? "mail-alert success-alert"
                    : "mail-alert error-alert"
                }
              >
                {status.message}
              </div>
            )}


            <form onSubmit={handleSubmit}>

              {/* TO */}
              <div className="compose-row">

                <label>To</label>

                <input
                  type="email"
                  placeholder="Enter recipient email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />

              </div>


              {/* SUBJECT */}
              <div className="compose-row">

                <label>Subject</label>

                <input
                  type="text"
                  placeholder="Enter subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                />

              </div>


              {/* MESSAGE */}
              <div className="message-section">

                <div className="message-label">
                  Message
                </div>

                <textarea
                  placeholder="Write your message here..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                />

              </div>


              {/* Bottom Actions */}
              <div className="compose-footer">

                <button
                  type="submit"
                  className="send-button"
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Send Mail"}
                </button>

                <button
                  type="button"
                  className="discard-button"
                  onClick={clearForm}
                >
                  Discard
                </button>

              </div>

            </form>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Mail;