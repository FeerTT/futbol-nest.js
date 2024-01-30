import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Post,
} from '@nestjs/common';
import { Team } from '../domain/team.domain';
import { TeamService } from '../application/service/team.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { UseInterceptors } from '@nestjs/common';

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
  async create(@Body() team: Team): Promise<Team> {
    return this.teamService.create(team);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() team: Team): Promise<Team> {
    return this.teamService.update(id, team);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.teamService.remove(id);
  }
}
