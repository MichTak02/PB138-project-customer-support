import { z } from "zod";

export const createChatCommunicationRequestSchema = z.object({
    body: z.object({
        message: z.string(),
        isUserSent: z.coerce.boolean(),
        customerId: z.coerce.number(),
        userId: z.coerce.number()
    }),
});

export const getChatCommunicationRequestSchema = z.object({
    params: z.object({
        id: z.coerce.number(),
    }),
});


export const getChatCommunicationsRequestSchema = z.object({
    query: z.object({
        cursor: z.coerce.number().optional(),
        message: z.string().optional(),
        timestamp: z.coerce.date().optional(),
        isUserSent: z.coerce.boolean().optional(),
        customerId: z.coerce.number().optional(),
        userId: z.coerce.number().optional()
    }),
});

export const updateChatCommunicationRequestSchema = z.object({
    params: z.object({
        id: z.coerce.number(),
    }),
    body: z.object({
        message: z.string().optional(),
        timestamp: z.coerce.date().optional(),
        isUserSent: z.coerce.boolean().optional(),
        customerId: z.coerce.number().optional(),
        userId: z.coerce.number().optional()
    }),
});

export const deleteChatCommunicationRequestSchema = z.object({
    params: z.object({
        id: z.coerce.number(),
    }),
});