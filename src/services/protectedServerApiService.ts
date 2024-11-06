//import { toast } from '@/hooks/use-toast';

import axios from 'axios';
//import Cookies from 'js-cookie';
import { cookies } from 'next/headers';
import { redirect } from "next/navigation"

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
/*         toast({
            title: 'Erro',
            description: 'Token inválido.',
            variant: 'error'
        }) */
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
  return cookies().get('accessToken')?.value;
}

function getRefreshToken() {
  return cookies().get('refreshToken')?.value;
}

function saveAccessToken(token: string) {
    cookies().set('accessToken', token);
}

function isTokenExpired(token: string) {
  const expiry = JSON.parse(atob(token.split('.')[1])).exp;
  return (expiry * 1000) < Date.now();
}

function handleUnauthenticated() {
    //const router = useRouter();
    cookies().delete('accessToken');
    cookies().delete('refreshToken');
    redirect("/auth/login");
    //window.location.href = "/auth/login";
}

export default api;
