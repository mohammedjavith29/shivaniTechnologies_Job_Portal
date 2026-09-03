import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    getCompanies,
    deleteCompany
} from "../../../services/companyService";
import "./CompanyList.css";

function CompanyList() {

    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadCompanies();
    }, []);

    const loadCompanies = async () => {
        try {
            setLoading(true);

            const response = await getCompanies();

            console.log("Companies:", response.data);

            setCompanies(
                Array.isArray(response.data)
                    ? response.data
                    : []
            );

        } catch (error) {
            console.error("Error loading companies:", error);
            setCompanies([]);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {

        if (!window.confirm("Are you sure you want to delete this company?")) {
            return;
        }

        try {

            await deleteCompany(id);

            alert("Company deleted successfully");

            loadCompanies();

        } catch (error) {

            console.error("Delete company error:", error);

            alert("Unable to delete company");

        }
    };

    return (
        <div className="company-page">

            {/* PAGE HEADER */}
            <div className="company-page-header">

                <div>
                    <h1>Company Management</h1>

                    <p>
                        Manage and monitor registered companies
                    </p>
                </div>

                <Link
                    to="/companies/add"
                    className="company-add-btn"
                >
                    <i className="bi bi-plus-lg"></i>
                    Add Company
                </Link>

            </div>


            {/* MAIN CARD */}
            <div className="company-card">

                <div className="company-card-header">

                    <div>
                        <h2>Companies</h2>

                        <p>
                            View and manage all registered companies
                        </p>
                    </div>

                    <div className="company-total">

                        <span>Total Companies</span>

                        <strong>
                            {companies.length}
                        </strong>

                    </div>

                </div>


                {/* TABLE */}
                <div className="company-table-container">

                    <table className="company-table">

                        <thead>

                            <tr>
                                <th>ID</th>
                                <th>Company Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Location</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>

                        </thead>


                        <tbody>

                            {loading ? (

                                <tr>
                                    <td
                                        colSpan="7"
                                        className="company-empty"
                                    >
                                        <div className="company-loading">
                                            <span className="company-spinner"></span>
                                            Loading companies...
                                        </div>
                                    </td>
                                </tr>

                            ) : companies.length === 0 ? (

                                <tr>

                                    <td
                                        colSpan="7"
                                        className="company-empty"
                                    >

                                        <div className="company-empty-icon">
                                            <i className="bi bi-building"></i>
                                        </div>

                                        <h3>
                                            No companies found
                                        </h3>

                                        <p>
                                            Add your first company to get started.
                                        </p>

                                        <Link
                                            to="/companies/add"
                                            className="company-empty-btn"
                                        >
                                            <i className="bi bi-plus-lg"></i>
                                            Add Company
                                        </Link>

                                    </td>

                                </tr>

                            ) : (

                                companies.map((company) => {

                                    const id =
                                        company.companyId ||
                                        company.id;

                                    const name =
                                        company.companyName ||
                                        company.name ||
                                        "-";

                                    const email =
                                        company.email ||
                                        "-";

                                    const phone =
                                        company.phone ||
                                        company.mobile ||
                                        "-";

                                    const location =
                                        company.location ||
                                        company.address ||
                                        "-";

                                    const status =
                                        company.status ||
                                        "Active";

                                    return (

                                        <tr key={id}>

                                            <td>
                                                #{id}
                                            </td>

                                            <td>

                                                <div className="company-name-cell">

                                                    <div className="company-avatar">
                                                        <i className="bi bi-building"></i>
                                                    </div>

                                                    <span>
                                                        {name}
                                                    </span>

                                                </div>

                                            </td>

                                            <td>
                                                {email}
                                            </td>

                                            <td>
                                                {phone}
                                            </td>

                                            <td>
                                                {location}
                                            </td>

                                            <td>

                                                <span className="company-status">
                                                    <span></span>
                                                    {status}
                                                </span>

                                            </td>

                                            <td>

                                                <div className="company-actions">

                                                    <Link
                                                        to={`/companies/edit/${id}`}
                                                        className="company-action edit"
                                                        title="Edit"
                                                    >
                                                        <i className="bi bi-pencil"></i>
                                                    </Link>

                                                    <button
                                                        type="button"
                                                        className="company-action delete"
                                                        title="Delete"
                                                        onClick={() =>
                                                            handleDelete(id)
                                                        }
                                                    >
                                                        <i className="bi bi-trash"></i>
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

            </div>

        </div>
    );
}

export default CompanyList;