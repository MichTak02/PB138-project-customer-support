import { BaseModelId } from "./base";
import { CategoryDto } from "./category.ts";


export type ProductDto = BaseModelId & {
    name: string;
    description: string;
    price: number;
    type: string;
    categoryIds: number[];
}

export type ProductCreateDto = Omit<ProductDto, "id">;
export type ProductUpdateDto = Partial<ProductCreateDto>;

export type ProductExtendedDto = Omit<ProductDto, 'categoryIds'> & {
    categories: CategoryDto[];
}

export type ProductFilters = Partial<ProductDto>;

export type ProductDeleteResponse = {
    success: boolean;
    message?: string;
}

