import axios from "axios";

const API_URL = "http://localhost:8080/api/profile";

export const getProfiles = () =>
    axios.get(API_URL);

export const getProfileById = (id) =>
    axios.get(`${API_URL}/${id}`);

export const addProfile = (profile) =>
    axios.post(API_URL, profile);

export const updateProfile = (id, profile) =>
    axios.put(`${API_URL}/${id}`, profile);

export const deleteProfile = (id) =>
    axios.delete(`${API_URL}/${id}`);