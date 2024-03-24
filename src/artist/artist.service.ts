import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from './create-artist.dto';
import { PrismaService } from 'src/prisma.service';
import { Artist } from '@prisma/client';

@Injectable()
export class ArtistService {
  constructor(private prisma: PrismaService) {}
  async getAll() {
    return await this.prisma.artist.findMany();
  }
  async createArtist(createArtistDto: CreateArtistDto): Promise<Artist> {
    const artist = await this.prisma.artist.create({ data: createArtistDto });
    return artist;
  }
  async getArtistById(id: string) {
    const artist = await this.prisma.artist.findUnique({ where: { id } });
    return artist;
  }

  async deleteArtist(id: string) {
    try {
      await this.prisma.artist.delete({ where: { id } });
    } catch (err) {
      throw new NotFoundException(`Artist with id ${id} not found`);
    }
  }
  async updateArtist(id: string, artistDto: CreateArtistDto) {
    try {
      const updatedArtist = await this.prisma.artist.update({
        where: { id },
        data: {
          ...artistDto,
        },
      });
      return updatedArtist;
    } catch {
      throw new NotFoundException(`Artist with id ${id} not found`);
    }
  }
}
