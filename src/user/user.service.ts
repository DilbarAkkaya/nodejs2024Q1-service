import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { СreateUserDto } from './create-user.dto';
import { UpdatePasswordDto } from './update-user.dto';
import crypto from 'crypto';

@Injectable()
export class UserService {
  private users = [];
  getAll() {
    return this.users;
  }
  getUserById(id: string) {
    return this.users.find((user) => user.id === id);
  }
  createUser(userDto: СreateUserDto) {
    const newUser = {
      id: crypto.randomUUID(),
      ...userDto,
      version: 0,
      createdAt: new Date().getTime(),
      updatedAt: new Date().getDate(),
    };
    this.users.push(newUser);
    return newUser;
  }
  deleteUser(id: string): boolean {
    const index = this.users.findIndex((user) => user.id === id);
    if (index !== -1) {
      this.users.splice(index, 1);
      return true;
    }
    throw new NotFoundException(`User with id ${id} doesn't exist`);
  }
  updateUser(id: string, userDto: UpdatePasswordDto) {
    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1) {
      throw new NotFoundException(`User with id ${id} doesn't exist`);
    }
    const oldUser = this.users[index];
    const newUser = {
      ...oldUser,
      version: oldUser.version + 1,
      updateAt: new Date().getTime(),
      password: userDto.newPassword,
    };
    if (oldUser.password !== userDto.newPassword) {
      throw new ForbiddenException('Old password is wrong');
    }
    this.users[index] = newUser;
    return newUser;
  }
}
