import axios from "axios";

const API_URL = "http://localhost:8080/api/candidates";

export const getCandidates = () =>
    axios.get(API_URL);

export const getCandidateById = (id) =>
    axios.get(`${API_URL}/${id}`);

export const addCandidate = (candidate) =>
    axios.post(`${API_URL}/register`, candidate);

export const updateCandidate = (id, candidate) =>
    axios.put(`${API_URL}/${id}`, candidate);

export const deleteCandidate = (id) =>
    axios.delete(`${API_URL}/${id}`);