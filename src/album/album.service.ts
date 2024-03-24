import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './create-album.dto';
import { PrismaService } from 'src/prisma.service';
import { Album } from '@prisma/client';

@Injectable()
export class AlbumService {
  constructor(private prisma: PrismaService) {}
  async getAll() {
    return await this.prisma.album.findMany();
  }
  async createAlbum(createAlbumDto: CreateAlbumDto): Promise<Album> {
    const album = await this.prisma.album.create({ data: createAlbumDto });
    return album;
  }
  async getAlbumById(id: string) {
    const album = await this.prisma.album.findUnique({ where: { id } });
    return album;
  }
  async deleteAlbum(id: string) {
    try {
      await this.prisma.album.delete({ where: { id } });
    } catch (err) {
      throw new NotFoundException(`Album with id ${id} not found`);
    }
  }
  async updateAlbum(id: string, albumDto: CreateAlbumDto) {
    try {
      const updatedAlbum = await this.prisma.album.update({
        where: { id },
        data: {
          ...albumDto,
        },
      });
      return updatedAlbum;
    } catch {
      throw new NotFoundException(`Album with id ${id} not found`);
    }
  }
}
