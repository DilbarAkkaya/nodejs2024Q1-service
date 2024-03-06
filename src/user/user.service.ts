import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './create-user.dto';
import { UpdatePasswordDto } from './update-user.dto';
import { randomUUID } from 'crypto';
import { usersDB } from 'src/db/db';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  async createUser(createUserDto: CreateUserDto) {
    const newUser = {
      id: randomUUID(),
      ...createUserDto,
      version: 1,
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
    };
    usersDB.push(newUser);
    return new UserEntity(newUser);
  }
  getAll() {
    return usersDB;
  }
  getUserById(id: string) {
    const user = usersDB.find((user) => user.id === id);
    if (!user) throw new NotFoundException(`User with id ${id} doesn't exist`);
    return new UserEntity(user);
  }

  deleteUser(id: string) {
    const index = usersDB.findIndex((user) => user.id === id);
    if (index === -1) {
      throw new NotFoundException(`User with id ${id} doesn't exist`);
    }
    usersDB.splice(index, 1);
  }
  updateUser(id: string, userDto: UpdatePasswordDto) {
    const index = usersDB.findIndex((user) => user.id === id);
    if (index === -1) {
      throw new NotFoundException(`User with id ${id} doesn't exist`);
    }
    const oldUser = usersDB[index];
    const newUser = {
      ...oldUser,
      version: oldUser.version + 1,
      updatedAt: new Date().getTime(),
      password: userDto.newPassword,
    };
    if (oldUser.password !== userDto.oldPassword) {
      throw new ForbiddenException('Old password is wrong');
    }
    usersDB[index] = newUser;
    return new UserEntity(newUser);
  }
}
