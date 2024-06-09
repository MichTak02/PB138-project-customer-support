import {useQuery, useMutation, useQueryClient, useInfiniteQuery} from '@tanstack/react-query';
import {CategoryDto, CategoryCreateDto, CategoryUpdateDto, CategoryFilters} from '../models/category';
import ApiService, {GET_MANY_SIZE} from "../api/apiService.ts";

const categoriesApi = new ApiService<CategoryDto, CategoryDto, CategoryCreateDto, CategoryUpdateDto, CategoryFilters>('/categories');

export const useCategories = (filter?: CategoryFilters) => {
    return useInfiniteQuery({
        queryKey: ['categories'],
        queryFn: ({pageParam}) => categoriesApi.getMany(pageParam, filter),
        initialPageParam: 0,
        getNextPageParam: (lastPage, _pages) => lastPage.length === GET_MANY_SIZE ? lastPage[lastPage.length - 1].id : undefined,
    });
};

export const useCategory = (id: number) => {
    return useQuery<CategoryDto>({
        queryKey: ['category', id],
        queryFn: () => categoriesApi.get(id),
    });
};

export const useCreateCategory = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: categoriesApi.create,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['categories']});
        },
    });
};

export const useUpdateCategory = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({id, updateData}: {id: number, updateData: CategoryUpdateDto}) =>
            categoriesApi.update(id, updateData),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['categories']});
        },
    });
};


export const useDeleteCategory = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: number) => categoriesApi.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['categories']});
        },
    });
};