import React from "react";
import { Link } from "react-router-dom";

function Dashboard() {

    return (

        <div className="container-fluid mt-4">

            <h2 className="mb-4">
                Admin Dashboard
            </h2>

            <div className="row">

                <div className="col-md-3">

                    <div className="card text-white bg-primary shadow">

                        <div className="card-body">

                            <h5>Total Jobs</h5>

                            <h2>120</h2>

                        </div>

                    </div>

                </div>

                <div className="col-md-3">

                    <div className="card text-white bg-success shadow">

                        <div className="card-body">

                            <h5>Companies</h5>

                            <h2>25</h2>

                        </div>

                    </div>

                </div>

                <div className="col-md-3">

                    <div className="card text-white bg-warning shadow">

                        <div className="card-body">

                            <h5>Candidates</h5>

                            <h2>250</h2>

                        </div>

                    </div>

                </div>

                <div className="col-md-3">

                    <div className="card text-white bg-danger shadow">

                        <div className="card-body">

                            <h5>Applications</h5>

                            <h2>95</h2>

                        </div>

                    </div>

                </div>

            </div>

            <div className="row mt-4">

                <div className="col-md-6">

                    <div className="card shadow">

                        <div className="card-header">

                            Quick Actions

                        </div>

                        <div className="card-body">

                            <Link to="/jobs" className="btn btn-primary m-2">

                                Create Job

                            </Link>

                            <Link to="/companies" className="btn btn-success m-2">

                                Add Company

                            </Link>

                            <Link to="/employees" className="btn btn-warning m-2">

                                Add Employee

                            </Link>

                            <Link to="/applications" className="btn btn-danger m-2">

                                View Applications

                            </Link>

                        </div>

                    </div>

                </div>

                <div className="col-md-6">

                    <div className="card shadow">

                        <div className="card-header">

                            Pending Companies

                        </div>

                        <div className="card-body">

                            <table className="table">

                                <thead>

                                    <tr>

                                        <th>Company</th>

                                        <th>Status</th>

                                    </tr>

                                </thead>

                                <tbody>

                                    <tr>

                                        <td>TCS</td>

                                        <td>

                                            <span className="badge bg-warning">

                                                Pending

                                            </span>

                                        </td>

                                    </tr>

                                    <tr>

                                        <td>Infosys</td>

                                        <td>

                                            <span className="badge bg-warning">

                                                Pending

                                            </span>

                                        </td>

                                    </tr>

                                </tbody>

                            </table>

                        </div>

                    </div>

                </div>

            </div>

            <div className="row mt-4">

                <div className="col-md-12">

                    <div className="card shadow">

                        <div className="card-header">

                            Recent Applications

                        </div>

                        <div className="card-body">

                            <table className="table table-hover">

                                <thead>

                                    <tr>

                                        <th>Candidate</th>

                                        <th>Company</th>

                                        <th>Job</th>

                                        <th>Status</th>

                                    </tr>

                                </thead>

                                <tbody>

                                    <tr>

                                        <td>Mohammed</td>

                                        <td>Google</td>

                                        <td>Java Developer</td>

                                        <td>

                                            <span className="badge bg-success">

                                                Selected

                                            </span>

                                        </td>

                                    </tr>

                                    <tr>

                                        <td>Arun</td>

                                        <td>TCS</td>

                                        <td>React Developer</td>

                                        <td>

                                            <span className="badge bg-primary">

                                                Applied

                                            </span>

                                        </td>

                                    </tr>

                                </tbody>

                            </table>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default Dashboard;