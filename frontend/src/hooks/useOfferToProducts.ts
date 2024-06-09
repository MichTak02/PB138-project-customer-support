import {useQuery, useMutation, useQueryClient, useInfiniteQuery} from '@tanstack/react-query';
import ApiService, {GET_MANY_SIZE} from "../api/apiService.ts";
import {
    OfferToProductCreateDto,
    OfferToProductDto,
    OfferToProductExtendedDto,
    OfferToProductFilters,
    OfferToProductUpdateDto
} from "../models/offerToProduct.ts";

const offerToProductsApi = new ApiService<OfferToProductDto, OfferToProductExtendedDto, OfferToProductCreateDto, OfferToProductUpdateDto, OfferToProductFilters>('/offerToProducts');

export const useOfferToProducts = (filter?: OfferToProductFilters) => {
    return useInfiniteQuery({
        queryKey: ['offerToProducts'],
        queryFn: ({pageParam}) => offerToProductsApi.getMany(pageParam, filter),
        initialPageParam: 0,
        getNextPageParam: (lastPage, _pages) => lastPage.length === GET_MANY_SIZE ? lastPage[lastPage.length - 1].id : undefined,
    });
};

export const useOfferToProduct = (id: number) => {
    return useQuery({
        queryKey: ['offerToProduct', id],
        queryFn: () => offerToProductsApi.get(id),
    });
};

export const useCreateOfferToProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: offerToProductsApi.create,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['offerToProducts']});
        },
    });
};

export const useUpdateOfferToProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({id, updateData}: { id: number, updateData: OfferToProductUpdateDto }) =>
            offerToProductsApi.update(id, updateData),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['offerToProducts']});
        },
    });
};


export const useDeleteOfferToProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: number) => offerToProductsApi.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['offerToProducts']});
        },
    });
};