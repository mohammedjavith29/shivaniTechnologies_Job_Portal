import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { addCandidate } from "../../services/candidateService";
import "./AddCandidate.css";

function AddCandidate() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: ""
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            await addCandidate(formData);

            alert("Candidate added successfully");

            navigate("/candidates");

        } catch (error) {

            console.error("Add candidate error:", error);

            alert(
                error.response?.data?.message ||
                "Unable to add candidate"
            );

        } finally {

            setLoading(false);

        }
    };

    return (

        <div className="add-candidate-page">

            <div className="add-candidate-header">

                <div>

                    <div className="breadcrumb">
                        Candidates / Add Candidate
                    </div>

                    <h1>Add Candidate</h1>

                    <p>
                        Create a new candidate profile
                    </p>

                </div>

                <Link
                    to="/candidates"
                    className="back-candidate-btn"
                >
                    <i className="bi bi-arrow-left"></i>
                    Back to Candidates
                </Link>

            </div>


            <div className="add-candidate-card">

                <div className="add-candidate-card-header">

                    <div className="form-title-icon">
                        <i className="bi bi-person-plus-fill"></i>
                    </div>

                    <div>

                        <h2>Candidate Information</h2>

                        <p>
                            Enter the candidate's basic information
                        </p>

                    </div>

                </div>


                <form onSubmit={handleSubmit}>

                    <div className="candidate-form-body">

                        <div className="candidate-form-grid">

                            <div className="candidate-form-group">

                                <label>
                                    First Name
                                    <span>*</span>
                                </label>

                                <div className="candidate-input">

                                    <i className="bi bi-person"></i>

                                    <input
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        placeholder="Enter first name"
                                        required
                                    />

                                </div>

                            </div>


                            <div className="candidate-form-group">

                                <label>
                                    Last Name
                                    <span>*</span>
                                </label>

                                <div className="candidate-input">

                                    <i className="bi bi-person"></i>

                                    <input
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        placeholder="Enter last name"
                                        required
                                    />

                                </div>

                            </div>


                            <div className="candidate-form-group">

                                <label>
                                    Email
                                    <span>*</span>
                                </label>

                                <div className="candidate-input">

                                    <i className="bi bi-envelope"></i>

                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Enter email address"
                                        required
                                    />

                                </div>

                            </div>


                            <div className="candidate-form-group">

                                <label>
                                    Phone Number
                                </label>

                                <div className="candidate-input">

                                    <i className="bi bi-telephone"></i>

                                    <input
                                        type="text"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="Enter phone number"
                                    />

                                </div>

                            </div>

                        </div>

                    </div>


                    <div className="candidate-form-footer">

                        <Link
                            to="/candidates"
                            className="candidate-cancel-btn"
                        >
                            Cancel
                        </Link>

                        <button
                            type="submit"
                            className="candidate-save-btn"
                            disabled={loading}
                        >

                            <i className="bi bi-check-lg"></i>

                            {loading
                                ? "Saving..."
                                : "Save Candidate"}

                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}

export default AddCandidate;