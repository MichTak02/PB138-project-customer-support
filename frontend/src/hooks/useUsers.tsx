import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import UsersApi from '../api/userApi';
import { User, UserBasic } from '../models/user';

export const useUsers = () => {
  return useQuery<User[]>({
    queryKey: ['users'],
    queryFn: UsersApi.getAllUsers,
  });
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: UsersApi.createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, user }: { id: number; user: UserBasic }) =>
      UsersApi.updateUser(id, user),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => UsersApi.deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};
