import axios from "axios";

const API_URL = "http://localhost:8080/api/skills";

export const getAllSkills = () => {
    return axios.get(API_URL);
};

export const getAllSkillById = (id) => {
    return axios.get(`${API_URL}/${id}`);
};

export const addSkill = (skill) => {
    return axios.post(API_URL, skill);
};

export const updateSkill = (id, skill) => {
    return axios.put(`${API_URL}/${id}`, skill);
};

export const deleteSkill = (id) => {
    return axios.delete(`${API_URL}/${id}`);
};