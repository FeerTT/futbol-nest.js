import { Base } from '../../../common/domain/base.domain';
import { PlayerEntity } from 'src/modules/player/infrastructure/entities/player.entity';

export class Team extends Base {
  name: string;
  shortName: string;
  tla: string;
  address: string;
  phone: string;
  website: string;
  email: string;
  founded: number;
  clubColors: string;
  venue: any;
  squad: PlayerEntity[];
  crestUrl: string;
}
