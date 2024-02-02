import { Test, TestingModule } from '@nestjs/testing';
import { TeamService } from '../../application/service/team.service';
import { Team } from '../../domain/team.domain';
import { TeamController } from '../team.controller';
import { teamFixture, updatedTeam } from './fixture/fixture.e2e';
import { uniqueTeam } from './fixture/fixture.e2e';

describe('TeamController Test', () => {
  let controller: TeamController;
  let service: TeamService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TeamController],
      providers: [
        {
          provide: TeamService,
          useValue: {
            findAll: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<TeamController>(TeamController);
    service = module.get<TeamService>(TeamService);
  });

  it('should return an array of teams', async () => {
    const result: Team[] = [];
    jest
      .spyOn(service, 'findAll')
      .mockImplementation(() => Promise.resolve(result));
    expect(await controller.findAll()).toBe(result);
  });

  it('should return a team by ID', async () => {
    jest.spyOn(service, 'findOne').mockReturnValue(uniqueTeam as any);
    expect(await controller.findOne(1)).toBe(uniqueTeam);
  });

  it('should Update a team by ID', async () => {
    jest.spyOn(service, 'update').mockResolvedValue(uniqueTeam as any);
    expect(await controller.update(1, null, updatedTeam)).toBe(uniqueTeam);
  });

  it('should remove a team by ID', async () => {
    jest.spyOn(service, 'remove').mockResolvedValue(undefined);
    await expect(controller.remove(1)).resolves.toBeUndefined();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
