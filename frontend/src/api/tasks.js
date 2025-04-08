import axios from "axios";

const BASE_URL = "http://localhost:5000/api/tasks";

export const getTasks = (token) =>
  axios.get(BASE_URL, { headers: { Authorization: `Bearer ${token}` } });

export const createTask = (task, token) =>
  axios.post(BASE_URL, task, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const updateTask = (id, updates, token) =>
  axios.put(`${BASE_URL}/${id}`, updates, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const deleteTask = (id, token) =>
  axios.delete(`${BASE_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
