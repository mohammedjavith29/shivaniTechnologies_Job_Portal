import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { addSkill } from "../../../services/skillService";
import "./AddSkill.css";

function AddSkill() {
  const navigate = useNavigate();

  const [skillName, setSkillName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    const trimmedName = skillName.trim();

    if (!trimmedName) {
      setError("Please enter a skill name.");
      return;
    }

    try {
      setLoading(true);

      /*
       * If your backend expects:
       * { skillName: "Java" }
       */
      await addSkill({
        skillName: trimmedName
      });

      alert("Skill added successfully!");

      navigate("/skills");

    } catch (err) {
      console.error("Error adding skill:", err);

      setError(
        err?.response?.data?.message ||
        "Unable to add skill. Please try again."
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-skill-page">

      {/* PAGE HEADER */}
      <div className="add-skill-header">

        <div className="add-skill-header-left">

          <Link
            to="/skills"
            className="add-skill-back"
          >
            <i className="bi bi-arrow-left"></i>
          </Link>

          <div>
            <h1>Add Skill</h1>

            <p>
              Create a new skill for your recruitment system.
            </p>
          </div>

        </div>

      </div>


      {/* FORM CARD */}
      <div className="add-skill-card">

        {/* CARD HEADER */}
        <div className="add-skill-card-header">

          <div className="add-skill-title-icon">
            <i className="bi bi-award"></i>
          </div>

          <div>
            <h2>Skill Information</h2>

            <p>
              Enter the details of the new skill below.
            </p>
          </div>

        </div>


        {/* FORM */}
        <form
          className="add-skill-form"
          onSubmit={handleSubmit}
        >

          {/* ERROR */}
          {error && (
            <div className="add-skill-error">
              <i className="bi bi-exclamation-circle"></i>
              <span>{error}</span>
            </div>
          )}


          {/* SKILL NAME */}
          <div className="add-skill-field">

            <label htmlFor="skillName">
              Skill Name
              <span>*</span>
            </label>

            <div className="add-skill-input-wrapper">

              <i className="bi bi-award"></i>

              <input
                id="skillName"
                type="text"
                value={skillName}
                onChange={(e) => setSkillName(e.target.value)}
                placeholder="Enter skill name"
                autoComplete="off"
                disabled={loading}
              />

            </div>

            <small>
              Example: Java, React, Python, SQL, Communication
            </small>

          </div>


          {/* FORM ACTIONS */}
          <div className="add-skill-actions">

            <Link
              to="/skills"
              className="add-skill-cancel"
            >
              Cancel
            </Link>

            <button
              type="submit"
              className="add-skill-submit"
              disabled={loading}
            >

              {loading ? (
                <>
                  <span className="add-skill-spinner"></span>
                  Saving...
                </>
              ) : (
                <>
                  <i className="bi bi-check-lg"></i>
                  Save Skill
                </>
              )}

            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default AddSkill;