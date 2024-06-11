import {useQuery, useMutation, useQueryClient, useInfiniteQuery} from '@tanstack/react-query';
import ApiService, {GET_MANY_SIZE} from "../api/apiService.ts";
import {
    UserCreateDto,
    UserDto,
    UserExtendedDto,
    UserFilters,
    UserUpdateDto
} from "../models/user.ts";

const usersApi = new ApiService<UserDto, UserExtendedDto, UserCreateDto, UserUpdateDto, UserFilters>('/users');

export const useUsers = (filter?: UserFilters) => {
    return useInfiniteQuery({
        queryKey: ['users', filter],
        queryFn: ({pageParam}) => usersApi.getMany(pageParam, filter),
        initialPageParam: 0,
        getNextPageParam: (lastPage, _pages) => lastPage.length === GET_MANY_SIZE ? lastPage[lastPage.length - 1].id : undefined,
    });
};

export const useUser = (id: number) => {
    return useQuery({
        queryKey: ['user', id],
        queryFn: () => usersApi.get(id),
    });
};

export const useCreateUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: usersApi.create,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['users']});
        },
    });
};

export const useUpdateUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({id, updateData}: { id: number, updateData: UserUpdateDto }) =>
            usersApi.update(id, updateData),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['users']});
        },
    });
};


export const useDeleteUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: number) => usersApi.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['users']});
        },
    });
};