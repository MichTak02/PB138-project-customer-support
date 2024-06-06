import BaseApi from './baseApi';
import { Customer, CustomerBasic } from '../models/customer';

const CUSTOMERS_PREFIX = '/customers';

async function getAllCustomers() {
  return BaseApi.getAll<Customer[]>(CUSTOMERS_PREFIX);
}

async function getCustomer(id: number) {
  return BaseApi.get<Customer>(`${CUSTOMERS_PREFIX}/${id}`);
}

async function createCustomer(customer: CustomerBasic) {
  return BaseApi.postSingle<Customer>(CUSTOMERS_PREFIX, customer);
}

async function updateCustomer(id: number, customer: CustomerBasic) {
  return BaseApi.putSingle<Customer>(`${CUSTOMERS_PREFIX}/${id}`, customer);
}

async function deleteCustomer(id: number) {
  return BaseApi.deleteSingle<Customer>(`${CUSTOMERS_PREFIX}/${id}`);
}

const CustomersApi = {
  getAllCustomers,
  getCustomer,
  createCustomer,
  updateCustomer,
  deleteCustomer,
};

export default CustomersApi;
