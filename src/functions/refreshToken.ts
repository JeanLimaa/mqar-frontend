'use client';
import Cookies from "js-cookie";

export async function refreshToken() {
    const refreshToken = Cookies.get('refreshToken') as string;

    const response = await fetch('http://localhost:3000/api/refresh/', {
        headers: { Authorization: `Bearer ${refreshToken}` },
        method: 'POST'
    });

    if(!response.ok) {
        throw new Error('Erro ao atualizar token');
    }

    const { accessToken } = await response.json();
    Cookies.set('accessToken', accessToken);
    
    return  accessToken;
};