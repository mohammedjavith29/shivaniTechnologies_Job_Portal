import React from "react";
import { Navigate } from "react-router-dom";

function CandidateProtectedRoute({ children }) {

    const token = localStorage.getItem("candidateToken");

    if (!token) {
        return <Navigate to="/candidate/login" replace />;
    }

    return children;
}

export default CandidateProtectedRoute;