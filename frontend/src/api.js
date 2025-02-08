import axios from "axios";

const API = axios.create({
  baseURL: "https://sistemagaleriamern.onrender.com/api", // URL del backend desplegado en Render
  headers: {
    "Content-Type": "application/json",
  },
});

export default API;
