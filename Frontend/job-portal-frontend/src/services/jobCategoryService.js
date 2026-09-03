import api from "./api";

export const getCategories = () => {
    return api.get("/categories");
};

export const getCategoryById = (id) => {
    return api.get(`/categories/${id}`);
};

export const addCategory = (category) => {
    return api.post("/categories", category);
};

export const updateCategory = (id, category) => {
    return api.put(`/categories/${id}`, category);
};

export const deleteCategory = (id) => {
    return api.delete(`/categories/${id}`);
};