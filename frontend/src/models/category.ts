import { BaseModelId } from "./base";

export type CategoryDto = BaseModelId & {
    name:                string
}

export type CategoryCreateDto = Omit<CategoryDto, "id">;
export type CategoryUpdateDto = Partial<CategoryCreateDto>;

export type CategoryFilters = Partial<CategoryDto>;
