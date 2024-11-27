import { signUpSchema } from "@/schemas/signup";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FormValues, Errors } from "@/interfaces/auth/register.interface";
import { useToast } from "@/hooks/use-toast";
import api from "@/services/basicApiService";

export function useRegister() {
    const router = useRouter();
    const { toast } = useToast();
    
    const [isLoading, setIsLoading] = useState(false);
    const [formValues, setFormValues] = useState<FormValues>({
        username: "",
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState<Errors>({ username: "", email: "", password: "", generalistError: "" });

    const handleChange = (e: { target: { id: any; value: any; }; }) => {
        const { id, value } = e.target;
        setFormValues((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        setIsLoading(true);
        setErrors({ username: "", email: "", password: "", generalistError: "" });
        
        e.preventDefault();
        // Validação dos dados com o Zod
        const validationResult = signUpSchema.safeParse(formValues);

        if (!validationResult.success) {
            // Converte os erros de validação para um objeto de mensagens de erro
            const formattedErrors = validationResult.error.flatten().fieldErrors;
            setErrors({
                username: formattedErrors.username?.[0] || "",
                email: formattedErrors.email?.[0] || "",
                password: formattedErrors.password?.[0] || "",
                generalistError: "",
            });

            setIsLoading(false);
            return;
        }
        
        try {
            const apiResult = await api.post("/register", formValues, {
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if(apiResult.status !== 201) {
                const { error } = await apiResult.data;
                setErrors((prev) => ({
                    ...prev,
                    generalistError: error || "Erro genérico no servidor. Por favor, tente novamente ou contate o suporte.",
                }));
                return;
            }
            
            toast({title: "Sucesso!", description: "Registro realizado com sucesso.", variant: "success"});

            router.push("/auth/login");
            return;
        } catch (error: any) {
            if (error.response.data.error) {
                setErrors((prev) => ({
                    ...prev,
                    generalistError: error.response.data.error,
                }));
                return;
            }

            setErrors((prev) => ({
                ...prev,
                generalistError: "Erro de conexão. Por favor, verifique sua conexão e tente novamente.",
            }));
        } finally {
            setIsLoading(false);
        }
    }

    return {
        formValues,
        errors,
        handleChange,
        handleSubmit,
        isLoading
    };
}