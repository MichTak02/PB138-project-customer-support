import { BaseModelId } from "./base";
import { CategoryDto } from "./category";

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

export type ProductFilters = Partial<ProductCreateDto>;