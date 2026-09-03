import axios from "axios";

const API_URL = "http://localhost:8080/api/roles";

export const getRoles = () => axios.get(API_URL);