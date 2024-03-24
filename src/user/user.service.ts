import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './create-user.dto';
import { UserEntity } from './user.entity';
import { PrismaService } from 'src/prisma.service';
import { UpdatePasswordDto } from './update-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const newUser = {
      ...createUserDto,
      version: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const userDB = await this.prisma.user.create({ data: newUser });
    return new UserEntity(userDB);
  }
  async getAll() {
    return await this.prisma.user.findMany();
  }
  async getUserById(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException(`User with id ${id} not found`);
    return new UserEntity(user);
  }

  async deleteUser(id: string) {
    try {
      await this.prisma.user.delete({ where: { id } });
    } catch (err) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
  }
  async updateUser(id: string, userDto: UpdatePasswordDto) {
    const user = await this.getUserById(id);
    if (userDto.oldPassword !== user.password) {
      throw new ForbiddenException('Old password is wrong');
    }
    try {
      const updatedUser = await this.prisma.user.update({
        where: { id },
        data: {
          version: user.version + 1,
          password: userDto.newPassword,
        },
      });
      return new UserEntity(updatedUser);
    } catch {
      throw new NotFoundException(`User with id ${id} not found`);
    }
  }
}
