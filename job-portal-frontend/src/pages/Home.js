import React from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

function Home() {
    return (
        <>
            <div className="container-fluid">

                <div className="text-center mt-5">

                    <h1 className="display-4 fw-bold">
                        Welcome to Shivani Technologies
                    </h1>

                    <h3 className="mt-3">
                        Job Portal Management System
                    </h3>

                    <p className="lead mt-3">
                        Find your dream job with top companies.
                    </p>

                    <div className="mt-4">

                        <Link
                            to="/login"
                            className="btn btn-primary me-3"
                        >
                            Login
                        </Link>

                        <Link
                            to="/register"
                            className="btn btn-success"
                        >
                            Register
                        </Link>

                    </div>

                </div>


                <div className="row mt-5">

                    <div className="col-md-4">

                        <div className="card shadow">

                            <div className="card-body text-center">

                                <h3>100+</h3>

                                <p>Total Jobs</p>

                            </div>

                        </div>

                    </div>


                    <div className="col-md-4">

                        <div className="card shadow">

                            <div className="card-body text-center">

                                <h3>50+</h3>

                                <p>Companies</p>

                            </div>

                        </div>

                    </div>


                    <div className="col-md-4">

                        <div className="card shadow">

                            <div className="card-body text-center">

                                <h3>500+</h3>

                                <p>Job Seekers</p>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

            <Footer />
        </>
    );
}

export default Home;