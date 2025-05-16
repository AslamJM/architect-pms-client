import { z } from 'zod'

export const loginSchema = z.object({
    username: z.string().min(1),
    password: z.string().min(1)
})

export const inputDV: LoginInput = {
    username: "",
    password: ""
}

export type LoginInput = z.infer<typeof loginSchema>