import { IsDefined, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTrackDto {
  @IsNotEmpty()
  @IsDefined()
  @IsString()
  name: string;
  artistId: string | null;
  albumId: string | null;
  @IsNumber()
  @IsNotEmpty()
  duration: number;
}
