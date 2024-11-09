import axios from 'axios';

const baseApiUrl = 'http://localhost:3030/api';
const nextBaseApiUrl = process.env.NEXT_PUBLIC_BASE_API_URL || 'http://localhost:3000/api'

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
      //console.log(data)
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
/* import { toast } from '@/hooks/use-toast';
import axios from 'axios';
import Cookies from 'js-cookie';

const baseApiUrl = 'http://localhost:3030/api';
const api = axios.create({
  baseURL: baseApiUrl,
});

// Interceptador para verificar e atualizar o token
api.interceptors.request.use(
  async (config) => {
    let token: string | undefined = getAccessToken(); 

    if (!token) {
        handleUnauthenticated();
        toast({
            title: 'Erro',
            description: 'Token inválido.',
            variant: 'error'
        })
        throw new Error('Token inválido.');
    }

    console.log("expirado: ", isTokenExpired(token));
    if (isTokenExpired(token)) { 
      token = await refreshAccessToken();
      console.log("novotoken:", token);
      saveAccessToken(token);
    }

    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

async function refreshAccessToken() {
    const refreshToken = getRefreshToken();

    const response = await axios.post(`${baseApiUrl}/refresh`, {}, {
     headers: { 
      'Content-Type': 'application/json', 
      'Authorization': `Bearer ${refreshToken}` 
    } 
    });
    const accessToken: string = response.data.accessToken;

    if (!accessToken) {
        throw new Error('Erro ao atualizar token.');
    }

    return accessToken;
}

// Funções auxiliares para obter, verificar e salvar o token
function getAccessToken() {
  return Cookies.get('accessToken');
}

function getRefreshToken() {
  return Cookies.get('refreshToken');
}

function saveAccessToken(token: string) {
    Cookies.set('accessToken', token);
}

function isTokenExpired(token: string) {
  const expiry = JSON.parse(atob(token.split('.')[1])).exp;
  return (expiry * 1000) < Date.now();
}

function handleUnauthenticated() {
    //const router = useRouter();
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');
    //window.location.href = "/auth/login";
}

export default api;
 */