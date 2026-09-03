import axios from "axios";

const API_URL = "http://localhost:8080/api/mail";

export const sendSingleMail = (data) => {
  return axios.post(`${API_URL}/single`, data);
};

export const sendBulkMail = (data) => {
  return axios.post(`${API_URL}/bulk`, data);
};