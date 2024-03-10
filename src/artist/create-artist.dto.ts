import { IsBoolean, IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class CreateArtistDto {
  @IsNotEmpty()
  @IsDefined()
  @IsString()
  name: string;

  @IsBoolean()
  @IsNotEmpty()
  @IsDefined()
  grammy: boolean;
}
