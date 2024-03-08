import { Injectable, NotFoundException } from '@nestjs/common';
import { albumDB } from 'src/db/db';
import { CreateAlbumDto } from './create-album.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class AlbumService {
  getAll() {
    return albumDB;
  }
  createAlbum(createAlbumDto: CreateAlbumDto) {
    const newAlbum = {
      id: randomUUID(),
      ...createAlbumDto,
    };
    albumDB.push(newAlbum);
    return newAlbum;
  }
  getAlbumById(id: string) {
    const album = albumDB.find((album) => album.id === id);
    if (!album)
      throw new NotFoundException(`Album with id ${id} doesn't exist`);
    return album;
  }
  deleteAlbum(id: string) {
    const index = albumDB.findIndex((album) => album.id === id);
    if (index === -1) {
      throw new NotFoundException(`Album with id ${id} doesn't exist`);
    }
    albumDB.splice(index, 1);
  }
  updateAlbum(id: string, albumDto: CreateAlbumDto) {
    const index = albumDB.findIndex((album) => album.id === id);
    if (index === -1) {
      throw new NotFoundException(`Album with id ${id} doesn't exist`);
    }
    const newAlbum = {
      ...albumDB[index],
      ...albumDto,
    };
    albumDB[index] = newAlbum;
    return newAlbum;
  }
}
