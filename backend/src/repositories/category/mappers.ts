import { Category } from "@prisma/client";
import { CategoryDto } from "./types";

export const categoryModelToCategoryDto = (model: Category): CategoryDto => ({
    id: model.id,
    name: model.name,
});
