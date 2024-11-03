'use client'
import Typography from "@/components/atoms/Typography/Typography";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
import { useGetUser } from "@/hooks/useGetUser";
import { useState } from "react";
import Cookies from "js-cookie";
import api from "@/services/apiService";
import { refreshToken } from "@/functions/refreshToken";

export default function Account() {
    const { token, user } = useGetUser();
    const { toast } = useToast();
    const [switchPassword, setSwitchPassword] = useState(false);
    const [email, setEmail] = useState(user.email);
    const [username, setUsername] = useState(user.username);    
    //const [cpf, setCpf] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    
    const handleSubmit = async () => {
        const userData = {
            email,
            //cpf,
            username,
            ...(switchPassword && { currentPassword, newPassword }), // Adiciona senhas somente se o switch estiver ativado
        };

        try {
            console.log(userData)
            const response = await api.put('/users/', userData, {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
/*             const response = await fetch('http://localhost:3000/api/users/', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(userData),
            }); */
            
            if (response.status !== 200) {
                const errorData = response.data;
                throw new Error(errorData.error || 'Erro ao atualizar usuário');
            }

            if (switchPassword) {
                setCurrentPassword('');
                setNewPassword('');
                setSwitchPassword(false);
            }

            await refreshToken();

            toast({description: 'Usuário atualizado com sucesso', variant: 'success'});
        } catch (error) {
            if (error instanceof Error) {
                toast({
                    title: 'Erro ao atualizar o usuário',
                    variant: 'error',
                    description: error.message, 
                });

                return;
            } 
            toast({
                title: 'Erro desconhecido',
                variant: 'error',
                description: 'Um erro inesperado ocorreu.',
            });
        }
    };

    return (
        <>
        <main className="min-h-screen bg-white flex flex-col p-14 flex-1 items-center justify-center">
            <div className="text-sm text-slate-700">
                <h4 className="text-gray-500 w-1/2 mb-4">
                    Faça mudanças para seu usuario aqui. Clique em salvar mudanças para confirmar e salvar.
                </h4>
                <div className="flex flex-col gap-5">
                    <div>
                        <label htmlFor="email">Email</label>
                        <Input 
                            id="email" 
                            placeholder="example@email.com" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    {/* <div>
                        <label htmlFor="cpf">CPF</label>
                        <Input 
                            id="cpf" 
                            placeholder="000.000.000-00" 
                            value={cpf}
                            onChange={(e) => setCpf(e.target.value)}
                        />
                    </div> */}
                    <div>
                        <label htmlFor="name">Nome</label>
                        <Input 
                            id="name" 
                            placeholder="John Doe" 
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-3">
                        <Switch 
                            className="data-[state=checked]:bg-slate-700"
                            onCheckedChange={(e) => setSwitchPassword(e)} 
                        />
                        <p>Alterar senha</p>
                    </div>
                    {switchPassword && (
                        <>
                            <div>
                                <label htmlFor="currentPassword">Senha atual</label>
                                <Input 
                                    id="currentPassword" 
                                    placeholder="********" 
                                    type="password"
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="newPassword">Nova senha</label>
                                <Input 
                                    id="newPassword" 
                                    placeholder="********" 
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                            </div>
                        </>
                    )}
                    <Button className="bg-slate-700" onClick={handleSubmit}>
                        Salvar mudanças
                    </Button>
                </div>
            </div>
        </main>
        <Toaster />
        </>
    );
};
