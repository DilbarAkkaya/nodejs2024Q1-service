import { UserEntity } from 'src/user/userEntitie';

export const usersDB: User[] = [];

export interface User extends UserEntity {
  id: string;
  login: string;
  version: number;
  createdAt: number;
  updatedAt: number;
  password: string;
}
export interface IDB {
  users: User[];
  albums: [];
}
