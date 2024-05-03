// customAxios.js
import axios from 'axios';

// Create a custom Axios instance
const customAxios = axios.create({
  baseURL: import.meta.env.VITE_API_SERVER,
  headers: {
    'X-API-KEY': import.meta.env.VITE_API_KEY,
  },
});

export default customAxios;