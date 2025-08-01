import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("email inválido").min(1, "email é obrigatório"),
  password: z.string("Senha inválida").min(6, "Senha é obrigatória"),
});

export type LoginDTO = z.infer<typeof loginSchema>;
