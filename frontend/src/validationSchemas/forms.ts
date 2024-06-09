import z from 'zod'
import v from "validator";

export const createCategorySchema = z.object({
    name: z.string().min(1, "Full name is required.").max(100, "Name is too long."),
});

export const editCategorySchema = z.object({
    name: z.string().min(1, "Full name is required.").max(100, "Name is too long."),
});

export const loginSchema = z.object({
    email: z.string().email("Invalid email"),
    password: z.string().min(1, "Password cannot be empty")
});

export const registerSchema = z.object({
    displayName: z.string().min(2, "At least 2 character name is required").max(255, "Name can have only up to 255 characters"),
    email: z.string().email("Invalid email"),
    password: z.string().refine(v.isStrongPassword, "Password is weak"),
    confirmPassword: z.string().refine(v.isStrongPassword, "Password is weak"),
})
.refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});