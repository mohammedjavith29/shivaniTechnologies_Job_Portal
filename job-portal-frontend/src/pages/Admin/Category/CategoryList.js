import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  getCategories,
  deleteCategory
} from "../../../services/categoryService";
import "./CategoryList.css";

function CategoryList() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  const loadCategories = async () => {
    try {
      setLoading(true);

      const response = await getCategories();

      console.log("Categories:", response.data);

      // Handles both:
      // response.data = [...]
      // response.data = { data: [...] }
      // response.data = { content: [...] }
      const data =
        Array.isArray(response.data)
          ? response.data
          : Array.isArray(response.data?.data)
          ? response.data.data
          : Array.isArray(response.data?.content)
          ? response.data.content
          : [];

      setCategories(data);
    } catch (error) {
      console.error("Error loading categories:", error);
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this category?"
    );

    if (!confirmed) return;

    try {
      setDeletingId(id);

      await deleteCategory(id);

      await loadCategories();
    } catch (error) {
      console.error("Error deleting category:", error);
      alert("Unable to delete category.");
    } finally {
      setDeletingId(null);
    }
  };

  const filteredCategories = useMemo(() => {
    return categories.filter((category) => {
      const name =
        category.categoryName ||
        category.name ||
        category.category ||
        "";

      return name.toLowerCase().includes(search.toLowerCase());
    });
  }, [categories, search]);

  const getCategoryId = (category) => {
    return (
      category.categoryId ??
      category.id ??
      category.categoryID
    );
  };

  const getCategoryName = (category) => {
    return (
      category.categoryName ||
      category.name ||
      category.category ||
      "Unnamed Category"
    );
  };

  return (
    <div className="category-page">

      {/* Breadcrumb */}
      <div className="category-breadcrumb">
        <span>Recruitment</span>
        <span className="breadcrumb-separator">/</span>
        <span className="breadcrumb-current">Categories</span>
      </div>

      {/* Header */}
      <div className="category-header">

        <div className="category-header-left">
          <h1>Categories</h1>

          <p>
            Manage job categories and organize your recruitment workflow.
          </p>
        </div>

        <Link
          to="/categories/add"
          className="category-add-button"
        >
          <span className="add-icon">+</span>
          Add Category
        </Link>

      </div>

      {/* Stats */}
      <div className="category-stats">

        <div className="category-stat-card">

          <div className="stat-icon">
            <span>▦</span>
          </div>

          <div className="stat-content">
            <span className="stat-label">
              Total Categories
            </span>

            <strong>
              {categories.length}
            </strong>
          </div>

        </div>

      </div>

      {/* Main Card */}
      <div className="category-card">

        {/* Card Header */}
        <div className="category-card-header">

          <div>
            <h2>Category List</h2>

            <p>
              {filteredCategories.length}{" "}
              {filteredCategories.length === 1
                ? "category"
                : "categories"}{" "}
              found
            </p>
          </div>

          <div className="category-toolbar">

            {/* Search */}
            <div className="category-search">

              <span className="search-icon">
                ⌕
              </span>

              <input
                type="text"
                placeholder="Search categories..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              {search && (
                <button
                  className="search-clear"
                  onClick={() => setSearch("")}
                  type="button"
                >
                  ×
                </button>
              )}

            </div>

            {/* Refresh */}
            <button
              type="button"
              className="refresh-button"
              onClick={loadCategories}
              disabled={loading}
              title="Refresh"
            >
              ↻
            </button>

          </div>

        </div>

        {/* Table */}
        <div className="category-table-wrapper">

          <table className="category-table">

            <thead>
              <tr>
                <th className="id-column">ID</th>
                <th>Category</th>
                <th>Status</th>
                <th className="actions-column">Actions</th>
              </tr>
            </thead>

            <tbody>

              {loading ? (

                <tr>
                  <td
                    colSpan="4"
                    className="category-loading"
                  >
                    <div className="loading-spinner"></div>
                    <span>Loading categories...</span>
                  </td>
                </tr>

              ) : filteredCategories.length === 0 ? (

                <tr>
                  <td
                    colSpan="4"
                    className="category-empty"
                  >

                    <div className="empty-icon">
                      ▦
                    </div>

                    <h3>
                      {search
                        ? "No categories found"
                        : "No categories yet"}
                    </h3>

                    <p>
                      {search
                        ? "Try changing your search."
                        : "Create your first category to get started."}
                    </p>

                    {!search && (
                      <Link
                        to="/categories/add"
                        className="empty-add-button"
                      >
                        + Add Category
                      </Link>
                    )}

                  </td>
                </tr>

              ) : (

                filteredCategories.map((category, index) => {

                  const id = getCategoryId(category);
                  const name = getCategoryName(category);

                  return (
                    <tr key={id ?? index}>

                      <td className="category-id">
                        #{id ?? index + 1}
                      </td>

                      <td>
                        <div className="category-name-wrapper">

                          <div className="category-avatar">
                            {name
                              .charAt(0)
                              .toUpperCase()}
                          </div>

                          <div>
                            <span className="category-name">
                              {name}
                            </span>

                            <small>
                              Job category
                            </small>
                          </div>

                        </div>
                      </td>

                      <td>
                        <span className="status-badge">
                          <span className="status-dot"></span>
                          Active
                        </span>
                      </td>

                      <td>
                        <div className="category-actions">

                          <Link
                            to={`/categories/edit/${id}`}
                            className="action-button edit-button"
                          >
                            <span>✎</span>
                            Edit
                          </Link>

                          <button
                            type="button"
                            className="action-button delete-button"
                            disabled={deletingId === id}
                            onClick={() =>
                              handleDelete(id)
                            }
                          >
                            <span>⌫</span>

                            {deletingId === id
                              ? "Deleting..."
                              : "Delete"}
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

        {/* Footer */}
        {!loading && filteredCategories.length > 0 && (
          <div className="category-card-footer">

            <span>
              Showing{" "}
              <strong>{filteredCategories.length}</strong>{" "}
              of{" "}
              <strong>{categories.length}</strong>{" "}
              categories
            </span>

          </div>
        )}

      </div>

    </div>
  );
}

export default CategoryList;