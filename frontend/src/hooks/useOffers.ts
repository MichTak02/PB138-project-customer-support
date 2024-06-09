import {useQuery, useMutation, useQueryClient, useInfiniteQuery} from '@tanstack/react-query';
import ApiService, {GET_MANY_SIZE} from "../api/apiService.ts";
import {
    OfferCreateDto,
    OfferDto,
    OfferExtendedDto,
    OfferFilters,
    OfferUpdateDto
} from "../models/offer.ts";

const offersApi = new ApiService<OfferDto, OfferExtendedDto, OfferCreateDto, OfferUpdateDto, OfferFilters>('/offers');

export const useOffers = (filter?: OfferFilters) => {
    return useInfiniteQuery({
        queryKey: ['offers'],
        queryFn: ({pageParam}) => offersApi.getMany(pageParam, filter),
        initialPageParam: 0,
        getNextPageParam: (lastPage, _pages) => lastPage.length === GET_MANY_SIZE ? lastPage[lastPage.length - 1].id : undefined,
    });
};

export const useOffer = (id: number) => {
    return useQuery({
        queryKey: ['offer', id],
        queryFn: () => offersApi.get(id),
    });
};

export const useCreateOffer = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: offersApi.create,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['offers']});
        },
    });
};

export const useUpdateOffer = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({id, updateData}: { id: number, updateData: OfferUpdateDto }) =>
            offersApi.update(id, updateData),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['offers']});
        },
    });
};


export const useDeleteOffer = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: number) => offersApi.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['offers']});
        },
    });
};