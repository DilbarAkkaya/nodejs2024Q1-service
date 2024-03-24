import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './create-album.dto';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}
  @Get()
  getAll() {
    return this.albumService.getAll();
  }
  @Post()
  createAlbum(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumService.createAlbum(createAlbumDto);
  }
  @Get(':id')
  @HttpCode(200)
  async getAlbumById(@Param('id', new ParseUUIDPipe()) id: string) {
    const album = await this.albumService.getAlbumById(id);
    if (!album) {
      throw new HttpException(
        `Album with ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    return album;
  }
  @Delete(':id')
  @HttpCode(204)
  async deleteAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
    const album = await this.albumService.deleteAlbum(id);
    if (album !== undefined) {
      throw new HttpException(
        `Album with ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
  }
  @Put(':id')
  updateAlbum(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateAlbumDto: CreateAlbumDto,
  ) {
    return this.albumService.updateAlbum(id, updateAlbumDto);
  }
}
