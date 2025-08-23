import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || 'https://birthday-song-generator-2.onrender.com/api',
});

export default api;
