import { z } from "zod";

export const createUserSchema = z.object({
    username: z.string().min(1),
    password: z.string().min(6),
    name: z.string().min(1),
    role: z.enum(["USER", "PROJECT_MANAGER"]),
})

export type CreateUserInput = z.infer<typeof createUserSchema>

export const userDV: CreateUserInput = {
    username: "",
    password: "",
    name: "",
    role: "USER",
}