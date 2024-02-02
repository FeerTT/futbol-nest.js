import { Base } from '@/common/domain/base.domain';
import { Team } from '@/modules/team/domain/team.domain';
export class Player extends Base {
  name: string;
  firstName: string;
  lastName: string | null;
  dateOfBirth: Date;
  countryOfBirth: string;
  nationality: string;
  position: string;
  teamId?: Team;
}
