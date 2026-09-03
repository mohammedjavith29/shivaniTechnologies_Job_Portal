import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    getCandidateById,
    updateCandidate
} from "../../services/candidateService";

function EditCandidate() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [candidate, setCandidate] = useState({

        fullName: "",
        email: "",
        mobile: "",
        password: "",
        qualification: "",
        experience: "",
        skills: "",
        location: "",
        resume: "",
        verified: false

    });

    useEffect(() => {

        loadCandidate();

    }, []);

    const loadCandidate = async () => {

        const response = await getCandidateById(id);

        setCandidate(response.data);

    };

    const handleChange = (e) => {

        const { name, value, type, checked } = e.target;

        setCandidate({

            ...candidate,

            [name]: type === "checkbox" ? checked : value

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        await updateCandidate(id, candidate);

        alert("Candidate Updated Successfully");

        navigate("/candidates");

    };

    return (

        <div className="container mt-4">

            <h2>Edit Candidate</h2>

            <form onSubmit={handleSubmit}>

                <input
                    className="form-control mb-3"
                    name="fullName"
                    value={candidate.fullName}
                    onChange={handleChange}
                />

                <input
                    className="form-control mb-3"
                    name="email"
                    value={candidate.email}
                    onChange={handleChange}
                />

                <input
                    className="form-control mb-3"
                    name="mobile"
                    value={candidate.mobile}
                    onChange={handleChange}
                />

                <input
                    className="form-control mb-3"
                    name="qualification"
                    value={candidate.qualification}
                    onChange={handleChange}
                />

                <input
                    className="form-control mb-3"
                    name="experience"
                    value={candidate.experience}
                    onChange={handleChange}
                />

                <input
                    className="form-control mb-3"
                    name="skills"
                    value={candidate.skills}
                    onChange={handleChange}
                />

                <input
                    className="form-control mb-3"
                    name="location"
                    value={candidate.location}
                    onChange={handleChange}
                />

                <input
                    className="form-control mb-3"
                    name="resume"
                    value={candidate.resume}
                    onChange={handleChange}
                />

                <div className="form-check mb-3">

                    <input
                        type="checkbox"
                        className="form-check-input"
                        name="verified"
                        checked={candidate.verified}
                        onChange={handleChange}
                    />

                    <label className="form-check-label">

                        Verified

                    </label>

                </div>

                <button className="btn btn-primary">

                    Update Candidate

                </button>

            </form>

        </div>

    );

}

export default EditCandidate;