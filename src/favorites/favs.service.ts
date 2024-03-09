import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { AlbumService } from 'src/album/album.service';
import { ArtistService } from 'src/artist/artist.service';
import { albumDB, artistsDB, favsDB, tracksDB } from 'src/db/db';
import { TrackService } from 'src/track/track.service';

@Injectable()
export class FavsService {
  constructor(
    private readonly artistService: ArtistService,
    private readonly albumService: AlbumService,
    private readonly trackService: TrackService,
  ) {}
  createFavArtist(id: string) {
    const favArtist = this.artistService.getArtistById(id);
    console.log(favArtist);
    if (!favArtist) {
      throw new UnprocessableEntityException(`Artist with id ${id} not found`);
    }
    const isFavArtist = favsDB.artists.includes(id);
    if (!isFavArtist) {
      favsDB.artists.push(favArtist.id);
    }
    return favArtist;
  }
  deleteFavArtist(id: string) {
    const artist = artistsDB.find((artist) => artist.id === id);
    if (!artist) {
      throw new NotFoundException(`Artist with id ${id} doesn't exist`);
    }
    const indexArtistId = favsDB.artists.findIndex(
      (item) => item === artist.id,
    );
    favsDB.artists.splice(indexArtistId, 1);
  }
  createFavAlbum(id: string) {
    const favAlbum = this.albumService.getAlbumById(id);
    console.log(favAlbum);
    if (!favAlbum) {
      throw new NotFoundException(`Album with id ${id} not found`);
    }
    const isFavAlbum = favsDB.albums.includes(id);
    if (!isFavAlbum) {
      favsDB.albums.push(favAlbum.id);
    }
    return favAlbum;
  }
  deleteFavAlbum(id: string) {
    const album = albumDB.find((album) => album.id === id);
    if (!album) {
      throw new NotFoundException(`Album with id ${id} doesn't exist`);
    }
    const indexAlbumId = favsDB.albums.findIndex((item) => item === album.id);
    favsDB.albums.splice(indexAlbumId, 1);
  }
  createFavTrack(id: string) {
    const favTrack = this.trackService.getTrackById(id);
    if (!favTrack) {
      throw new NotFoundException(`Track with id ${id} not found`);
    }
    const isFavTrack = favsDB.tracks.includes(id);
    if (!isFavTrack) {
      favsDB.tracks.push(favTrack.id);
    }
    return favTrack;
  }
  deleteFavTrack(id: string) {
    const track = tracksDB.find((track) => track.id === id);
    if (!track) {
      throw new NotFoundException(`Track with id ${id} doesn't exist`);
    }
    const indexTrackId = favsDB.tracks.findIndex((item) => item === track.id);
    favsDB.tracks.splice(indexTrackId, 1);
  }
  async getAll() {
    const favArts = await Promise.all(
      favsDB.artists.map(async (id) => {
        return this.artistService.getArtistById(id);
      }),
    );
    const favAlbums = await Promise.all(
      favsDB.albums.map(async (id) => {
        return this.albumService.getAlbumById(id);
      }),
    );
    const favTracks = await Promise.all(
      favsDB.tracks.map(async (id) => {
        return this.trackService.getTrackById(id);
      }),
    );
    return {
      artists: favArts,
      albums: favAlbums,
      tracks: favTracks,
    };
  }
}
