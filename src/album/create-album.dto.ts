import { IsDefined, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateAlbumDto {
  @IsNotEmpty()
  @IsDefined()
  @IsString()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  @IsDefined()
  year: number;
  artistId: string | null;
}
