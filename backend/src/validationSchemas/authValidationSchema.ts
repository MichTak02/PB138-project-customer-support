import { z } from "zod";
import v from "validator";

export const registerRequestSchema = z.object({
    body: z
        .object({
            email: z.string().email(),
            displayName: z.string().min(1).max(255),
            password: z.string().refine(v.isStrongPassword),
            confirmPassword: z.string().refine(v.isStrongPassword),
        })
        .refine((data) => data.password === data.confirmPassword, {
            message: "Passwords do not match",
            path: ["confirmPassword"],
        }),
});