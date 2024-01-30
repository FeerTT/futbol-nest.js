import { Injectable } from '@nestjs/common';
import { Team } from '../../domain/team.domain';
import { Inject } from '@nestjs/common';

import { MapperService } from 'src/common/application/mapper/mapper.service';
import { TeamRepository } from '../repository/team.repository';

@Injectable()
export class TeamService {
  constructor(
    @Inject('TEAM_REPOSITORY')
    private teamRepository: TeamRepository,
    private readonly mapperService: MapperService,
  ) {}

  async findAll(): Promise<Team[]> {
    try {
      return await this.teamRepository.findAll();
    } catch (error) {
      console.error(error);
    }
  }

  async findOne(id: number): Promise<Team> {
    return this.teamRepository.findOne(id);
  }

  async create(team: Team): Promise<Team> {
    return this.teamRepository.create(team);
  }

  async update(id: number, newTeam: Team): Promise<Team> {
    await this.teamRepository.update(id, newTeam);
    return this.teamRepository.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.teamRepository.delete(id);
  }
}
