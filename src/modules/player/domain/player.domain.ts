import { Base } from 'src/common/domain/base.domain';

export class Player extends Base {
  name: string;
  firstName: string;
  lastName: string | null;
  dateOfBirth: Date;
  countryOfBirth: string;
  nationality: string;
  position: string;
}
