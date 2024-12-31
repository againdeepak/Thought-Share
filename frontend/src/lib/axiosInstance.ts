// src/api/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  // baseURL: "https://thought-share-lpks.onrender.com/", // Centralized base URL
  baseURL:"http://localhost:4000",
  // timeout: 5000, // Optional timeout
  headers: { 'Content-Type': 'application/json' } // Default headers
});

export default axiosInstance;
