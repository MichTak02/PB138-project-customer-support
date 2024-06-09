import {useQuery, useMutation, useQueryClient, useInfiniteQuery} from '@tanstack/react-query';
import ApiService, {GET_MANY_SIZE} from "../api/apiService.ts";
import {
    ProductCreateDto,
    ProductDto,
    ProductExtendedDto,
    ProductFilters,
    ProductUpdateDto
} from "../models/product.ts";

const productsApi = new ApiService<ProductDto, ProductExtendedDto, ProductCreateDto, ProductUpdateDto, ProductFilters>('/products');

export const useProducts = (filter?: ProductFilters) => {
    return useInfiniteQuery({
        queryKey: ['products'],
        queryFn: ({pageParam}) => productsApi.getMany(pageParam, filter),
        initialPageParam: 0,
        getNextPageParam: (lastPage, _pages) => lastPage.length === GET_MANY_SIZE ? lastPage[lastPage.length - 1].id : undefined,
    });
};

export const useProduct = (id: number) => {
    return useQuery({
        queryKey: ['product', id],
        queryFn: () => productsApi.get(id),
    });
};

export const useCreateProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: productsApi.create,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['products']});
        },
    });
};

export const useUpdateProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({id, updateData}: { id: number, updateData: ProductUpdateDto }) =>
            productsApi.update(id, updateData),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['products']});
        },
    });
};


export const useDeleteProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: number) => productsApi.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['products']});
        },
    });
};