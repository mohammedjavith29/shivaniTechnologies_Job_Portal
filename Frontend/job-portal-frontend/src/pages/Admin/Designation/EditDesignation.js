import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function EditDesignation() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [designation, setDesignation] = useState({
        designationName: "",
        description: ""
    });

    useEffect(() => {
        loadDesignation();
    }, []);

    const loadDesignation = async () => {

        const result = await axios.get(
            `http://localhost:8080/api/designations/${id}`
        );

        setDesignation(result.data);

    };

    const handleChange = (e) => {

        setDesignation({
            ...designation,
            [e.target.name]: e.target.value
        });

    };

    const updateDesignation = async (e) => {

        e.preventDefault();

        await axios.put(
            `http://localhost:8080/api/designations/${id}`,
            designation
        );

        alert("Designation Updated Successfully");

        navigate("/admin/designations");

    };

    return (

        <div className="container mt-5">

            <div className="card shadow">

                <div className="card-body">

                    <h2>Edit Designation</h2>

                    <form onSubmit={updateDesignation}>

                        <div className="mb-3">

                            <label>Designation Name</label>

                            <input
                                type="text"
                                className="form-control"
                                name="designationName"
                                value={designation.designationName}
                                onChange={handleChange}
                            />

                        </div>

                        <div className="mb-3">

                            <label>Description</label>

                            <textarea
                                className="form-control"
                                rows="4"
                                name="description"
                                value={designation.description}
                                onChange={handleChange}
                            />

                        </div>

                        <button className="btn btn-success">

                            Update Designation

                        </button>

                    </form>

                </div>

            </div>

        </div>

    );

}

export default EditDesignation;