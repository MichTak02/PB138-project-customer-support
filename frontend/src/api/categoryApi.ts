import BaseApi from './baseApi';
import { CategoryDto, CategoryCreateDto, CategoryUpdateDto, CategoryFilters } from '../models/category';

const CATEGORIES_PREFIX = '/categories';

async function getAllCategories(cursor?: number, filter?: CategoryFilters) {
    const params = cursor ? { cursor: cursor, ...filter } : { ...filter };
    return BaseApi.getAll<CategoryDto[]>(CATEGORIES_PREFIX, { params });
}

async function getCategory(id: number) {
    return BaseApi.get<CategoryDto>(`${CATEGORIES_PREFIX}/${id}`);
}

async function createCategory(category: CategoryCreateDto) {
    return BaseApi.postSingle<CategoryDto>(CATEGORIES_PREFIX, category);
}

async function updateCategory(id: number, category: CategoryUpdateDto) {
    return BaseApi.putSingle<CategoryDto>(`${CATEGORIES_PREFIX}/${id}`, category);
}

async function deleteCategory(id: number) {
    return BaseApi.deleteSingle<CategoryDto>(`${CATEGORIES_PREFIX}/${id}`);
}


const CategoriesApi = {
    getAllCategories,
    createCategory,
    updateCategory,
    deleteCategory,
    getCategory
};

export default CategoriesApi;
