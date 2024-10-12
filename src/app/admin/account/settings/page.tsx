'use client'
import Typography from "@/components/atoms/Typography/Typography";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";

export default function Account() {
    const [switchPassword, setSwitchPassword] = useState(false);

    return (
        <main className="min-h-screen bg-white flex flex-col p-14 flex-1 items-center justify-center">
            <div className="text-sm text-slate-700">
                <h4 className="text-gray-500 w-1/2 mb-4">
                    Faça mudanças para seu usuario aqui. Clique em salvar mudanças para confirmar e salvar.
                </h4>
                <div className="flex flex-col gap-5">
                    <div>
                        <label htmlFor="email">Email</label>
                        <Input id="email" placeholder="example@email.com" />
                    </div>
                    <div>
                        <label htmlFor="cpf">CPF</label>
                        <Input id="cpf" placeholder="000.000.000-00" />
                    </div>
                    <div>
                        <label htmlFor="name">Nome</label>
                        <Input id="name" placeholder="John Doe" />
                    </div>
                    <div className="flex gap-3">
                        <Switch 
                        className="data-[state=checked]:bg-slate-700"
                            onCheckedChange={(e) => setSwitchPassword(e.valueOf())} 
                        />
                        <p>Alterar senha</p>
                    </div>
                    {switchPassword && (
                        <>
                            <div>
                                <label htmlFor="password">Senha atual</label>
                                <Input id="password" placeholder="********" />
                            </div>
                            <div>
                                <label htmlFor="password">Nova senha</label>
                                <Input id="password" placeholder="********" />
                            </div>
                        </>
                    )}
                    <Button className="bg-slate-700">
                        Salvar mudanças
                    </Button>
                </div>
            </div>
        </main>
    );
};