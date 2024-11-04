import { z } from 'zod';
import { passwordSchema } from "./password";

export const accountSettingsSchema = z.object({
    username: z.string().min(3, "Nome completo é obrigatório"),
    email: z.string().email("Email inválido"),
    currentPassword: passwordSchema.optional().optional().or(z.literal('')),
    newPassword: passwordSchema.optional().or(z.literal('')),
    switchPassword: z.boolean(),
})
.refine((data) => {
    // Se switchPassword está ativo, currentPassword e newPassword devem estar preenchidos
    if (data.switchPassword) {
        return data.currentPassword && data.newPassword;
    }
    return true;
}, {
    message: "Os campos de senha são obrigatórios quando a opção de alterar senha está ativa",
    path: ["currentPassword"], // Define onde o erro será exibido
});

