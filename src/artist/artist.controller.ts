import {
  Body,
  ClassSerializerInterceptor,
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
  UseInterceptors,
} from '@nestjs/common';
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './create-artist.dto';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}
  @Get()
  getAll() {
    return this.artistService.getAll();
  }
  @Post()
  createArtist(@Body() createArtistDto: CreateArtistDto) {
    return this.artistService.createArtist(createArtistDto);
  }
  @Get(':id')
  @HttpCode(200)
  async getArtistById(@Param('id', new ParseUUIDPipe()) id: string) {
    const artist = await this.artistService.getArtistById(id);
    if (!artist) {
      throw new HttpException(
        `Artist with id ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    return artist;
  }
  @Delete(':id')
  @HttpCode(204)
  async deleteArtist(@Param('id', new ParseUUIDPipe()) id: string) {
    const track = await this.artistService.deleteArtist(id);
    if (track !== undefined) {
      throw new HttpException(
        `Artist with id ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
  }
  @Put(':id')
  updateArtist(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateArtistDto: CreateArtistDto,
  ) {
    return this.artistService.updateArtist(id, updateArtistDto);
  }
}
