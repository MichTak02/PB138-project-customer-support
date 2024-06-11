import {useQuery, useMutation, useQueryClient, useInfiniteQuery} from '@tanstack/react-query';
import ApiService, {GET_MANY_SIZE} from "../api/apiService.ts";
import {
    CustomerCreateDto,
    CustomerDto,
    CustomerExtendedDto,
    CustomerFilters,
    CustomerUpdateDto
} from "../models/customer.ts";

const customersApi = new ApiService<CustomerDto, CustomerExtendedDto, CustomerCreateDto, CustomerUpdateDto, CustomerFilters>('/customers');

export const useCustomers = (filter?: CustomerFilters) => {
    return useInfiniteQuery({
        queryKey: ['customers', filter],
        queryFn: ({pageParam}) => customersApi.getMany(pageParam, filter),
        initialPageParam: 0,
        getNextPageParam: (lastPage, _pages) => lastPage.length === GET_MANY_SIZE ? lastPage[lastPage.length - 1].id : undefined,
    });
};

export const useCustomer = (id: number) => {
    return useQuery({
        queryKey: ['customer', id],
        queryFn: () => customersApi.get(id),
    });
};

export const useCreateCustomer = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: customersApi.create,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['customers']});
        },
    });
};

export const useUpdateCustomer = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({id, updateData}: { id: number, updateData: CustomerUpdateDto }) =>
            customersApi.update(id, updateData),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['customers']});
        },
    });
};


export const useDeleteCustomer = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: number) => customersApi.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['customers']});
        },
    });
};