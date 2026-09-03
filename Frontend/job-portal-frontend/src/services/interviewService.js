import axios from "axios";

const API_URL = "http://localhost:8080/api/interviews";

export const getInterviews = () =>
    axios.get(API_URL);

export const getInterviewById = (id) =>
    axios.get(`${API_URL}/${id}`);

export const addInterview = (interview) =>
    axios.post(API_URL, interview);

export const updateInterview = (id, interview) =>
    axios.put(`${API_URL}/${id}`, interview);

export const deleteInterview = (id) =>
    axios.delete(`${API_URL}/${id}`);