import axios from "axios";

// Detect environment and use correct API URL
const BASE_URL =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.MODE === "production"
    ? "https://rag-chatbot-backend.vercel.app/api" // live backend URL
    : "http://localhost:5000/api"); // local backend URL

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
