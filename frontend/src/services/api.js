import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

export const getSummary = () => API.get("/summary");
export const getAnomalies = () => API.get("/anomalies");
export const getForecast = () => API.get("/forecast");