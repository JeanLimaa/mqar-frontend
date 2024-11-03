import { useRouter } from "next/navigation";
import { useState } from "react";
import Cookies from 'js-cookie';

export function useLogin(){
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
  
    const handleLogin = async (e: any) => {
      e.preventDefault();
      setError("");
      const response = await fetch("http://localhost:3000/api/login", 
        {
          body: JSON.stringify({email, password}), 
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
  
      if (!response.ok) {
        const { error } = await response.json();
        setError(error || "Erro ao fazer login");
        return;
      }
      
      const { accessToken, refreshToken } = await response.json();
      Cookies.set('accessToken', accessToken);
      Cookies.set('refreshToken', refreshToken);
  
      router.push('/admin/home');
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