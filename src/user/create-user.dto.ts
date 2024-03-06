import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsDefined()
  @IsString()
  login: string;

  @IsString()
  @IsNotEmpty()
  @IsDefined()
  password: string;
}
