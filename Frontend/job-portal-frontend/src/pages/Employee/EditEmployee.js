import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
    getEmployeeById,
    updateEmployee
} from "../../services/employeeService";

function EditEmployee() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [employee, setEmployee] = useState({
        employeeName: "",
        email: "",
        mobile: "",
        password: ""
    });

    useEffect(() => {
        loadEmployee();
    }, []);

    const loadEmployee = async () => {

        try {

            const res = await getEmployeeById(id);

            setEmployee(res.data);

        } catch (error) {

            console.log(error);

        }

    };

    const handleChange = (e) => {

        setEmployee({

            ...employee,

            [e.target.name]: e.target.value

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await updateEmployee(id, employee);

            alert("Employee Updated Successfully");

            navigate("/employees");

        } catch (error) {

            console.log(error);

            alert("Unable to Update Employee");

        }

    };

    return (

        <div className="container mt-4">

            <h2>Edit Employee</h2>

            <form onSubmit={handleSubmit}>

                <input
                    className="form-control mb-3"
                    name="employeeName"
                    value={employee.employeeName}
                    onChange={handleChange}
                />

                <input
                    className="form-control mb-3"
                    name="email"
                    value={employee.email}
                    onChange={handleChange}
                />

                <input
                    className="form-control mb-3"
                    name="mobile"
                    value={employee.mobile}
                    onChange={handleChange}
                />

                <input
                    type="password"
                    className="form-control mb-3"
                    name="password"
                    value={employee.password}
                    onChange={handleChange}
                />

                <button className="btn btn-primary">
                    Update Employee
                </button>

            </form>

        </div>

    );

}

export default EditEmployee;