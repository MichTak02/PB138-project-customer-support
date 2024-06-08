import { z } from "zod";

export const createOfferToProductRequestSchema = z.object({
    body: z.object({
        offerId: z.coerce.number(),
        productId: z.coerce.number(),
        productQuantity: z.coerce.number(),
        newPrice: z.coerce.number().positive(),
    }),
});

export const getOfferToProductRequestSchema = z.object({
    params: z.object({
        id: z.coerce.number(),
    }),
});


export const getOffersToProductsRequestSchema = z.object({
    query: z.object({
        cursor: z.coerce.number().optional().optional(),
        id: z.coerce.number().optional(),
        offerId: z.coerce.number().optional(),
        productId: z.coerce.number().optional(),
        productQuantity: z.coerce.number().optional(),
        newPrice: z.coerce.number().positive().optional(),
    }),
});

export const updateOfferToProductRequestSchema = z.object({
    params: z.object({
        id: z.coerce.number(),
    }),
    body: z.object({
        offerId: z.coerce.number().optional(),
        productId: z.coerce.number().optional(),
        productQuantity: z.coerce.number().optional(),
        newPrice: z.coerce.number().positive().optional(),
    }),
});

export const deleteOfferToProductRequestSchema = z.object({
    params: z.object({
        id: z.coerce.number(),
    }),
});