import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import ProductsApi from '../api/productApi';
import { ProductExtendedDto, ProductCreateDto, ProductUpdateDto, ProductFilters } from '../models/product';

export const useProducts = (cursorId?: number, filter?: ProductFilters) => {
  return useQuery<ProductExtendedDto[]>({
    queryKey: ['products', cursorId, filter],
    queryFn: () => ProductsApi.getAllProducts(cursorId, filter),
  });
};

export const useProduct = (id: number) => {
  return useQuery<ProductExtendedDto>({
    queryKey: ['product', id],
    queryFn: () => ProductsApi.getProduct(id),
  });
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ProductsApi.createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, product }: { id: number; product: ProductUpdateDto }) =>
      ProductsApi.updateProduct(id, product),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => ProductsApi.deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
};
