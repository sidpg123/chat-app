import { z } from "zod";


export const registerInput = z.object({
    username : z.string().email().min(1, "please enter email"),
    password : z.string().min(6),
    name: z.string().min(1, "Please enter your name"),
    bio: z.string().min(2, "Please enter Bio")
})


export const loginInput = z.object({
    username : z.string().email(),
    password : z.string().min(6),
})

export type registerInput = z.infer<typeof registerInput>;
export type loginInput = z.infer<typeof loginInput>

