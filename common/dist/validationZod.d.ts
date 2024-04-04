import { z } from "zod";
export declare const registerInput: z.ZodObject<{
    username: z.ZodString;
    password: z.ZodString;
    name: z.ZodString;
    bio: z.ZodString;
}, "strip", z.ZodTypeAny, {
    username: string;
    password: string;
    name: string;
    bio: string;
}, {
    username: string;
    password: string;
    name: string;
    bio: string;
}>;
export declare const loginInput: z.ZodObject<{
    username: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    username: string;
    password: string;
}, {
    username: string;
    password: string;
}>;
export type registerInput = z.infer<typeof registerInput>;
export type loginInput = z.infer<typeof loginInput>;
