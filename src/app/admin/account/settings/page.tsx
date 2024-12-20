'use client'
import { ErrorMessage } from "@/components/Error/ErrorMessage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useAccountSettings } from "@/hooks/useAccountSettings";

export default function Account() {
    const {
        handleChange,
        switchPassword,
        handleSwitchPasswordChange,
        handleSubmit,
        formValues,
        errors
    } = useAccountSettings();

    return (
        <>
        <main className="min-h-screen bg-white flex flex-col p-14 flex-1 items-center justify-center max-md:p-8">
            <div className="text-sm text-slate-700">
                <h4 className="text-gray-500 w-1/2 mb-4 max-md:w-3/4">
                    Faça mudanças para seu usuario aqui. Clique em salvar mudanças para confirmar e salvar.
                </h4>
                <div className="flex flex-col gap-5">
                    <div>
                        <label htmlFor="email">Email</label>
                        <ErrorMessage message={errors.email} marginLeft/>
                        <Input 
                            id="email" 
                            placeholder="example@email.com" 
                            value={formValues.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="username">Nome</label>
                        <ErrorMessage message={errors.username} marginLeft />
                        <Input 
                            id="username" 
                            placeholder="John Doe" 
                            value={formValues.username}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex gap-3">
                        <Switch 
                            className="data-[state=checked]:bg-slate-700"
                            onCheckedChange={handleSwitchPasswordChange} 
                            checked={switchPassword}
                        />
                        <p>Alterar senha</p>
                    </div>
                    {switchPassword && (
                        <>
                            <div>
                                <label htmlFor="currentPassword">Senha atual</label>
                                <ErrorMessage message={errors.currentPassword} marginLeft />
                                <Input 
                                    id="currentPassword" 
                                    placeholder="********" 
                                    type="password"
                                    value={formValues.currentPassword}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="newPassword">Nova senha</label>
                                <ErrorMessage message={errors.newPassword} marginLeft />
                                <Input 
                                    id="newPassword" 
                                    placeholder="********" 
                                    type="password"
                                    value={formValues.newPassword}
                                    onChange={handleChange}
                                />
                            </div>
                        </>
                    )}
                    <Button type="button" className="bg-slate-700" onClick={handleSubmit}>
                        Salvar mudanças
                    </Button>
                </div>
            </div>
        </main>
        {/* <Toaster /> */}
        </>
    );
};
