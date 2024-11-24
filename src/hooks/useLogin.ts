import { useRouter } from "next/navigation";
import { useState } from "react";
import api from "@/services/basicApiService";
import axios, { AxiosError } from "axios";
import nookies from 'nookies';
import { toast } from "./use-toast";

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
        
        if (response.status !== 200) {
          const { error } = await response.data;
          setError(error || "Erro ao fazer login");
          return;
        }
        
        const { accessToken, refreshToken } = await response.data;
        nookies.set(null, 'accessToken', accessToken, { path: '/' });
        nookies.set(null, 'refreshToken', refreshToken, { path: '/' });
/*         Cookies.set('accessToken', accessToken);
        Cookies.set('refreshToken', refreshToken); */
        
        
        toast({title: "Login efetuado com sucesso", variant: "success"});
        
        //await revalidatePath("/admin/home");
        router.refresh();
        //router.push('/admin/home');
        //toast({description: "Login efetuado com sucesso", variant: "success"});
/*         setTimeout(() => {
          router.push('/admin/home');
        }, 1000); */
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