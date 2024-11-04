import { useRouter } from "next/navigation";
import { useState } from "react";
import Cookies from 'js-cookie';
import api from "@/services/basicApiService";
import { AxiosError } from "axios";

export function useLogin(){
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
  
    const handleLogin = async (e: any) => {
      e.preventDefault();
      setError("");
      
      try { 
        const response = await api.post('/login', { email, password });
    
/*         if (response.status !== 200) {
          const { error } = await response.data;
          setError(error || "Erro ao fazer login");
          return;
        } */
        
        const { accessToken, refreshToken } = await response.data;
        Cookies.set('accessToken', accessToken);
        Cookies.set('refreshToken', refreshToken);
    
        router.push('/admin/home');
      } catch (error) {
          if(error instanceof AxiosError) {
            setError(error.response?.data.error || "Erro ao fazer login");
            return;
          }

          setError("Erro desconhecido");
      }
    };

    return {
        email,
        setEmail,
        password,
        setPassword,
        error,
        handleLogin
    }
}