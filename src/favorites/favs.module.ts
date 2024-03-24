import { Module } from '@nestjs/common';
import { FavsService } from './favs.service';
import { ArtistModule } from 'src/artist/artist.module';
import { FavsController } from './favs.controller';
import { AlbumModule } from 'src/album/album.module';
import { TrackModule } from 'src/track/track.module';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [ArtistModule, AlbumModule, TrackModule],
  providers: [FavsService, PrismaService],
  controllers: [FavsController],
  exports: [FavsService],
})
export class FavsModule {}
