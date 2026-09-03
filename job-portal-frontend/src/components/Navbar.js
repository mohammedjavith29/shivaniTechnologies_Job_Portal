import React from "react";

function Navbar() {

    const username = localStorage.getItem("username");

    return (

        <nav className="navbar navbar-dark bg-dark">

            <div className="container-fluid">

                <span className="navbar-brand">

                    Shivani Technologies Job Portal

                </span>

                <span className="text-white">

                    Welcome, {username}

                </span>

            </div>

        </nav>

    );

}

export default Navbar;