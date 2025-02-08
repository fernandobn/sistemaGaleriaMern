import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // Cambia esta URL si tu backend tiene otra base
  headers: {
    "Content-Type": "application/json",
  },
});

export default API;
