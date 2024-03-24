import {
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  UnprocessableEntityException,
  UseInterceptors,
} from '@nestjs/common';
import { FavsService } from './favs.service';
import { StatusCodes } from 'http-status-codes';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('favs')
export class FavsController {
  constructor(private readonly favService: FavsService) {}
  @Post('artist/:id')
  async createFavArtist(@Param('id', new ParseUUIDPipe()) id: string) {
    try {
      return await this.favService.createFavArtist(id);
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
  async createFavAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
    try {
      return await this.favService.createFavAlbum(id);
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
  async createFavTrack(@Param('id', new ParseUUIDPipe()) id: string) {
    try {
      return await this.favService.createFavTrack(id);
    } catch (err) {
      throw new UnprocessableEntityException(err);
    }
  }
  @Delete('track/:id')
  @HttpCode(StatusCodes.NO_CONTENT)
  async deleteTrack(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.favService.deleteFavTrack(id);
  }
  @Get()
  getAll() {
    return this.favService.getAll();
  }
}
