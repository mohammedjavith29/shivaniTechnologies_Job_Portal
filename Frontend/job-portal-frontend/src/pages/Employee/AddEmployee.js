import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addEmployee } from "../../services/employeeService";

function AddEmployee() {

    const navigate = useNavigate();

    const [employee, setEmployee] = useState({
        employeeName: "",
        email: "",
        mobile: "",
        password: ""
    });

    const handleChange = (e) => {
        setEmployee({
            ...employee,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await addEmployee(employee);

            alert("Employee Added Successfully");

            navigate("/employees");

        } catch (error) {

            console.log(error);

            alert("Unable to Add Employee");

        }

    };

    return (

        <div className="container mt-4">

            <h2>Add Employee</h2>

            <form onSubmit={handleSubmit}>

                <input
                    className="form-control mb-3"
                    placeholder="Employee Name"
                    name="employeeName"
                    value={employee.employeeName}
                    onChange={handleChange}
                    required
                />

                <input
                    type="email"
                    className="form-control mb-3"
                    placeholder="Email"
                    name="email"
                    value={employee.email}
                    onChange={handleChange}
                    required
                />

                <input
                    className="form-control mb-3"
                    placeholder="Mobile Number"
                    name="mobile"
                    value={employee.mobile}
                    onChange={handleChange}
                    required
                />

                <input
                    type="password"
                    className="form-control mb-3"
                    placeholder="Password"
                    name="password"
                    value={employee.password}
                    onChange={handleChange}
                    required
                />

                <button className="btn btn-success">
                    Save Employee
                </button>

            </form>

        </div>

    );

}

export default AddEmployee;