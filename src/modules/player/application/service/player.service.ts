import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { Player } from '../../domain/player.domain';
import { PlayerRepository } from '../repository/player.repository';
import { MapperService } from '@/common/application/mapper/mapper.service';
import { CreatePlayerDto } from '../../controllers/dto/create-player.dto';
import { UpdatePlayerDto } from '../../controllers/dto/update-player.dto';
import { TeamService } from '@/modules/team/application/service/team.service';

@Injectable()
export class PlayerService {
  constructor(
    @Inject('PLAYER_REPOSITORY')
    private readonly playerRepository: PlayerRepository,
    private readonly mapperService: MapperService,
    private readonly teamService: TeamService,
  ) {}
  async findAll(options?: object): Promise<Player[]> {
    try {
      return await this.playerRepository.findAll(options);
    } catch (error) {
      console.error(error);
      throw new Error('Error fetching players');
    }
  }

  async findById(id: number): Promise<Player> {
    return this.playerRepository.findById(id);
  }

  async create(createPlayerDto: CreatePlayerDto): Promise<Player> {
    const playerEntity = this.mapperService.dtoToClass(
      createPlayerDto,
      new Player(),
    );
    if (createPlayerDto.teamId) {
      const team = await this.teamService.findOne(createPlayerDto.teamId);
      if (!team) {
        throw new NotFoundException(
          `No team found with ID: ${createPlayerDto.teamId}`,
        );
      }
      playerEntity.teamId = team;
    }
    return this.playerRepository.create(playerEntity);
  }

  async update(id: number, updatePlayerDto: UpdatePlayerDto): Promise<Player> {
    const existingPlayer = await this.playerRepository.findById(id);
    if (!existingPlayer) {
      throw new NotFoundException(`Player with ID: ${id} not found`);
    }

    const updatedPlayerEntity = this.mapperService.classToEntity(
      updatePlayerDto,
      existingPlayer,
    );

    return this.playerRepository.update(id, updatedPlayerEntity);
  }

  async delete(id: number): Promise<void> {
    const existingPlayer = await this.playerRepository.findById(id);
    if (!existingPlayer) {
      throw new NotFoundException(`Player with ID: ${id} not found`);
    }

    await this.playerRepository.delete(id);
  }
}
