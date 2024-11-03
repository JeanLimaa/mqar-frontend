import { z } from "zod";

const passwordSchema = z
  .string()
  .min(8, "A senha deve ter no mínimo 8 caracteres")
  .regex(/[A-Z]/, "A senha deve conter pelo menos uma letra maiúscula")
  .regex(/[a-z]/, "A senha deve conter pelo menos uma letra minúscula")
  .regex(/[@$!%*?&]/, "A senha deve conter pelo menos um símbolo (@, $, !, %, *, ?, &).");

export const signUpSchema = z.object({
  firstName: z.string().min(3, "Nome completo é obrigatório"),
  email: z.string().email("Email inválido"),
  password: passwordSchema,
});