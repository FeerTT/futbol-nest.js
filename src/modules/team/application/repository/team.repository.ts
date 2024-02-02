import { Team } from '../../domain/team.domain';

export interface TeamRepository {
  create(team: Team): Promise<Team>;
  findAll(options?: object): Promise<Team[]>;
  findOne(id: number, options?: object): Promise<Team>;
  update(id: number, newTeam: Team): Promise<Team>;
  delete(id: number): Promise<void>;
}
