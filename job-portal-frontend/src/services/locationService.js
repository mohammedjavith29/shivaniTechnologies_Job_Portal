import axios from "axios";

const API_URL = "http://localhost:8080/api/locations";

export const getLocations = () => {
    return axios.get(API_URL);
};

export const getLocationById = (id) => {
    return axios.get(`${API_URL}/${id}`);
};

export const addLocation = (location) => {
    return axios.post(API_URL, location);
};

export const updateLocation = (id, location) => {
    return axios.put(`${API_URL}/${id}`, location);
};

export const deleteLocation = (id) => {
    return axios.delete(`${API_URL}/${id}`);
};