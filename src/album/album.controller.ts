import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
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
  getAlbumById(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.albumService.getAlbumById(id);
  }
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
    this.albumService.deleteAlbum(id);
  }
  @Put(':id')
  updateAlbum(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateAlbumDto: CreateAlbumDto,
  ) {
    return this.albumService.updateAlbum(id, updateAlbumDto);
  }
}
