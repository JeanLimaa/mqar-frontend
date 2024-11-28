import axios from 'axios';
import { headers } from 'next/headers';

const baseApiUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL
const nextBaseApiUrl = process.env.NEXT_PUBLIC_NEXT_API_URL;

const api = axios.create({
  baseURL: baseApiUrl
});

api.interceptors.request.use(
  async (config) => {
    try {
      const response = await fetch(`${nextBaseApiUrl}/auth/getToken`, {
        headers: headers(), credentials: 'include'
      });
      const data = await response.json();

      //if(response.ok){
        config.headers.Authorization = `Bearer ${data?.accessToken}`;
        return config;
      //}

      //throw new Error('Não autenticado');
    } catch (error) {
      console.error('Erro ao obter token:', error);
      throw error;
    }
  },
  (error) => Promise.reject(error)
);

export default api