import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrackDto } from './create-track.dto';
import { Track } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TrackService {
  constructor(private prisma: PrismaService) {}
  async getAll() {
    return await this.prisma.track.findMany();
  }
  async createTrack(createTrackDto: CreateTrackDto): Promise<Track> {
    const track = await this.prisma.track.create({ data: createTrackDto });
    return track;
  }
  async getTrackById(id: string) {
    const track = await this.prisma.track.findUnique({ where: { id } });
    return track;
  }
  async deleteTrack(id: string) {
    try {
      await this.prisma.track.delete({ where: { id } });
    } catch (err) {
      throw new NotFoundException(`Track with id ${id} not found`);
    }
  }
  async updateTrack(id: string, trackDto: CreateTrackDto) {
    try {
      const updatedTrack = await this.prisma.track.update({
        where: { id },
        data: {
          ...trackDto,
        },
      });
      return updatedTrack;
    } catch {
      throw new NotFoundException(`Track with id ${id} not found`);
    }
  }
}
