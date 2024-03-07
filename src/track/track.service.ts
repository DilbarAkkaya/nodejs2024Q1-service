import { Injectable, NotFoundException } from '@nestjs/common';
import { tracksDB } from 'src/db/db';
import { CreateTrackDto } from './create-track.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class TrackService {
  getAll() {
    return tracksDB;
  }
  createTrack(createTrackDto: CreateTrackDto) {
    const newTrack = {
      id: randomUUID(),
      ...createTrackDto,
      artistId: null,
      albumId: null,
    };
    tracksDB.push(newTrack);
    return newTrack;
  }
  getTrackById(id: string) {
    const track = tracksDB.find((track) => track.id === id);
    if (!track)
      throw new NotFoundException(`Track with id ${id} doesn't exist`);
    return track;
  }
  deleteTrack(id: string) {
    const index = tracksDB.findIndex((track) => track.id === id);
    if (index === -1) {
      throw new NotFoundException(`Track with id ${id} doesn't exist`);
    }
    tracksDB.splice(index, 1);
  }
  updateArtist(id: string, trackDto: CreateTrackDto) {
    const index = tracksDB.findIndex((track) => track.id === id);
    if (index === -1) {
      throw new NotFoundException(`Track with id ${id} doesn't exist`);
    }
    const newTrack = {
      ...tracksDB[index],
      ...trackDto,
    };
    tracksDB[index] = newTrack;
    return newTrack;
  }
}
