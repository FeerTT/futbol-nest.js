import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { Team } from '../../domain/team.domain';
import { MapperService } from '@/common/application/mapper/mapper.service';

import { TeamRepository } from '../repository/team.repository';
import CreateTeamDto from '../../controllers/dto/create-team.dto';
import * as fs from 'fs';
import { UpdateTeamDto } from '../../controllers/dto/update-team.dto';

@Injectable()
export class TeamService {
  constructor(
    @Inject('TEAM_REPOSITORY')
    private teamRepository: TeamRepository,
    private readonly mapperService: MapperService,
  ) {}

  async findAll(): Promise<Team[]> {
    try {
      return await this.teamRepository.findAll({ relations: ['squad'] });
    } catch (error) {
      console.error(error);
    }
  }

  async findOne(id: number): Promise<Team> {
    const team = await this.teamRepository.findOne(id, {
      relations: ['squad'],
    });
    if (!team) {
      throw new NotFoundException(`No team found with ID: ${id}`);
    }
    return team;
  }

  async create(createTeamDto: CreateTeamDto): Promise<Team> {
    const teamEntity = this.mapperService.dtoToClass(createTeamDto, new Team());
    return this.teamRepository.create(teamEntity);
  }

  async update(id: number, updatedTeamDto: UpdateTeamDto): Promise<Team> {
    const existingTeam = await this.teamRepository.findOne(id);
    if (!existingTeam) {
      throw new NotFoundException(`No team found with ID: ${id}`);
    }

    const oldImageUrl = existingTeam.crestUrl;
    const updatedTeamEntity = this.mapperService.classToEntity(
      updatedTeamDto,
      existingTeam,
    );
    await this.teamRepository.update(id, updatedTeamEntity);
    if (oldImageUrl && oldImageUrl !== updatedTeamDto.crestUrl) {
      const fullPath = `${process.cwd()}${oldImageUrl}`;
      fs.unlink(fullPath, (err) => {
        if (err) {
          console.error(`Error deleting the old image: ${err}`);
        } else {
          console.log(`Old image deleted: ${fullPath}`);
        }
      });
    }
    return this.teamRepository.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const team = await this.teamRepository.findOne(id);
    if (!team) {
      throw new NotFoundException(`No team found with ID: ${id}`);
    }
    const imageUrl = team.crestUrl;
    await this.teamRepository.delete(id);
    if (imageUrl) {
      const fullPath = `${process.cwd()}${imageUrl}`;
      fs.unlink(fullPath, (err) => {
        if (err) {
          console.error(`Error deleting the file: ${err}`);
        } else {
          console.log(`File deleted: ${fullPath}`);
        }
      });
    }
  }
}
