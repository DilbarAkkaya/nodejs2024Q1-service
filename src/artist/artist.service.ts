import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { albumDB, artistsDB, favsDB, tracksDB } from 'src/db/db';
import { CreateArtistDto } from './create-artist.dto';

@Injectable()
export class ArtistService {
  getAll() {
    return artistsDB;
  }
  createArtist(createArtistDto: CreateArtistDto) {
    const newArtist = {
      id: randomUUID(),
      ...createArtistDto,
    };
    artistsDB.push(newArtist);
    return newArtist;
  }
  getArtistById(id: string) {
    const artist = artistsDB.find((artist) => artist.id === id);
    if (!artist)
      throw new NotFoundException(`Artist with id ${id} doesn't exist`);
    return artist;
  }
  deleteArtist(id: string) {
    const index = artistsDB.findIndex((artist) => artist.id === id);
    if (index === -1) {
      throw new NotFoundException(`Artist with id ${id} doesn't exist`);
    }

    const indexId = favsDB.artists.findIndex((item) => item === id);
    favsDB.artists.splice(indexId, 1);
    tracksDB.map((track) => {
      if (track.artistId === id) {
        track.artistId = null;
      }
      return track;
    });
    albumDB.map((album) => {
      if (album.artistId === id) {
        album.artistId = null;
      }
      return album;
    });
    artistsDB.splice(index, 1);
  }
  updateArtist(id: string, artistDto: CreateArtistDto) {
    const index = artistsDB.findIndex((artist) => artist.id === id);
    if (index === -1) {
      throw new NotFoundException(`Artist with id ${id} doesn't exist`);
    }
    const newArtist = {
      ...artistsDB[index],
      name: artistDto.name,
      grammy: artistDto.grammy,
    };
    artistsDB[index] = newArtist;
    return newArtist;
  }
}
