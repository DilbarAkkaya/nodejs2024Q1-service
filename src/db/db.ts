import { UserEntity } from 'src/user/user.entity';

export const usersDB: User[] = [];
export const artistsDB: Artist[] = [];

export interface User extends UserEntity {
  id: string;
  login: string;
  version: number;
  createdAt: number;
  updatedAt: number;
  password: string;
}
/* export interface IDB {
  users: User[];
  artist: Artist[];
} */

export interface Artist {
  id: string;
  name: string;
  grammy: boolean;
}
