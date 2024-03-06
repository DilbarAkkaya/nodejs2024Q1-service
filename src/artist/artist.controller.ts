import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  UseInterceptors,
} from '@nestjs/common';
import { ArtistService } from './artist.service';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}
  @Get()
  getAll() {
    return this.artistService.getAll();
  }
}
