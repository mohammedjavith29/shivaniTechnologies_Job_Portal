import axios from "axios";

const API_URL = "http://localhost:8080/api/categories";

export const getCategories = () => {
    return axios.get(API_URL);
};

export const getCategoryById = (id) => {
    return axios.get(`${API_URL}/${id}`);
};

export const addCategory = (category) => {
    return axios.post(API_URL, category);
};

export const updateCategory = (id, category) => {
    return axios.put(`${API_URL}/${id}`, category);
};

export const deleteCategory = (id) => {
    return axios.delete(`${API_URL}/${id}`);
};