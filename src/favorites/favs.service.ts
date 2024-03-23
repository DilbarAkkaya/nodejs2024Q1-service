import { Injectable } from '@nestjs/common';
import { FavsResponse } from 'src/db/db';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class FavsService {
  constructor(private prisma: PrismaService) {}
  async createFavArtist(id: string) {
    const artist = await this.prisma.artist.findUnique({
      where: { id },
    });
    if (!artist) {
      throw new Error(`Artist with id ${id} not found`);
    }
    const favArtist = await this.prisma.favoriteArtist.create({
      data: { artistId: id },
    });
    return favArtist;
  }
  async deleteFavArtist(id: string): Promise<void> {
    const favArtist = await this.prisma.favoriteArtist.findUnique({
      where: { artistId: id },
    });
    if (!favArtist) {
      throw new Error(`Favorite artist with id ${id} not found`);
    }
    await this.prisma.favoriteArtist.delete({ where: { artistId: id } });
    return;
  }
  async createFavAlbum(id: string) {
    const album = await this.prisma.album.findUnique({
      where: { id },
    });
    if (!album) {
      throw new Error(`Album with id ${id} not found`);
    }
    const favAlbum = await this.prisma.favoriteAlbum.create({
      data: { albumId: id },
    });
    return favAlbum;
  }
  async deleteFavAlbum(id: string): Promise<void> {
    const favAlbum = await this.prisma.favoriteAlbum.findUnique({
      where: { albumId: id },
    });
    if (!favAlbum) {
      throw new Error(`Favorite album with id ${id} not found`);
    }
    await this.prisma.favoriteAlbum.delete({ where: { albumId: id } });
    return;
  }
  async createFavTrack(id: string) {
    const track = await this.prisma.track.findUnique({
      where: { id },
    });
    if (!track) {
      throw new Error(`Track with id ${id} not found`);
    }
    const favTrack = await this.prisma.favoriteTrack.create({
      data: { trackId: id },
    });
    return favTrack;
  }
  async deleteFavTrack(id: string): Promise<void> {
    const favTrack = await this.prisma.favoriteTrack.findUnique({
      where: { trackId: id },
    });
    if (!favTrack) {
      throw new Error(`Favorite track with id ${id} not found`);
    }
    await this.prisma.favoriteTrack.delete({ where: { trackId: id } });
    return;
  }
  async getAll(): Promise<FavsResponse> {
    const albums = await this.prisma.favoriteAlbum.findMany({
      include: {
        album: {
          select: { id: true, name: true, year: true, artistId: true },
        },
      },
    });
    const artists = await this.prisma.favoriteArtist.findMany({
      include: {
        artist: {
          select: { id: true, name: true, grammy: true },
        },
      },
    });
    const tracks = await this.prisma.favoriteTrack.findMany({
      include: {
        track: {
          select: {
            id: true,
            name: true,
            duration: true,
            artistId: true,
            albumId: true,
          },
        },
      },
    });
    return {
      albums: albums.map((fav) => fav.album),
      artists: artists.map((fav) => fav.artist),
      tracks: tracks.map((fav) => fav.track),
    };
  }
}
