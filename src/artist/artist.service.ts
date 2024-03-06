import { Injectable } from '@nestjs/common';
import { artistsDB } from 'src/db/db';

@Injectable()
export class ArtistService {
  getAll() {
    return artistsDB;
  }
}
