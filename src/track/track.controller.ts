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
import { CreateTrackDto } from './create-track.dto';
import { TrackService } from './track.service';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}
  @Get()
  getAll() {
    return this.trackService.getAll();
  }
  @Post()
  createTrack(@Body() createArtistDto: CreateTrackDto) {
    return this.trackService.createTrack(createArtistDto);
  }
  @Get(':id')
  getTrackById(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.trackService.getTrackById(id);
  }
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteTrack(@Param('id', new ParseUUIDPipe()) id: string) {
    this.trackService.deleteTrack(id);
  }
  @Put(':id')
  updateTrack(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateTrackDto: CreateTrackDto,
  ) {
    return this.trackService.updateArtist(id, updateTrackDto);
  }
}
