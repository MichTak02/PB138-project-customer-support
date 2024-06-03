import { z } from "zod";
import v from 'validator'
import {RoleValues} from "../repositories/user/types";

export const createUserRequestSchema = z.object({
    body: z.object({
        email: z.string().email(),
        displayName: z.string().min(1).max(255),
        password: z.string().refine(v.isStrongPassword),
        role: z.enum([RoleValues.REGULAR, RoleValues.ADMIN])
    }),
});

export const getUserRequestSchema = z.object({
    params: z.object({
        id: z.coerce.number(),
    }),
});


export const getUsersRequestSchema = z.object({
    query: z.object({
        cursor: z.coerce.number().optional(),
        email: z.string().email().optional(),
        displayName: z.string().min(1).max(255).optional(),
        createdOn: z.coerce.date().optional(),
        role: z.enum([RoleValues.REGULAR, RoleValues.ADMIN]).optional(),
    }),
});

export const updateUserRequestSchema = z.object({
    params: z.object({
        id: z.coerce.number(),
    }),
    body: z.object({
        displayName: z.string().min(1).max(255).optional(),
        createdOn: z.coerce.date().optional(),
        role: z.enum([RoleValues.REGULAR, RoleValues.ADMIN]).optional(),
    }),
});

export const deleteUserRequestSchema = z.object({
    params: z.object({
        id: z.coerce.number(),
    }),
});