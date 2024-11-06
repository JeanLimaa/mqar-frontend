import axios from 'axios';

const baseApiUrl = 'http://localhost:3030/api';
const api = axios.create({
  baseURL: baseApiUrl,
});

/* api.interceptors.response.use(
  response => response, // Passa a resposta normalmente se não houver erro
  error => {
      const errorMessage = error.response?.data?.error || "Ocorreu um erro inesperado.";
      
      return Promise.reject(error); // Rejeita a promise para propagar o erro
  }
); */

export default api;