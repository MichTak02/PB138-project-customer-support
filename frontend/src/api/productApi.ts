import BaseApi from './baseApi';
import { ProductCreateDto, ProductUpdateDto, ProductFilters, ProductExtendedDto } from '../models/product';

const PRODUCTS_PREFIX = '/products';

async function getAllProducts(cursor?: number, filter?: ProductFilters) {
  const params = cursor ? { cursor: cursor, ...filter } : { ...filter };
  return BaseApi.getAll<ProductExtendedDto[]>(PRODUCTS_PREFIX, { params });
}

async function getProduct(id: number) {
  return BaseApi.get<ProductExtendedDto>(`${PRODUCTS_PREFIX}/${id}`);
}

async function createProduct(product: ProductCreateDto) {
  return BaseApi.postSingle<ProductExtendedDto>(PRODUCTS_PREFIX, product);
}

async function updateProduct(id: number, product: ProductUpdateDto) {
  return BaseApi.putSingle<ProductExtendedDto>(`${PRODUCTS_PREFIX}/${id}`, product);
}

async function deleteProduct(id: number) {
  return BaseApi.deleteSingle<ProductExtendedDto>(`${PRODUCTS_PREFIX}/${id}`);
}

const ProductsApi = {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
};

export default ProductsApi;
