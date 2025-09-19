import axios from "axios";

// Read from environment variable, fallback to default if not set
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const sendMessage = (sessionId, message) =>
  axios.post(`${BASE_URL}/chat/send/${sessionId}`, { message });

export const getHistory = (sessionId) =>
  axios.get(`${BASE_URL}/chat/history/${sessionId}`);

export const clearSession = (sessionId) =>
  axios.delete(`${BASE_URL}/chat/clear/${sessionId}`);

export const getLatestNews = () =>
  axios.get(`${BASE_URL}/news/latest`);

export const searchNews = (query) =>
  axios.post(`${BASE_URL}/news/search`, { query });
