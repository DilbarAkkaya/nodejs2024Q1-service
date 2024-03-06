import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class UpdatePasswordDto {
  @IsNotEmpty()
  @IsDefined()
  @IsString()
  oldPassword: string;

  @IsString()
  @IsNotEmpty()
  @IsDefined()
  newPassword: string;
}
