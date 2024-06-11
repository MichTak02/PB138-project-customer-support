import { z } from "zod";

export const createCategorySchema = z.object({
  body: z.object({
    name: z.string().min(1).max(255),
  }),
});

export const getCategorySchema = z.object({
  params: z.object({
      id: z.coerce.number(),
    }),
  });


export const getCategoriesSchema = z.object({
  query: z.object({
    cursor: z.coerce.number().optional(),
    id: z.coerce.number().optional(),
    name: z.string().optional(),
  }),
});

export const updateCategorySchema = z.object({
  params: z.object({
    id: z.coerce.number(),
  }),
  body: z.object({
    name: z.string().min(1).max(255).optional(),
  }),
});

export const deleteCategorySchema = z.object({
  params: z.object({
    id: z.coerce.number(),
  }),
});