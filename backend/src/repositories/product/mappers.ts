import { categoryModelToCategoryDto } from "../category/mappers";
import { ProductDto, ProductExtendedDto, ProductWithCategories } from "./types";

export const productModelToProductDto = (model: ProductWithCategories): ProductDto => ({
    id: model.id,
    name: model.name,
    description: model.description,
    price: model.price,
    type: model.type,
    categoryIds: model.categories.map(category => category.id),
});

export const productModelToProductExtendedDto = (model: ProductWithCategories): ProductExtendedDto => ({
    id: model.id,
    name: model.name,
    description: model.description,
    price: model.price,
    type: model.type,
    categories: model.categories.map(category => categoryModelToCategoryDto(category)),
});
