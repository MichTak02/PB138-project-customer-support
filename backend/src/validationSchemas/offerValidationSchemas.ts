import { z } from "zod";

export const createOfferSchema = z.object({
  body: z.object({
    name: z.string().min(1).max(255),
    description: z.string().min(1).max(1020),
    offerToProducts: z.array(z.object({
        offerId: z.coerce.number(),
        productId: z.coerce.number(),
        productQuantity: z.coerce.number(),
        newPrice: z.coerce.number(),
    })),
  }),
});

export const getOfferSchema = z.object({
  params: z.object({
      id: z.coerce.number(),
    }),
  });


export const getOffersSchema = z.object({
  query: z.object({
    page: z.coerce.number().optional().optional(),
    name: z.string().min(1).max(255),
    description: z.string().min(1).max(1020).optional(),
  }),
});

export const updateOfferSchema = z.object({
  params: z.object({
    id: z.coerce.number(),
  }),
  body: z.object({
    name: z.string().min(1).max(255).optional(),
    description: z.string().min(1).max(1020).optional(),
    offerToProducts: z.array(z.object({
        id: z.coerce.number(),
        offerId: z.coerce.number(),
        productId: z.coerce.number(),
        productQuantity: z.coerce.number(),
        newPrice: z.coerce.number(),
    })).optional(),
  }),
});

export const deleteOfferSchema = z.object({
  params: z.object({
    id: z.coerce.number(),
  }),
});