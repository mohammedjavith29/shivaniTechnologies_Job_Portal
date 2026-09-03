import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getLocations, deleteLocation } from "../../../services/locationService";
import "./LocationList.css";

function LocationList() {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    loadLocations();
  }, []);

  const loadLocations = async () => {
    try {
      setLoading(true);

      const response = await getLocations();

      console.log("Locations:", response.data);

      setLocations(
        Array.isArray(response.data)
          ? response.data
          : response.data?.data || []
      );
    } catch (error) {
      console.error("Error loading locations:", error);
      setLocations([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this location?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      setDeleting(true);

      await deleteLocation(id);

      alert("Location deleted successfully.");

      await loadLocations();
    } catch (error) {
      console.error("Error deleting location:", error);
      alert("Unable to delete location.");
    } finally {
      setDeleting(false);
    }
  };

  const getLocationId = (location) => {
    return (
      location.locationId ||
      location.id ||
      location.locationID
    );
  };

  const getLocationName = (location) => {
    return (
      location.locationName ||
      location.name ||
      location.location ||
      "-"
    );
  };

  return (
    <div className="location-page">

      {/* PAGE HEADER */}
      <div className="location-page-header">

        <div>
          <div className="location-breadcrumb">
            Administration <span>/</span> Locations
          </div>

          <h1>Locations</h1>

          <p>
            Manage job locations available in the recruitment system.
          </p>
        </div>

        <Link
          to="/locations/add"
          className="location-add-button"
        >
          <i className="bi bi-plus-lg"></i>
          Add Location
        </Link>

      </div>


      {/* SUMMARY */}
      <div className="location-summary">

        <div className="location-summary-icon">
          <i className="bi bi-geo-alt"></i>
        </div>

        <div>
          <span>Total Locations</span>
          <strong>{locations.length}</strong>
        </div>

      </div>


      {/* MAIN CARD */}
      <div className="location-card">

        <div className="location-card-header">

          <div>
            <h2>Location List</h2>
            <p>
              View and manage all available job locations.
            </p>
          </div>

          <button
            type="button"
            className="location-refresh-button"
            onClick={loadLocations}
            disabled={loading}
            title="Refresh"
          >
            <i className="bi bi-arrow-clockwise"></i>
          </button>

        </div>


        {/* TABLE */}
        <div className="location-table-wrapper">

          <table className="location-table">

            <thead>
              <tr>
                <th>#</th>
                <th>Location</th>
                <th className="location-action-heading">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>

              {loading ? (

                <tr>
                  <td
                    colSpan="3"
                    className="location-empty-cell"
                  >
                    <div className="location-loading">
                      <span className="location-spinner"></span>
                      Loading locations...
                    </div>
                  </td>
                </tr>

              ) : locations.length === 0 ? (

                <tr>
                  <td
                    colSpan="3"
                    className="location-empty-cell"
                  >

                    <div className="location-empty">

                      <div className="location-empty-icon">
                        <i className="bi bi-geo-alt"></i>
                      </div>

                      <h3>No locations found</h3>

                      <p>
                        Add your first job location to get started.
                      </p>

                      <Link
                        to="/locations/add"
                        className="location-empty-button"
                      >
                        <i className="bi bi-plus-lg"></i>
                        Add Location
                      </Link>

                    </div>

                  </td>
                </tr>

              ) : (

                locations.map((location, index) => {

                  const id = getLocationId(location);

                  return (
                    <tr key={id || index}>

                      <td>
                        <span className="location-number">
                          {index + 1}
                        </span>
                      </td>

                      <td>
                        <div className="location-name-wrapper">

                          <div className="location-row-icon">
                            <i className="bi bi-geo-alt"></i>
                          </div>

                          <div>
                            <strong>
                              {getLocationName(location)}
                            </strong>

                            <span>
                              Job location
                            </span>
                          </div>

                        </div>
                      </td>

                      <td>
                        <div className="location-actions">

                          <Link
                            to={`/locations/edit/${id}`}
                            className="location-edit-button"
                            title="Edit Location"
                          >
                            <i className="bi bi-pencil"></i>
                            Edit
                          </Link>

                          <button
                            type="button"
                            className="location-delete-button"
                            onClick={() => handleDelete(id)}
                            disabled={deleting}
                            title="Delete Location"
                          >
                            <i className="bi bi-trash3"></i>
                            Delete
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

        {/* FOOTER */}
        {!loading && locations.length > 0 && (
          <div className="location-card-footer">
            Showing{" "}
            <strong>{locations.length}</strong>{" "}
            {locations.length === 1 ? "location" : "locations"}
          </div>
        )}

      </div>

    </div>
  );
}

export default LocationList;