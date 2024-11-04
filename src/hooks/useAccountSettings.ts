import { useToast } from "@/hooks/use-toast";
import { useGetUser } from "@/hooks/useGetUser";
import { useState } from "react";
import api from "@/services/protectedApiService";
import { refreshToken } from "@/functions/refreshToken";
import { AxiosError } from "axios";
import { accountSettingsSchema } from "@/schemas/accountSettings";

export function useAccountSettings() {
    const { user } = useGetUser();
    const { toast } = useToast();
    const [switchPassword, setSwitchPassword] = useState(false);
    const [formValues, setFormValues] = useState({
        email: user?.email,
        username: user?.username,
        currentPassword: '',
        newPassword: '',
    });
    const [errors, setErrors] = useState({
        email: '',
        username: '',
        currentPassword: '',
        newPassword: '',
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormValues(prev => ({ ...prev, [id]: value }));
    };

    const handleSwitchPasswordChange = (value: boolean) => {
        setSwitchPassword(value);
        
        setFormValues(prev => ({
            ...prev,
            currentPassword: '',
            newPassword: '',
        }));

        setErrors(prev => ({
            ...prev,
            currentPassword: '',
            newPassword: '',
        }));
    }

    const handleSubmit = async () => {
        setErrors({
            username: "",
            email: "",
            currentPassword: "",
            newPassword: ""
        });
        
        const userData = {
            email: formValues.email,
            username: formValues.username,
            currentPassword: formValues.currentPassword,
            newPassword: formValues.newPassword,
            switchPassword
        };
        
        try {
            const validationResult = accountSettingsSchema.safeParse(userData);

            if(!validationResult.success){
                const { fieldErrors } = validationResult.error.flatten();
                
                setErrors({
                    username: fieldErrors.username?.[0] || "",
                    email: fieldErrors.email?.[0] || "",
                    currentPassword: fieldErrors.currentPassword?.[0] || "",
                    newPassword: fieldErrors.newPassword?.[0] || ""
                });
                return;
            }

            const response = await api.put('/users/', userData, {
                headers: { 'Content-Type': 'application/json' },
            });

            if (switchPassword) {
                setFormValues(prev => ({
                    ...prev,
                    currentPassword: '',
                    newPassword: '',
                }));
                setSwitchPassword(false);
            }

            await refreshToken();
            toast({ description: 'Usuário atualizado com sucesso', variant: 'success' });
        } catch (error) {
            const errorMessage = error instanceof AxiosError ? error.response?.data.error : 'Um erro inesperado ocorreu.';
            toast({
                title: 'Erro ao atualizar o usuário',
                variant: 'error',
                description: errorMessage,
            });
        }
    };

    return {
        errors,
        formValues,
        setFormValues,
        switchPassword,
        handleSwitchPasswordChange,
        handleChange,
        handleSubmit,
    };
}
