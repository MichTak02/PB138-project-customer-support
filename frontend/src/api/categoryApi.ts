import BaseApi from './baseApi';
import { Category, CategoryBasic } from '../models/category';

const CATEGORIES_PREFIX = '/categories';

async function getAllCategories() {
  return BaseApi.getAll<Category[]>(CATEGORIES_PREFIX);
}

async function getCategory(id: number) {
  return BaseApi.get<Category>(`${CATEGORIES_PREFIX}/${id}`)
}

async function createCategory(category: CategoryBasic) {
  return BaseApi.postSingle<Category>(CATEGORIES_PREFIX, category);
}

async function updateCategory(id: number, category: CategoryBasic) {
  return BaseApi.putSingle<Category>(`${CATEGORIES_PREFIX}/${id}`, category);
}

async function deleteCategory(id: number) {
  return BaseApi.deleteSingle<Category>(`${CATEGORIES_PREFIX}/${id}`);
}

const CategoriesApi = {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  getCategory
};

export default CategoriesApi;
