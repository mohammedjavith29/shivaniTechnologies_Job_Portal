import axios from "axios";

const API_URL = "http://localhost:8080/api/designations";

export const getDesignations = () => {
    return axios.get(API_URL);
};

export const getDesignationById = (id) => {
    return axios.get(`${API_URL}/${id}`);
};

export const addDesignation = (designation) => {
    return axios.post(API_URL, designation);
};

export const updateDesignation = (id, designation) => {
    return axios.put(`${API_URL}/${id}`, designation);
};

export const deleteDesignation = (id) => {
    return axios.delete(`${API_URL}/${id}`);
};