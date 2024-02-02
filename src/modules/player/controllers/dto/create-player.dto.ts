import { IsString, IsDate, IsOptional } from 'class-validator';

export class CreatePlayerDto {
  @IsString()
  name: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsDate()
  dateOfBirth: Date;

  @IsString()
  countryOfBirth: string;

  @IsString()
  nationality: string;

  @IsString()
  position: string;

  @IsOptional()
  teamId?: number;
}
