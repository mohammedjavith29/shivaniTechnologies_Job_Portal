import axios from "axios";

const API_URL = "http://localhost:8080/api/designations";

export const getDesignations = () => axios.get(API_URL);

export const addDesignation = (designation) =>
    axios.post(API_URL, designation);

export const updateDesignation = (id, designation) =>
    axios.put(`${API_URL}/${id}`, designation);

export const deleteDesignation = (id) =>
    axios.delete(`${API_URL}/${id}`);