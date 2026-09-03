import axios from "axios";

const API_URL = "http://localhost:8080/api/candidates";

const candidateApi = {

    login: async (email, password) => {

        const response = await axios.post(
            `${API_URL}/login`,
            {
                email: email,
                password: password
            }
        );

        return response.data;
    },

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
    }

};

export default candidateApi;