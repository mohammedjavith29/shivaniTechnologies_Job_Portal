import axios from "axios";

const API_URL = "http://localhost:8080/api/applications";

export const getApplications = () =>
    axios.get(API_URL);

export const getApplicationById = (id) =>
    axios.get(`${API_URL}/${id}`);

export const addApplication = (application) =>
    axios.post(API_URL, application);

export const updateApplication = (id, application) =>
    axios.put(`${API_URL}/${id}`, application);

export const deleteApplication = (id) =>
    axios.delete(`${API_URL}/${id}`);