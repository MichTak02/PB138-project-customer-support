import axios, { AxiosRequestConfig } from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:6481',
});

async function getAll<T>(path: string, config?: AxiosRequestConfig): Promise<T> {
  const response = await axiosInstance.get<T>(path, config);
  return response.data;
}

async function get<T>(path: string) {
  const response = await axiosInstance.get<T>(path);
  return response.data;
}

async function postSingle<T>(path: string, payload: unknown): Promise<T> {
  const response = await axiosInstance.post<T>(path, payload);
  return response.data;
}

async function putSingle<T>(path: string, payload: unknown): Promise<T> {
  const response = await axiosInstance.put<T>(path, payload);
  return response.data;
}

async function deleteSingle<T>(path: string): Promise<T> {
  const response = await axiosInstance.delete<T>(path);
  return response.data;
}

const BaseApi = {
  getAll,
  get,
  postSingle,
  putSingle,
  deleteSingle,
};

export default BaseApi;
