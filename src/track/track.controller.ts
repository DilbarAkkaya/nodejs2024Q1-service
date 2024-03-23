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
  createTrack(@Body() createTrackDto: CreateTrackDto) {
    return this.trackService.createTrack(createTrackDto);
  }
  @Get(':id')
  @HttpCode(200)
  async getTrackById(@Param('id', new ParseUUIDPipe()) id: string) {
    const track = await this.trackService.getTrackById(id);
    if (!track) {
      throw new HttpException('Artist is not found', HttpStatus.NOT_FOUND);
    }
    return track;
  }
  @Delete(':id')
  @HttpCode(204)
  async deleteTrack(@Param('id', new ParseUUIDPipe()) id: string) {
    const track = await this.trackService.deleteTrack(id);
    if (track !== undefined) {
      throw new HttpException('Track is not found', HttpStatus.NOT_FOUND);
    }
  }
  @Put(':id')
  updateTrack(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateTrackDto: CreateTrackDto,
  ) {
    return this.trackService.updateTrack(id, updateTrackDto);
  }
}
