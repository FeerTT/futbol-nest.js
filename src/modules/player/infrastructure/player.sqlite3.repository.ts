import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MapperService } from '@/common/application/mapper/mapper.service';
import { PlayerRepository } from '../application/repository/player.repository';
import { Player } from '../domain/player.domain';
import { PlayerEntity } from './entities/player.entity';

@Injectable()
export class PlayerSqliteRepository implements PlayerRepository {
  constructor(
    @InjectRepository(PlayerEntity)
    private readonly playerRepository: Repository<PlayerEntity>,
    private readonly mapperService: MapperService,
  ) {}

  async create(player: Player): Promise<Player> {
    const playerEntity = this.mapperService.classToEntity(
      player,
      new PlayerEntity(),
    );
    const createdPlayerEntity = await this.playerRepository.save(playerEntity);
    return this.mapperService.entityToClass(createdPlayerEntity, new Player());
  }

  async findAll(options?: object): Promise<Player[]> {
    const playerEntities = await this.playerRepository.find(options);
    return playerEntities.map((playerEntity) =>
      this.mapperService.entityToClass(playerEntity, new Player()),
    );
  }

  async findById(id: number): Promise<Player> {
    const playerEntity = await this.playerRepository.findOne({ where: { id } });
    return this.mapperService.entityToClass(playerEntity, new Player());
  }

  async update(id: number, newPlayer: Player): Promise<Player> {
    const playerExist = await this.playerRepository.findOne({ where: { id } });
    if (!playerExist) {
      throw new HttpException('Player not found', 404);
    }

    this.playerRepository.merge(playerExist, newPlayer);
    const playerEntity = await this.playerRepository.save(playerExist);

    return this.mapperService.entityToClass(playerEntity, new Player());
  }

  async delete(id: number): Promise<void> {
    const playerExist = await this.playerRepository.findOne({ where: { id } });
    if (!playerExist) {
      throw new HttpException('Player not found', 404);
    }

    await this.playerRepository.delete(id);
  }
}
