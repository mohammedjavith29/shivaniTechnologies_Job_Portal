import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import candidateApi from "../api/candidateApi";

function CandidateDashboard() {

    const navigate = useNavigate();

    const [candidate, setCandidate] = useState(null);

    const [loading, setLoading] = useState(true);

    const [saving, setSaving] = useState(false);

    const [editing, setEditing] = useState(false);

    const [error, setError] = useState("");

    const [success, setSuccess] = useState("");


    // =========================
    // LOAD PROFILE
    // =========================

    useEffect(() => {

        const loadProfile = async () => {

            try {

                const token =
                    localStorage.getItem(
                        "candidateToken"
                    );

                if (!token) {

                    navigate(
                        "/candidate/login"
                    );

                    return;
                }

                const profile =
                    await candidateApi.getProfile();

                console.log(
                    "Candidate Profile:",
                    profile
                );

                setCandidate(profile);

            } catch (error) {

                console.error(
                    "Profile loading error:",
                    error
                );

                if (
                    error.response?.status === 401
                ) {

                    localStorage.removeItem(
                        "candidateToken"
                    );

                    localStorage.removeItem(
                        "candidateEmail"
                    );

                    navigate(
                        "/candidate/login"
                    );

                } else {

                    setError(
                        "Unable to load candidate profile"
                    );
                }

            } finally {

                setLoading(false);
            }
        };

        loadProfile();

    }, [navigate]);


    // =========================
    // HANDLE INPUT
    // =========================

    const handleChange = (e) => {

        const {
            name,
            value
        } = e.target;

        setCandidate((previous) => ({
            ...previous,
            [name]: value
        }));

    };


    // =========================
    // SAVE PROFILE
    // =========================

    const handleSave = async () => {

        try {

            setSaving(true);

            setError("");

            setSuccess("");

            const updatedCandidate =
                await candidateApi.updateProfile(
                    candidate.candidateId,
                    {
                        fullName:
                            candidate.fullName,

                        email:
                            candidate.email,

                        mobile:
                            candidate.mobile,

                        qualification:
                            candidate.qualification,

                        experience:
                            candidate.experience,

                        skills:
                            candidate.skills,

                        location:
                            candidate.location,

                        resume:
                            candidate.resume
                    }
                );

            console.log(
                "Updated Candidate:",
                updatedCandidate
            );

            setCandidate(
                updatedCandidate
            );

            setEditing(false);

            setSuccess(
                "Profile updated successfully!"
            );

        } catch (error) {

            console.error(
                "Profile update error:",
                error
            );

            setError(
                error.response?.data ||
                "Unable to update profile"
            );

        } finally {

            setSaving(false);
        }
    };


    // =========================
    // CANCEL EDIT
    // =========================

    const handleCancel = async () => {

        try {

            setError("");

            const profile =
                await candidateApi.getProfile();

            setCandidate(profile);

            setEditing(false);

        } catch (error) {

            console.error(
                "Error restoring profile:",
                error
            );

            setError(
                "Unable to restore profile"
            );
        }
    };


    // =========================
    // LOGOUT
    // =========================

    const handleLogout = () => {

        localStorage.removeItem(
            "candidateToken"
        );

        localStorage.removeItem(
            "candidateEmail"
        );

        navigate(
            "/candidate/login"
        );
    };


    // =========================
    // LOADING
    // =========================

    if (loading) {

        return (
            <div style={styles.center}>
                <h2>
                    Loading Candidate Profile...
                </h2>
            </div>
        );
    }


    // =========================
    // ERROR
    // =========================

    if (error && !candidate) {

        return (
            <div style={styles.center}>

                <h2>
                    Error
                </h2>

                <p>
                    {error}
                </p>

                <button
                    onClick={handleLogout}
                    style={styles.logoutButton}
                >
                    Back to Login
                </button>

            </div>
        );
    }


    // =========================
    // DASHBOARD
    // =========================

    return (

        <div style={styles.page}>

            {/* HEADER */}

            <div style={styles.header}>

                <div>

                    <h1 style={styles.title}>
                        Candidate Dashboard
                    </h1>

                    <p style={styles.subtitle}>
                        Manage your candidate profile
                    </p>

                </div>

                <button
                    onClick={handleLogout}
                    style={styles.logoutButton}
                >
                    Logout
                </button>

            </div>


            {/* MAIN CARD */}

            <div style={styles.card}>

                <div style={styles.cardHeader}>

                    <h2>
                        My Profile
                    </h2>

                    {!editing && (

                        <button
                            onClick={() => {
                                setEditing(true);
                                setError("");
                                setSuccess("");
                            }}
                            style={styles.editButton}
                        >
                            Edit Profile
                        </button>

                    )}

                </div>


                {/* SUCCESS MESSAGE */}

                {success && (

                    <div style={styles.success}>
                        {success}
                    </div>

                )}


                {/* ERROR MESSAGE */}

                {error && (

                    <div style={styles.error}>
                        {error}
                    </div>

                )}


                {candidate && (

                    <div>

                        {/* FULL NAME */}

                        <div style={styles.field}>

                            <label style={styles.label}>
                                Full Name
                            </label>

                            {editing ? (

                                <input
                                    type="text"
                                    name="fullName"
                                    value={
                                        candidate.fullName || ""
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    style={styles.input}
                                />

                            ) : (

                                <p style={styles.value}>
                                    {candidate.fullName ||
                                        "Not provided"}
                                </p>

                            )}

                        </div>


                        {/* EMAIL */}

                        <div style={styles.field}>

                            <label style={styles.label}>
                                Email
                            </label>

                            <p style={styles.value}>
                                {candidate.email}
                            </p>

                            {editing && (

                                <small
                                    style={{
                                        color: "#777"
                                    }}
                                >
                                    Email cannot be changed.
                                </small>

                            )}

                        </div>


                        {/* MOBILE */}

                        <div style={styles.field}>

                            <label style={styles.label}>
                                Mobile
                            </label>

                            {editing ? (

                                <input
                                    type="text"
                                    name="mobile"
                                    value={
                                        candidate.mobile || ""
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    style={styles.input}
                                />

                            ) : (

                                <p style={styles.value}>
                                    {candidate.mobile ||
                                        "Not provided"}
                                </p>

                            )}

                        </div>


                        {/* QUALIFICATION */}

                        <div style={styles.field}>

                            <label style={styles.label}>
                                Qualification
                            </label>

                            {editing ? (

                                <input
                                    type="text"
                                    name="qualification"
                                    value={
                                        candidate.qualification ||
                                        ""
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    style={styles.input}
                                />

                            ) : (

                                <p style={styles.value}>
                                    {candidate.qualification ||
                                        "Not provided"}
                                </p>

                            )}

                        </div>


                        {/* EXPERIENCE */}

                        <div style={styles.field}>

                            <label style={styles.label}>
                                Experience
                            </label>

                            {editing ? (

                                <input
                                    type="text"
                                    name="experience"
                                    value={
                                        candidate.experience ||
                                        ""
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    style={styles.input}
                                />

                            ) : (

                                <p style={styles.value}>
                                    {candidate.experience ||
                                        "Not provided"}
                                </p>

                            )}

                        </div>


                        {/* SKILLS */}

                        <div style={styles.field}>

                            <label style={styles.label}>
                                Skills
                            </label>

                            {editing ? (

                                <textarea
                                    name="skills"
                                    value={
                                        candidate.skills ||
                                        ""
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    rows="3"
                                    style={styles.textarea}
                                />

                            ) : (

                                <p style={styles.value}>
                                    {candidate.skills ||
                                        "Not provided"}
                                </p>

                            )}

                        </div>


                        {/* LOCATION */}

                        <div style={styles.field}>

                            <label style={styles.label}>
                                Location
                            </label>

                            {editing ? (

                                <input
                                    type="text"
                                    name="location"
                                    value={
                                        candidate.location ||
                                        ""
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    style={styles.input}
                                />

                            ) : (

                                <p style={styles.value}>
                                    {candidate.location ||
                                        "Not provided"}
                                </p>

                            )}

                        </div>


                        {/* RESUME */}

                        <div style={styles.field}>

                            <label style={styles.label}>
                                Resume
                            </label>

                            {editing ? (

                                <input
                                    type="text"
                                    name="resume"
                                    value={
                                        candidate.resume ||
                                        ""
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    placeholder="Resume URL or filename"
                                    style={styles.input}
                                />

                            ) : (

                                <p style={styles.value}>
                                    {candidate.resume ||
                                        "Not uploaded"}
                                </p>

                            )}

                        </div>


                        {/* VERIFIED */}

                        <div style={styles.field}>

                            <label style={styles.label}>
                                Email Verification
                            </label>

                            <p style={styles.value}>

                                {candidate.verified
                                    ? "Verified"
                                    : "Not Verified"}

                            </p>

                        </div>


                        {/* BUTTONS */}

                        {editing && (

                            <div style={styles.buttons}>

                                <button
                                    onClick={
                                        handleSave
                                    }
                                    disabled={saving}
                                    style={
                                        styles.saveButton
                                    }
                                >

                                    {saving
                                        ? "Saving..."
                                        : "Save Changes"}

                                </button>


                                <button
                                    onClick={
                                        handleCancel
                                    }
                                    disabled={saving}
                                    style={
                                        styles.cancelButton
                                    }
                                >
                                    Cancel
                                </button>

                            </div>

                        )}

                    </div>

                )}

            </div>

        </div>
    );
}


// =========================
// STYLES
// =========================

const styles = {

    page: {
        minHeight: "100vh",
        backgroundColor: "#f5f7fb",
        padding: "30px",
        boxSizing: "border-box"
    },

    center: {
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f7fb"
    },

    header: {
        maxWidth: "900px",
        margin: "0 auto 25px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
    },

    title: {
        margin: 0
    },

    subtitle: {
        color: "#666",
        marginTop: "5px"
    },

    card: {
        maxWidth: "900px",
        margin: "0 auto",
        backgroundColor: "white",
        padding: "30px",
        borderRadius: "12px",
        boxShadow:
            "0 4px 15px rgba(0,0,0,0.08)"
    },

    cardHeader: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "25px"
    },

    field: {
        marginBottom: "20px"
    },

    label: {
        display: "block",
        fontWeight: "bold",
        marginBottom: "7px"
    },

    value: {
        margin: 0,
        padding: "11px",
        backgroundColor: "#f8f9fa",
        borderRadius: "6px"
    },

    input: {
        width: "100%",
        padding: "12px",
        boxSizing: "border-box",
        border: "1px solid #ccc",
        borderRadius: "6px",
        fontSize: "15px"
    },

    textarea: {
        width: "100%",
        padding: "12px",
        boxSizing: "border-box",
        border: "1px solid #ccc",
        borderRadius: "6px",
        fontSize: "15px",
        resize: "vertical"
    },

    editButton: {
        padding: "10px 18px",
        border: "none",
        borderRadius: "6px",
        backgroundColor: "#007bff",
        color: "white",
        cursor: "pointer",
        fontSize: "14px"
    },

    saveButton: {
        padding: "12px 20px",
        border: "none",
        borderRadius: "6px",
        backgroundColor: "#28a745",
        color: "white",
        cursor: "pointer",
        fontSize: "15px"
    },

    cancelButton: {
        padding: "12px 20px",
        border: "none",
        borderRadius: "6px",
        backgroundColor: "#6c757d",
        color: "white",
        cursor: "pointer",
        fontSize: "15px"
    },

    logoutButton: {
        padding: "10px 18px",
        border: "none",
        borderRadius: "6px",
        backgroundColor: "#dc3545",
        color: "white",
        cursor: "pointer"
    },

    buttons: {
        display: "flex",
        gap: "12px",
        marginTop: "25px"
    },

    success: {
        padding: "12px",
        marginBottom: "20px",
        borderRadius: "6px",
        backgroundColor: "#d4edda",
        color: "#155724"
    },

    error: {
        padding: "12px",
        marginBottom: "20px",
        borderRadius: "6px",
        backgroundColor: "#f8d7da",
        color: "#721c24"
    }

};

export default CandidateDashboard;