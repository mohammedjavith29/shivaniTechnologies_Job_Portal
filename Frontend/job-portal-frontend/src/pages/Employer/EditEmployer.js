import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    getEmployerById,
    updateEmployer
} from "../../services/employerService";

function EditEmployer() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [employer, setEmployer] = useState({
        companyName: "",
        contactPerson: "",
        email: "",
        mobile: "",
        address: "",
        website: ""
    });

    useEffect(() => {

        loadEmployer();

    }, []);

    const loadEmployer = async () => {

        try {

            const response = await getEmployerById(id);

            setEmployer(response.data);

        } catch (error) {

            console.log(error);

        }

    };

    const handleChange = (e) => {

        setEmployer({

            ...employer,

            [e.target.name]: e.target.value

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await updateEmployer(id, employer);

            alert("Employer Updated Successfully");

            navigate("/employers");

        } catch (error) {

            console.log(error);

            alert("Unable to update employer");

        }

    };

    return (

        <div className="container mt-4">

            <div className="card shadow">

                <div className="card-header bg-warning">

                    <h3>Edit Employer</h3>

                </div>

                <div className="card-body">

                    <form onSubmit={handleSubmit}>

                        <div className="mb-3">

                            <label>Company Name</label>

                            <input
                                type="text"
                                name="companyName"
                                className="form-control"
                                value={employer.companyName}
                                onChange={handleChange}
                            />

                        </div>

                        <div className="mb-3">

                            <label>Contact Person</label>

                            <input
                                type="text"
                                name="contactPerson"
                                className="form-control"
                                value={employer.contactPerson}
                                onChange={handleChange}
                            />

                        </div>

                        <div className="mb-3">

                            <label>Email</label>

                            <input
                                type="email"
                                name="email"
                                className="form-control"
                                value={employer.email}
                                onChange={handleChange}
                            />

                        </div>

                        <div className="mb-3">

                            <label>Mobile</label>

                            <input
                                type="text"
                                name="mobile"
                                className="form-control"
                                value={employer.mobile}
                                onChange={handleChange}
                            />

                        </div>

                        <div className="mb-3">

                            <label>Address</label>

                            <textarea
                                name="address"
                                className="form-control"
                                rows="3"
                                value={employer.address}
                                onChange={handleChange}
                            />

                        </div>

                        <div className="mb-3">

                            <label>Website</label>

                            <input
                                type="text"
                                name="website"
                                className="form-control"
                                value={employer.website}
                                onChange={handleChange}
                            />

                        </div>

                        <button className="btn btn-primary">

                            Update Employer

                        </button>

                    </form>

                </div>

            </div>

        </div>

    );

}

export default EditEmployer;