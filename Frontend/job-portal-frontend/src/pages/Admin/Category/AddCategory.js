import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addCategory } from "../../../services/categoryService";
import "./AddCategory.css";

function AddCategory() {
  const navigate = useNavigate();

  const [category, setCategory] = useState({
    name: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setCategory({
      ...category,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!category.name.trim()) {
      alert("Please enter category name");
      return;
    }

    try {
      setLoading(true);

      await addCategory({
        name: category.name.trim(),
      });

      alert("Category added successfully");

      navigate("/categories");
    } catch (error) {
      console.error("Error adding category:", error);
      alert("Unable to add category");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/categories");
  };

  return (
    <div className="add-category-page">

      {/* Breadcrumb */}
      <div className="category-breadcrumb">
        Recruitment
        <span>/</span>
        Categories
        <span>/</span>
        Add Category
      </div>

      {/* Page Header */}
      <div className="category-page-header">
        <h1>Add Category</h1>

        <p>
          Create a new job category and organize your recruitment workflow.
        </p>
      </div>

      {/* Form Card */}
      <div className="category-form-card">

        {/* Card Header */}
        <div className="category-form-header">

          <div className="category-header-icon">
            <i className="bi bi-grid-3x3-gap"></i>
          </div>

          <div>
            <h2>Category Information</h2>

            <p>
              Enter the details of the new job category.
            </p>
          </div>

        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>

          <div className="category-form-section">

            {/* Section Heading */}
            <div className="category-section-title">

              <div className="category-section-icon">
                <i className="bi bi-info-circle"></i>
              </div>

              <div>
                <h3>Basic Information</h3>

                <p>
                  Provide the name of the job category.
                </p>
              </div>

            </div>

            {/* Category Input */}
            <div className="category-form-group">

              <label htmlFor="name">
                Category Name <span>*</span>
              </label>

              <div className="category-input-wrapper">

                <i className="bi bi-grid-3x3-gap category-input-icon"></i>

                <input
                  id="name"
                  type="text"
                  name="name"
                  value={category.name}
                  onChange={handleChange}
                  placeholder="e.g. Software Development"
                  autoComplete="off"
                  required
                />

              </div>

              <small>
                Enter a clear and meaningful name for this category.
              </small>

            </div>

          </div>

          {/* Footer */}
          <div className="category-form-footer">

            <button
              type="button"
              className="category-btn-cancel"
              onClick={handleCancel}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="category-btn-save"
              disabled={loading}
            >
              {loading ? (
                <>
                  <i className="bi bi-arrow-repeat"></i>
                  Saving...
                </>
              ) : (
                <>
                  <i className="bi bi-check-lg"></i>
                  Save Category
                </>
              )}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default AddCategory;