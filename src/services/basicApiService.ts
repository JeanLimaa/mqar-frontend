import axios from 'axios';

const baseApiUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL

const api = axios.create({
  baseURL: baseApiUrl,
});

export default api;