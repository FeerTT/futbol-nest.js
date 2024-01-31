import { IsString, IsNotEmpty, IsNumber, IsEmail } from 'class-validator';

export default class CreateTeamDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  shortName: string;

  @IsNotEmpty()
  @IsString()
  tla: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsNotEmpty()
  @IsString()
  website: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsNumber()
  founded: number;

  @IsNotEmpty()
  @IsString()
  clubColors: string;

  @IsString()
  venue: string;

  @IsNotEmpty()
  @IsString()
  crestUrl: string;
}
