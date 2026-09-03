import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getAllSkills,
  deleteSkill
} from "../../../services/skillService";
import "./SkillList.css";

function SkillList() {

  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSkills();
  }, []);

  const loadSkills = async () => {
    try {
      setLoading(true);

      const response = await getAllSkills();

      console.log("Skills:", response.data);

      setSkills(response.data || []);

    } catch (error) {
      console.error("Error loading skills:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this skill?"
    );

    if (!confirmDelete) {
      return;
    }

    try {

      await deleteSkill(id);

      alert("Skill deleted successfully");

      loadSkills();

    } catch (error) {

      console.error("Error deleting skill:", error);

      alert("Unable to delete skill");

    }
  };

  return (
    <div className="skill-page">

      {/* PAGE HEADER */}
      <div className="skill-page-header">

        <div>
          <h1>Skills</h1>

          <p>
            Manage skills used across your recruitment process.
          </p>
        </div>

        <Link
          to="/skills/add"
          className="skill-add-button"
        >
          <i className="bi bi-plus-lg"></i>
          Add Skill
        </Link>

      </div>


      {/* SUMMARY */}
      <div className="skill-summary">

        <div className="skill-summary-icon">
          <i className="bi bi-award"></i>
        </div>

        <div>
          <span>Total Skills</span>
          <strong>{skills.length}</strong>
        </div>

      </div>


      {/* TABLE CARD */}
      <div className="skill-table-card">

        <div className="skill-table-header">

          <div>
            <h2>Skill List</h2>

            <p>
              View and manage all available skills.
            </p>
          </div>

          <button
            className="skill-refresh-button"
            onClick={loadSkills}
            title="Refresh"
          >
            <i className="bi bi-arrow-clockwise"></i>
          </button>

        </div>


        <div className="skill-table-wrapper">

          <table className="skill-table">

            <thead>

              <tr>
                <th>#</th>
                <th>Skill Name</th>
                <th>Status</th>
                <th className="skill-action-column">
                  Actions
                </th>
              </tr>

            </thead>

            <tbody>

              {loading ? (

                <tr>
                  <td
                    colSpan="4"
                    className="skill-empty-cell"
                  >
                    <div className="skill-loading">
                      <div className="skill-spinner"></div>
                      <span>Loading skills...</span>
                    </div>
                  </td>
                </tr>

              ) : skills.length === 0 ? (

                <tr>

                  <td
                    colSpan="4"
                    className="skill-empty-cell"
                  >

                    <div className="skill-empty-state">

                      <div className="skill-empty-icon">
                        <i className="bi bi-award"></i>
                      </div>

                      <h3>No skills found</h3>

                      <p>
                        Add your first skill to get started.
                      </p>

                      <Link
                        to="/skills/add"
                        className="skill-empty-button"
                      >
                        <i className="bi bi-plus-lg"></i>
                        Add Skill
                      </Link>

                    </div>

                  </td>

                </tr>

              ) : (

                skills.map((skill, index) => {

                  const skillId =
                    skill.skillId ??
                    skill.id ??
                    skill.skill_id;

                  const skillName =
                    skill.skillName ??
                    skill.name ??
                    skill.skill ??
                    "Unnamed Skill";

                  return (

                    <tr key={skillId || index}>

                      <td className="skill-number">
                        {index + 1}
                      </td>

                      <td>

                        <div className="skill-name-wrapper">

                          <div className="skill-icon">
                            <i className="bi bi-award"></i>
                          </div>

                          <span>
                            {skillName}
                          </span>

                        </div>

                      </td>

                      <td>

                        <span className="skill-status">
                          Active
                        </span>

                      </td>

                      <td className="skill-actions">

                        <Link
                          to={`/skills/edit/${skillId}`}
                          className="skill-edit-button"
                          title="Edit Skill"
                        >
                          <i className="bi bi-pencil"></i>
                          Edit
                        </Link>

                        <button
                          type="button"
                          className="skill-delete-button"
                          onClick={() =>
                            handleDelete(skillId)
                          }
                          title="Delete Skill"
                        >
                          <i className="bi bi-trash3"></i>
                          Delete
                        </button>

                      </td>

                    </tr>

                  );

                })

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default SkillList;