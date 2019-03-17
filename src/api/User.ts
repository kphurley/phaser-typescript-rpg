import {ApiProvider} from './ApiProvider';

interface Credential {
  password: string;
}

export interface User {
  user: {
    id?: number; email: string; name: string; username: string;
    credential?: Credential;
  };
}

export const userApi = new ApiProvider<User>('/users');
export const myUserApi = new ApiProvider<User>('/my_user');
