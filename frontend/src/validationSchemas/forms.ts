// forms.ts
import z from 'zod';
import v from "validator";

// Category Schemas
export const createCategorySchema = z.object({
    name: z.string().min(1, "Full name is required.").max(100, "Name is too long."),
});

export const editCategorySchema = z.object({
    name: z.string().min(1, "Full name is required.").max(100, "Name is too long."),
});

// Product Schemas

export const createProductSchema = z.object({
    name: z.string().min(1, "Product name is required.").max(100, "Name is too long."),
    description: z.string().min(1, "Description is required.").max(1000, "Description is too long."),
    price: z.number().positive("Price must be a positive number."),
    type: z.string().min(1, "Type is required.").max(50, "Type is too long."),
    categoryIds: z.array(z.number()).nonempty("At least one category is required."),
});

export const editProductSchema = z.object({
    name: z.string().min(1, "Product name is required.").max(100, "Name is too long."),
    description: z.string().min(1, "Description is required.").max(1000, "Description is too long."),
    price: z.number().positive("Price must be a positive number."),
    type: z.string().min(1, "Type is required.").max(50, "Type is too long."),
    categoryIds: z.array(z.number()).nonempty("At least one category is required."),
});

// Offer Schemas
export const createOfferSchema = z.object({
    name: z.string().min(1, "Offer name is required.").max(100, "Name is too long."),
    description: z.string().min(1, "Description is required.").max(1000, "Description is too long."),
    offerToProducts: z.array(z.object({
        productId: z.number().min(1, "Product ID is required."),
        productQuantity: z.number().min(1, "Product quantity is required.").refine(val => !isNaN(val), "Product quantity must be a number."),
        newPrice: z.number().positive("Price must be a positive number.").refine(val => !isNaN(val), "New price must be a number."),
    }))
});

export const editOfferSchema = z.object({
    name: z.string().min(1, "Offer name is required.").max(100, "Name is too long."),
    description: z.string().min(1, "Description is required.").max(1000, "Description is too long."),
    offerToProducts: z.array(z.object({
        productId: z.number().min(1, "Product ID is required."),
        productQuantity: z.number().min(1, "Product quantity is required.").refine(val => !isNaN(val), "Product quantity must be a number."),
        newPrice: z.number().positive("Price must be a positive number.").refine(val => !isNaN(val), "New price must be a number."),
    }))
});

// User Schemas
export const createUserSchema = z.object({
    email: z.string().email("Invalid email"),
    displayName: z.string().min(1, "Display name is required.").max(100, "Display name is too long."),
    password: z.string().refine(v.isStrongPassword, "Password is weak"),
    role: z.string().min(1, "Role is required."),
});

export const editUserSchema = z.object({
    displayName: z.string().min(1, "Display name is required.").max(100, "Display name is too long."),
    role: z.string().min(1, "Role is required."),
});

// Customer Schemas
export const createCustomerSchema = z.object({
    name: z.string().min(1, "Name is required.").max(100, "Name is too long."),
    surname: z.string().min(1, "Surname is required.").max(100, "Surname is too long."),
    email: z.string().email("Invalid email"),
    phoneNumber: z.string().min(1, "Phone number is required.").max(20, "Phone number is too long."),
    productIds: z.array(z.number()).nonempty("At least one product is required."),
});

export const editCustomerSchema = z.object({
    name: z.string().min(1, "Name is required.").max(100, "Name is too long."),
    surname: z.string().min(1, "Surname is required.").max(100, "Surname is too long."),
    email: z.string().email("Invalid email"),
    phoneNumber: z.string().min(1, "Phone number is required.").max(20, "Phone number is too long."),
});

// Login and Register Schemas
export const loginSchema = z.object({
    email: z.string().email("Invalid email"),
    password: z.string().min(1, "Password cannot be empty")
});

export const registerSchema = z.object({
    displayName: z.string().min(2, "At least 2 character name is required").max(255, "Name can have only up to 255 characters"),
    email: z.string().email("Invalid email"),
    password: z.string().refine(v.isStrongPassword, "Password is weak"),
    confirmPassword: z.string().refine(v.isStrongPassword, "Password is weak"),
})
.refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});
