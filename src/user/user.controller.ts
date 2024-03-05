import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { СreateUserDto } from './create-user.dto';
import { UpdatePasswordDto } from './update-user.dto';

@Controller('user')
export class UserController {
  @Get()
  getAll() {
    return 'get users';
  }
  @Get(':id')
  getOne(@Param('id') id: string): string {
    return id;
  }
  @Post()
  create(@Body() createUserDto: СreateUserDto) {
    return createUserDto;
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return 'remove' + id;
  }
  @Put(':id')
  update(@Body() updateUserDto: UpdatePasswordDto) {
    return updateUserDto;
  }
}
