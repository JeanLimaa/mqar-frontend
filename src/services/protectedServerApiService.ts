import axios from 'axios';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import basicApi from './basicApiService';
import { refreshToken } from './refreshToken';

const baseApiUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL
const nextBaseApiUrl = process.env.NEXT_PUBLIC_NEXT_API_URL;

const api = axios.create({
  baseURL: baseApiUrl
});

api.interceptors.request.use(
  async (config) => {
    try {
      let accessToken = cookies().get('accessToken')?.value;

      if (!accessToken || isTokenExpired(accessToken)) {
        console.log('Token expirado, atualizando...');
        const newAccessToken = await refreshToken();
        accessToken = newAccessToken;
      };

      config.headers.Authorization = `Bearer ${accessToken}`;
      return config;

    } catch (error) {
      console.error('Erro ao obter token:', error);
      throw error;
    }
  },
  (error) => Promise.reject(error)
);

function isTokenExpired(token: string | undefined): boolean {
  if(!token) return true;

  const splited = token.split('.')[1];
  if(!splited) return true;

  const expiry = JSON.parse(atob(splited)).exp;
  return (expiry * 1000) < Date.now();
}

export default api