import { UserEntity } from 'src/user/user.entity';
import { Track } from '../track/track.entity';
import { Artist } from '../artist/artist.entity';

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
