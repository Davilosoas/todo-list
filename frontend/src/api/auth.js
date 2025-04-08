import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL
  ? `${process.env.REACT_APP_API_URL}/api/auth`
  : "http://localhost:5000/api/auth";

export const loginUser = (data) => axios.post(`${BASE_URL}/login`, data);
export const registerUser = (data) => axios.post(`${BASE_URL}/register`, data);
