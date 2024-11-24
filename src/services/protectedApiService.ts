import axios from 'axios';

const baseApiUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL
const nextBaseApiUrl = process.env.NEXT_PUBLIC_NEXT_API_URL;

const api = axios.create({
  baseURL: baseApiUrl
});

api.interceptors.request.use(
  async (config) => {
    try {

      const response = await fetch(`${nextBaseApiUrl}/auth/getToken`, {
        credentials: 'include',
        method: 'GET',
      });
      
      const data = await response.json();
      
      if (response.ok && data.accessToken) {
        config.headers.Authorization = `Bearer ${data.accessToken}`;
        return config;
      }
      
      throw new Error('Não autenticado');
    } catch (error) {
      console.error('Erro ao obter token:', error);
      throw error;
    }
  },
  (error) => Promise.reject(error)
);

export default api