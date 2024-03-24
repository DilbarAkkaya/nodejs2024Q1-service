import {
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateTrackDto {
  @IsNotEmpty()
  @IsDefined()
  @IsString()
  name: string;
  @IsOptional()
  @IsDefined()
  @IsString()
  artistId: string | null;

  @IsOptional()
  @IsDefined()
  @IsString()
  albumId: string | null;
  @IsNumber()
  @IsNotEmpty()
  duration: number;
}
