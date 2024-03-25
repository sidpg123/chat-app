import { z } from "zod";


export const registerInput = z.object({
    username : z.string().email(),
    password : z.string().min(6),
    name: z.string().optional(),
    bio: z.string().optional()
})


export const loginInput = z.object({
    username : z.string().email(),
    passowrd : z.string().min(6),
})

export type registerInput = z.infer<typeof registerInput>;
export type loginInput = z.infer<typeof loginInput>

