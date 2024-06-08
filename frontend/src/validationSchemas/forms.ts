import z from 'zod'

export const createCategorySchema = z.object({
    name: z.string().min(1, "Full name is required.").max(100, "Name is too long."),
});

export const editCategorySchema = z.object({
    name: z.string().min(1, "Full name is required.").max(100, "Name is too long."),
});