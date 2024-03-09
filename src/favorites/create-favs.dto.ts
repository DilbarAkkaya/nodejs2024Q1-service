import { IsArray, IsDefined } from 'class-validator';

export class CreateFavsDto {
  @IsDefined()
  @IsArray()
  artists: [];

  @IsDefined()
  @IsArray()
  albums: [];

  @IsDefined()
  @IsArray()
  tracks: [];
}
