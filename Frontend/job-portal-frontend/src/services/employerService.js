import axios from "axios";

const API_URL = "http://localhost:8080/api/employers";

export const getEmployers = () => axios.get(API_URL);

export const getEmployerById = (id) =>
    axios.get(`${API_URL}/${id}`);

export const addEmployer = (employer) =>
    axios.post(API_URL, employer);

export const updateEmployer = (id, employer) =>
    axios.put(`${API_URL}/${id}`, employer);

export const deleteEmployer = (id) =>
    axios.delete(`${API_URL}/${id}`);