'use client';
import api from "@/services/basicApiService";
import Cookies from "js-cookie";

export async function refreshToken() {
    const refreshToken = Cookies.get('refreshToken') as string;

    const response = await api.post('/refresh/', {}, {
        headers: { Authorization: `Bearer ${refreshToken}` },
    });

    if(response.status !== 200) {
        throw new Error('Erro ao atualizar token');
    }

    const { accessToken } = await response.data;
    Cookies.set('accessToken', accessToken);
    
    return  accessToken;
};