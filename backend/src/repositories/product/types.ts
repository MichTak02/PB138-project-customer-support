import { Type, Product, Category } from "@prisma/client";
import { BaseModelId } from "../types";
import { CategoryDto } from "../category/types";

export type ProductWithCategories = Product & {
    categories: Category[],
}

export type ProductDto = BaseModelId & {
    name: string,
    description: string,
    price: number,
    type: Type,
    categoryIds: number[]
}

export type ProductCreateDto = Omit<ProductDto, "id">;
export type ProductUpdateDto = Partial<ProductDto>;

export type ProductExtendedDto = Omit<ProductDto, "categoryIds"> & {
    categories: CategoryDto[],
}

export type ProductFilters = Partial<ProductCreateDto>;