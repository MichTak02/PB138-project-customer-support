import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import CategoriesApi from '../api/categoryApi';
import { CategoryDto, CategoryCreateDto, CategoryUpdateDto, CategoryFilters } from '../models/category';

export const useCategories = (cursorId?: number, filter?: CategoryFilters) => {
  return useQuery<CategoryDto[]>({
    queryKey: ['categories', cursorId, filter],
    queryFn: () => CategoriesApi.getAllCategories(cursorId, filter),
  });
};

export const useCategory = (id: number) => {
  return useQuery<CategoryDto>({
    queryKey: ['category', id],
    queryFn: () => CategoriesApi.getCategory(id),
  });
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: CategoriesApi.createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, category }: { id: number; category: CategoryUpdateDto }) =>
      CategoriesApi.updateCategory(id, category),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });
};


export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => CategoriesApi.deleteCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });
};