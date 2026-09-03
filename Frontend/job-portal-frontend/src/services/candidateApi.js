import axios from "axios";

const API_URL = "http://localhost:8080/api/candidates";

const candidateApi = {

    // =========================
    // LOGIN
    // =========================

    login: async (email, password) => {

        const response = await axios.post(
            `${API_URL}/login`,
            {
                email,
                password
            }
        );

        return response.data;
    },


    // =========================
    // GET LOGGED-IN PROFILE
    // =========================

    getProfile: async () => {

        const token =
            localStorage.getItem("candidateToken");

        const response = await axios.get(
            `${API_URL}/profile`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        return response.data;
    },


    // =========================
    // UPDATE PROFILE
    // =========================

    updateProfile: async (id, profile) => {

        const token =
            localStorage.getItem("candidateToken");

        const response = await axios.put(
            `${API_URL}/${id}`,
            profile,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            }
        );

        return response.data;
    }

};

export default candidateApi;