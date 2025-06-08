import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001/api", // Replace with your API base URL
  timeout: 50000, // Request timeout in milliseconds
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default api;
