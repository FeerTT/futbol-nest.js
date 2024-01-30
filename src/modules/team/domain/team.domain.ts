import { Base } from 'src/common/domain/base.domain';
import { Player } from 'src/modules/player/domain/player.domain';

export class Team extends Base {
  area: {
    id: number;
    name: string;
  };
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
  squad: Player[];
  crestUrl: string;
}
