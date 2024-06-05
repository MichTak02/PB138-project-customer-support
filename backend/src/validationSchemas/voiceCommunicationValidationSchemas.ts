import { z } from "zod";

export const createVoiceCommunicationRequestSchema = z.object({
    body: z.object({
        start: z.coerce.date(),
        end: z.coerce.date(),
        isUserStarted: z.coerce.boolean(),
        customerId: z.coerce.number(),
        userId: z.coerce.number(),
    }),
});

export const getVoiceCommunicationRequestSchema = z.object({
    params: z.object({
        id: z.coerce.number(),
    }),
});


export const getVoiceCommunicationsRequestSchema = z.object({
    query: z.object({
        cursor: z.coerce.number().optional(),
        start: z.coerce.date().optional(),
        end: z.coerce.date().optional(),
        isUserStarted: z.coerce.boolean().optional(),
        customerId: z.coerce.number().optional(),
        userId: z.coerce.number().optional(),
    }),
});

export const updateVoiceCommunicationRequestSchema = z.object({
    params: z.object({
        id: z.coerce.number(),
    }),
    body: z.object({
        start: z.coerce.date().optional(),
        end: z.coerce.date().optional(),
        isUserStarted: z.coerce.boolean().optional(),
        customerId: z.coerce.number().optional(),
        userId: z.coerce.number().optional(),
    }),
});

export const deleteVoiceCommunicationRequestSchema = z.object({
    params: z.object({
        id: z.coerce.number(),
    }),
});

export const getAudioFileRequestSchema = z.object({
    params: z.object({
        id: z.coerce.number()
    })
})