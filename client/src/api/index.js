import axios from "axios";

const BASE_URL = "http://localhost:4000";

export const API = axios.create({ baseURL: BASE_URL });

// For refresh token attaching and retry
export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
