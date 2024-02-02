import { Player } from '../../domain/player.domain';

export interface PlayerRepository {
  create(player: Player): Promise<Player>;
  findAll(options: object): Promise<Player[]>;
  findById(id: number): Promise<Player>;
  update(id: number, newPlayer: Player): Promise<Player>;
  delete(id: number): Promise<void>;
}
