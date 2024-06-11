import {z} from "zod";

export const createProductSchema = z.object({
    body: z.object({
        name: z.string().min(1).max(255),
        description: z.string().min(1).max(1020),
        price: z.coerce.number().positive(),
        type: z.enum(["PRODUCT", "SERVICE"]),
        categoryIds: z.array(z.coerce.number()),
    }),
});

export const getProductSchema = z.object({
    params: z.object({
        id: z.coerce.number(),
    }),
});


export const getProductsSchema = z.object({
    query: z.object({
        cursor: z.coerce.number().optional(),
        id: z.coerce.number().optional(),
        name: z.string().min(1).max(255).optional(),
        description: z.string().min(1).max(1020).optional(),
        minPrice: z.coerce.number().positive().optional(),
        maxPrice: z.coerce.number().positive().optional(),
        type: z.enum(["PRODUCT", "SERVICE"]).optional(),
        categoryIds: z.array(z.coerce.number()).optional(),
    }),
});

export const updateProductSchema = z.object({
    params: z.object({
        id: z.coerce.number(),
    }),
    body: z.object({
        name: z.string().min(1).max(255).optional(),
        description: z.string().min(1).max(1020).optional(),
        price: z.coerce.number().positive().optional(),
        type: z.enum(["PRODUCT", "SERVICE"]).optional(),
        categoryIds: z.array(z.coerce.number()).optional(),
    }),
});

export const deleteProductSchema = z.object({
    params: z.object({
        id: z.coerce.number(),
    }),
});
