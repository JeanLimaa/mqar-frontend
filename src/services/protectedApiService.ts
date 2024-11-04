import { toast } from '@/hooks/use-toast';
import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
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

    if (isTokenExpired(token)) { 
      token = await refreshAccessToken();
      saveAccessToken(token);
    }

    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

async function refreshAccessToken() {
    const refreshToken = getRefreshToken();

    const response = await api.post('/refresh', { refreshToken });

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
    window.location.href = "/auth/login";
}

export default api;
