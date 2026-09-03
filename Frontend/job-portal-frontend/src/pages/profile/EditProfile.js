import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    getProfileById,
    updateProfile
} from "../../services/profileService";

function EditProfile() {

    const navigate = useNavigate();
    const { id } = useParams();

    const [profile, setProfile] = useState({
        fullName: "",
        email: "",
        mobile: "",
        qualification: "",
        experience: "",
        skills: "",
        location: ""
    });

    useEffect(() => {

        if (id) {

            getProfileById(id)
                .then((res) => {
                    setProfile(res.data);
                })
                .catch((err) => console.log(err));

        }

    }, [id]);

    const handleChange = (e) => {

        setProfile({

            ...profile,

            [e.target.name]: e.target.value

        });

    };

    const handleSubmit = (e) => {

        e.preventDefault();

        updateProfile(id, profile)
            .then(() => {

                alert("Profile Updated Successfully");

                navigate("/profile");

            })
            .catch((err) => console.log(err));

    };

    return (

        <div className="container mt-4">

            <h2>Edit Profile</h2>

            <form onSubmit={handleSubmit}>

                <input
                    className="form-control mb-3"
                    name="fullName"
                    placeholder="Full Name"
                    value={profile.fullName}
                    onChange={handleChange}
                />

                <input
                    className="form-control mb-3"
                    name="email"
                    placeholder="Email"
                    value={profile.email}
                    onChange={handleChange}
                />

                <input
                    className="form-control mb-3"
                    name="mobile"
                    placeholder="Mobile"
                    value={profile.mobile}
                    onChange={handleChange}
                />

                <input
                    className="form-control mb-3"
                    name="qualification"
                    placeholder="Qualification"
                    value={profile.qualification}
                    onChange={handleChange}
                />

                <input
                    className="form-control mb-3"
                    name="experience"
                    placeholder="Experience"
                    value={profile.experience}
                    onChange={handleChange}
                />

                <input
                    className="form-control mb-3"
                    name="skills"
                    placeholder="Skills"
                    value={profile.skills}
                    onChange={handleChange}
                />

                <input
                    className="form-control mb-3"
                    name="location"
                    placeholder="Location"
                    value={profile.location}
                    onChange={handleChange}
                />

                <button
                    type="submit"
                    className="btn btn-success"
                >
                    Update Profile
                </button>

            </form>

        </div>

    );

}

export default EditProfile;