//import Cookies from "js-cookie";
import { parseCookies } from "nookies";
import jwt from "jsonwebtoken";
import { UserInterface } from "@/interfaces/user.interface";
import { toast } from "./use-toast";

interface UserHookInterface {
    token: string;
    user: UserInterface;
}

export function useGetUser(): UserHookInterface | null{
    //const token = Cookies.get('accessToken') as string;
    const cookies = parseCookies();
    const token = cookies['accessToken'];
    
    if (!token) {
        //throw new Error('Token inválido');
        toast({description: 'Token inválido', variant: 'error'});
        console.error('Token inválido');
        return null
    }

    // Decodifica o token e extrai as informações do usuário
    try {
        const user = jwt.decode(token) as UserInterface;
        return { token, user };
    } catch (error) {
        //throw new Error('Token inválido');
        console.error('Token inválido');
        return null
    }
}



