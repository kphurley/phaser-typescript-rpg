import {ApiProvider} from './ApiProvider';

export interface User {
  id: number;
  email: string;
  name: string;
  username: string;
}

export const userApi = new ApiProvider<User>('/users');

/*
userApi.getAll()
userApi.get(187)
userApi.create(user)
userApi.update(187, user)
*/