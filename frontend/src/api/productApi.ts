import BaseApi from './baseApi';
import { Product, ProductBasic } from '../models/product';

const PRODUCTS_PREFIX = '/products';

async function getAllProducts() {
  return BaseApi.getAll<Product[]>(PRODUCTS_PREFIX);
}

async function createProduct(product: ProductBasic) {
  return BaseApi.postSingle<Product>(PRODUCTS_PREFIX, product);
}

async function updateProduct(id: number, product: ProductBasic) {
  return BaseApi.putSingle<Product>(`${PRODUCTS_PREFIX}/${id}`, product);
}

async function deleteProduct(id: number) {
  return BaseApi.deleteSingle<Product>(`${PRODUCTS_PREFIX}/${id}`);
}

const ProductsApi = {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};

export default ProductsApi;
