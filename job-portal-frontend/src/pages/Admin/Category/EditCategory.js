import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function EditCategory() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [category, setCategory] = useState({
        categoryName: "",
        description: ""
    });

    useEffect(() => {

        loadCategory();

    }, []);

    const loadCategory = async () => {

        const response = await axios.get(
            `http://localhost:8080/api/categories/${id}`
        );

        setCategory(response.data);

    };

    const handleChange = (e) => {

        setCategory({
            ...category,
            [e.target.name]: e.target.value
        });

    };

    const updateCategory = async (e) => {

        e.preventDefault();

        await axios.put(
            `http://localhost:8080/api/categories/${id}`,
            category
        );

        alert("Category Updated");

        navigate("/admin/categories");

    };

    return (

        <div className="container mt-4">

            <h2>Edit Category</h2>

            <form onSubmit={updateCategory}>

                <input
                    className="form-control mb-3"
                    name="categoryName"
                    value={category.categoryName}
                    onChange={handleChange}
                />

                <textarea
                    className="form-control mb-3"
                    rows="4"
                    name="description"
                    value={category.description}
                    onChange={handleChange}
                />

                <button className="btn btn-primary">
                    Update
                </button>

            </form>

        </div>

    );

}

export default EditCategory;