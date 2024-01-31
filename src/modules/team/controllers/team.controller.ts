import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Post,
  UseInterceptors,
  UploadedFile,
  InternalServerErrorException,
} from '@nestjs/common';
import { Team } from '../domain/team.domain';
import { TeamService } from '../application/service/team.service';
import CreateTeamDto from './dto/create-team.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdateTeamDto } from './dto/update-team.dto';

@Controller('team')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Get()
  async findAll(): Promise<Team[]> {
    return this.teamService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Team> {
    return this.teamService.findOne(id);
  }

  @Post()
  @UseInterceptors(FileInterceptor('crestUrl'))
  async uploadCrest(
    @UploadedFile() file: Express.Multer.File,
    @Body() createTeamDto: CreateTeamDto,
  ): Promise<Team> {
    try {
      const imageUrl = `/public/uploads/${file.filename}`;
      createTeamDto.crestUrl = imageUrl;
      const team = await this.teamService.create(createTeamDto);
      return team;
    } catch (error) {
      console.error('Error:', error);
    }
  }
  @Put(':id')
  @UseInterceptors(FileInterceptor('crestUrl'))
  async update(
    @Param('id') id: number,
    @UploadedFile() file: Express.Multer.File,
    @Body() updatedTeam: UpdateTeamDto,
  ): Promise<Team> {
    try {
      if (file) {
        const imageUrl = `/public/uploads/${file.filename}`;
        updatedTeam.crestUrl = imageUrl;
      }
      const updatedTeamResult = await this.teamService.update(id, updatedTeam);
      return updatedTeamResult;
    } catch (error) {
      console.error('Error updating the team:', error);
      throw new InternalServerErrorException('Error updating the team');
    }
  }
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.teamService.remove(id);
  }
}
