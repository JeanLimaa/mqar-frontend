import { z } from "zod";
import { passwordSchema } from "./password";


export const signUpSchema = z.object({
  username: z.string().min(3, "Nome completo é obrigatório"),
  email: z.string().email("Email inválido"),
  password: passwordSchema,
});