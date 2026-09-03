import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getLocationById, updateLocation } from "../../../services/locationService";

function EditLocation() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [location, setLocation] = useState({
        city: "",
        state: "",
        country: ""
    });

    useEffect(() => {
        loadLocation();
    }, []);

    const loadLocation = async () => {

        try {

            const result = await getLocationById(id);

            console.log("Location:", result.data);

            setLocation(result.data);

        } catch (error) {

            console.error(error);

            alert("Unable to load location");

        }

    };

    const handleChange = (e) => {

        setLocation({
            ...location,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await updateLocation(id, location);

            alert("Location Updated Successfully");

            navigate("/locations");

        } catch (error) {

            console.error(error);

            alert("Unable to update location");

        }

    };

    return (

        <div className="container mt-4">

            <h2>Edit Location</h2>

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    className="form-control mb-3"
                    name="city"
                    placeholder="City"
                    value={location.city || ""}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    className="form-control mb-3"
                    name="state"
                    placeholder="State"
                    value={location.state || ""}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    className="form-control mb-3"
                    name="country"
                    placeholder="Country"
                    value={location.country || ""}
                    onChange={handleChange}
                    required
                />

                <button className="btn btn-success">
                    Update Location
                </button>

            </form>

        </div>

    );

}

export default EditLocation;