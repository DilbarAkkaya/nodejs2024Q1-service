import { UserEntity } from 'src/user/user.entity';
import { Track } from '../track/trackEntity';

export const usersDB: User[] = [];
export const artistsDB: Artist[] = [];
export const tracksDB: Track[] = [];

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
