import { toast } from '@/hooks/use-toast';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
});

/* api.interceptors.response.use(
  response => response, // Passa a resposta normalmente se não houver erro
  error => {
      const errorMessage = error.response?.data?.error || "Ocorreu um erro inesperado.";
      
      return Promise.reject(error); // Rejeita a promise para propagar o erro
  }
); */

export default api;