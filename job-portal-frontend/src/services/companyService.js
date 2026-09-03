import axios from "axios";

const API_URL = "http://localhost:8080/api/companies";

// Get all companies
export const getCompanies = () => {
    return axios.get(API_URL);
};

// Get company by ID
export const getCompanyById = (id) => {
    return axios.get(`${API_URL}/${id}`);
};

// Add company
export const addCompany = (company) => {
    return axios.post(API_URL, company);
};

// Register company
export const registerCompany = (company) => {
    return axios.post(API_URL, company);
};

// Update company
export const updateCompany = (id, company) => {
    return axios.put(`${API_URL}/${id}`, company);
};

// Delete company
export const deleteCompany = (id) => {
    return axios.delete(`${API_URL}/${id}`);
};