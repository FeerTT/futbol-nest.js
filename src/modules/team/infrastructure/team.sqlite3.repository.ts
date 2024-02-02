import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MapperService } from '@/common/application/mapper/mapper.service';
import { TeamRepository } from '../application/repository/team.repository';
import { Team } from '../domain/team.domain';
import { TeamEntity } from './entities/team.entity';

@Injectable()
export class TeamSqliteRepository implements TeamRepository {
  constructor(
    @InjectRepository(TeamEntity)
    private readonly teamRepository: Repository<TeamEntity>,
    private readonly mapperService: MapperService,
  ) {}

  async findAll(options?: object): Promise<Team[]> {
    const teamEntities = await this.teamRepository.find(options);
    return teamEntities.map((teamEntity) =>
      this.mapperService.entityToClass(teamEntity, new Team()),
    );
  }

  async findOne(id: number): Promise<Team> {
    const teamEntity = await this.teamRepository.findOne({
      where: { id },
      relations: ['squad'],
    });
    return this.mapperService.entityToClass(teamEntity, new Team());
  }

  async create(team: Team): Promise<Team> {
    const teamEntity = this.mapperService.classToEntity(team, new TeamEntity());
    const createdTeamEntity = await this.teamRepository.save(teamEntity);
    return this.mapperService.entityToClass(createdTeamEntity, new Team());
  }

  async update(id: number, newTeam: Team): Promise<Team> {
    const teamExist = await this.teamRepository.findOne({ where: { id } });
    if (!teamExist) throw new HttpException('Team not found', 404);

    this.teamRepository.merge(teamExist, newTeam);
    const teamEntity = await this.teamRepository.save(teamExist);

    return this.mapperService.entityToClass(teamEntity, new Team());
  }

  async delete(id: number): Promise<void> {
    const teamExist = await this.teamRepository.findOne({ where: { id } });
    if (!teamExist) throw new HttpException('Team not found', 404);

    await this.teamRepository.delete(id);
  }
}
