import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  UnprocessableEntityException,
} from '@nestjs/common';
import { FavsService } from './favs.service';

@Controller('favs')
export class FavsController {
  constructor(private readonly favService: FavsService) {}
  @Post('artist/:id')
  createFavArtist(@Param('id', new ParseUUIDPipe()) id: string) {
    try {
      return this.favService.createFavArtist(id);
    } catch (err) {
      throw new UnprocessableEntityException(err);
    }
  }
  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteFavArtist(@Param('id', new ParseUUIDPipe()) id: string) {
    this.favService.deleteFavArtist(id);
  }
  @Post('album/:id')
  createFavAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
    try {
      return this.favService.createFavAlbum(id);
    } catch (err) {
      throw new UnprocessableEntityException(err);
    }
  }
  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteFavAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
    this.favService.deleteFavAlbum(id);
  }
  @Post('track/:id')
  createFavTrack(@Param('id', new ParseUUIDPipe()) id: string) {
    try {
      return this.favService.createFavTrack(id);
    } catch (err) {
      throw new UnprocessableEntityException(err);
    }
  }
  @Delete('track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteFavTrack(@Param('id', new ParseUUIDPipe()) id: string) {
    this.favService.deleteFavTrack(id);
  }
  @Get()
  getAll() {
    return this.favService.getAll();
  }
}
