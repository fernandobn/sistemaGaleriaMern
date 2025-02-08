import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // URL desde la variable de entorno
  headers: {
    "Content-Type": "application/json",
  },
});

export default API;
