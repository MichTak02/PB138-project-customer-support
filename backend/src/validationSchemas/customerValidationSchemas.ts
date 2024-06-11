import { z } from "zod";
import v from 'validator'

export const createCustomerRequestSchema = z.object({
    body: z.object({
        name: z.string().min(1).max(255),
        surname: z.string().min(1).max(255),
        email: z.string().email(),
        phoneNumber: z.string().min(1).refine(v.isMobilePhone),
        productIds: z.array(z.coerce.number()),
    }),
});

export const getCustomerRequestSchema = z.object({
    params: z.object({
        id: z.coerce.number(),
    }),
});


export const getCustomersRequestSchema = z.object({
    query: z.object({
        cursor: z.coerce.number().optional(),
        name: z.string().min(1).max(255).optional(),
        surname: z.string().min(1).max(255).optional(),
        email: z.string().optional(),
        phoneNumber: z.string().min(1).optional(),
        productIds: z.array(z.coerce.number()).optional(),
    }),
});

export const updateCustomerRequestSchema = z.object({
    params: z.object({
        id: z.coerce.number(),
    }),
    body: z.object({
        name: z.string().min(1).max(255).optional(),
        surname: z.string().min(1).max(255).optional(),
        email: z.string().email().optional(),
        phoneNumber: z.string().min(1).refine(v.isMobilePhone).optional(),
        productIds: z.array(z.coerce.number()).optional(),
    }),
});

export const deleteCustomerRequestSchema = z.object({
    params: z.object({
        id: z.coerce.number(),
    }),
});
