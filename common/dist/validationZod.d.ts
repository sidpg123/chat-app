import { z } from "zod";
export declare const registerInput: z.ZodObject<{
    username: z.ZodString;
    passowrd: z.ZodString;
    name: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    username: string;
    passowrd: string;
    name?: string | undefined;
}, {
    username: string;
    passowrd: string;
    name?: string | undefined;
}>;
export declare const loginInput: z.ZodObject<{
    username: z.ZodString;
    passowrd: z.ZodString;
}, "strip", z.ZodTypeAny, {
    username: string;
    passowrd: string;
}, {
    username: string;
    passowrd: string;
}>;
export type registerInput = z.infer<typeof registerInput>;
export type loginInput = z.infer<typeof loginInput>;
