import { z } from "zod";

export const createOrderSchema = z.object({
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

export const getOrderSchema = z.object({
  params: z.object({
      id: z.coerce.number(),
    }),
  });


export const getOrdersSchema = z.object({
  query: z.object({
    page: z.coerce.number().optional().optional(),
    name: z.string().min(1).max(255),
    description: z.string().min(1).max(1020).optional(),
  }),
});

export const updateOrderSchema = z.object({
  params: z.object({
    id: z.coerce.number(),
  }),
  body: z.object({
    name: z.string().min(1).max(255).optional(),
    description: z.string().min(1).max(1020).optional(),
    offerToProducts: z.array(z.object({
        offerId: z.coerce.number(),
        productId: z.coerce.number(),
        productQuantity: z.coerce.number(),
        newPrice: z.coerce.number(),
    })).optional(),
  }),
});

export const deleteOrderSchema = z.object({
  params: z.object({
    id: z.coerce.number(),
  }),
});