import {Product, Category} from "@prisma/client";
import {BaseModelId} from "../types";
import {CategoryDto} from "../category/types";

export type ProductWithCategories = Product & {
    categories: Category[],
}

export type Type = "PRODUCT" | "SERVICE";

export enum TypeValues {
    PRODUCT = "PRODUCT",
    SERVICE = "SERVICE"
}

export type ProductDto = BaseModelId & {
    name: string,
    description: string,
    price: number,
    type: Type,
    categoryIds: number[]
}

export type ProductCreateDto = Omit<ProductDto, "id">;
export type ProductUpdateDto = Partial<ProductCreateDto>;

export type ProductExtendedDto = Omit<ProductDto, "categoryIds"> & {
    categories: CategoryDto[],
}

export type ProductFilters = Partial<Omit<ProductCreateDto, "price"> & { minPrice: number, maxPrice: number }>;
