import { IsString, IsNotEmpty, IsNumber, IsEmail } from 'class-validator';

export default class CreateTeamDto {
  @IsString()
  name: string;

  @IsString()
  shortName: string;

  @IsString()
  tla: string;

  @IsString()
  address: string;

  @IsString()
  phone: string;

  @IsString()
  website: string;

  @IsEmail()
  email: string;

  @IsNumber()
  founded: number;

  @IsString()
  clubColors: string;

  @IsString()
  venue: string;

  @IsString()
  crestUrl: string;
}
