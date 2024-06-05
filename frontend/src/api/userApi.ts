import BaseApi from './baseApi';
import { User, UserBasic } from '../models/user';

const USERS_PREFIX = '/users';

async function getAllUsers() {
  return BaseApi.getAll<User[]>(USERS_PREFIX);
}

async function createUser(user: UserBasic) {
  return BaseApi.postSingle<User>(USERS_PREFIX, user);
}

async function updateUser(id: number, user: UserBasic) {
  return BaseApi.putSingle<User>(`${USERS_PREFIX}/${id}`, user);
}

async function deleteUser(id: number) {
  return BaseApi.deleteSingle<User>(`${USERS_PREFIX}/${id}`);
}

const UsersApi = {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
};

export default UsersApi;
