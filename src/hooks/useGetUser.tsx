import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
import { UserInterface } from "@/interfaces/user.interface";

interface UserHookInterface {
    token: string;
    user: UserInterface;
}

export function useGetUser(): UserHookInterface {
    const token = Cookies.get('accessToken') as string;

    if (!token) {
        throw new Error('Token inválido');
    }

    // Decodifica o token e extrai as informações do usuário
    try {
        const user = jwt.decode(token) as UserInterface;
        return { token, user };
    } catch (error) {
        throw new Error('Token inválido');
    }
}



