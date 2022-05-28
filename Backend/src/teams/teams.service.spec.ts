import {Test, TestingModule} from '@nestjs/testing';
import {getRepositoryToken} from '@nestjs/typeorm';

import {Team} from 'src/model/team.entity';
import {TeamsService} from './teams.service';
import {mockTeamRepository} from 'src/utils/mocks/repositories';
import {
  createTeamOk,
  deleteTeamOk,
  getSampleTeam,
  readTeamOk,
  updateTeamOk,
} from 'test/testData';

describe('TeamsService', () => {
  let service: TeamsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TeamsService,
        {
          provide: getRepositoryToken(Team),
          useValue: mockTeamRepository,
        },
      ],
    }).compile();

    service = module.get<TeamsService>(TeamsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a team', async () => {
    expect(await service.createTeam(createTeamOk)).toEqual({
      ok: true,
      data: Object.assign(new Team(), {
        ...createTeamOk,
        uuid: expect.stringMatching(
          /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/,
        ),
        createdBy: getSampleTeam().lastModifiedBy,
        archived: false,
      }),
    });
  });

  // it('should read all the teams', async () => {
  //   expect(await service.findAllTeams()).toEqual({
  //     ok: true,
  //     data: [Object.assign(new Team()), getSampleTeam()],
  //   });
  // });

  it('should read a team', async () => {
    expect(await service.findOneTeam(readTeamOk)).toEqual({
      ok: true,
      data: Object.assign(new Team(), getSampleTeam()),
    });
  });

  it('should update a team', async () => {
    expect(await service.updateTeam(updateTeamOk)).toEqual({
      ok: true,
      data: Object.assign(new Team(), {
        uuid: updateTeamOk.uuid,
        archived: updateTeamOk.archived,
        name: updateTeamOk.name,
        lastModifiedBy: updateTeamOk.lastModifiedBy,
        admins: updateTeamOk.admins,
        users: updateTeamOk.users,
        topics: updateTeamOk.topics,
      }),
    });
  });

  it('should delete a team', async () => {
    expect(await service.deleteTeam(deleteTeamOk)).toEqual({
      ok: true,
      data: `Deleted team with UUID ${deleteTeamOk.uuid}`,
    });
  });

  // // Failing tests
  it('should fail creating a team', async () => {
    jest
      .spyOn(mockTeamRepository, 'save')
      .mockRejectedValueOnce('Mocked creating team failure');
    expect(await service.createTeam(createTeamOk)).toEqual({
      ok: false,
      data: 'Creating team failed',
    });
  });

  it('should fail reading a team', async () => {
    jest
      .spyOn(mockTeamRepository, 'findOne')
      .mockRejectedValueOnce('Mocked reading team failure');
    expect(await service.findOneTeam(readTeamOk)).toEqual({
      ok: false,
      data: 'Reading team failed',
    });
  });

  it('should fail updating a team', async () => {
    jest
      .spyOn(mockTeamRepository, 'save')
      .mockRejectedValueOnce('Mocked updating team failure');
    expect(await service.updateTeam(updateTeamOk)).toEqual({
      ok: false,
      data: 'Updating team failed',
    });
  });

  it('should fail deleting a team', async () => {
    jest
      .spyOn(mockTeamRepository, 'delete')
      .mockRejectedValueOnce('Mocked deleting team failure');
    expect(await service.deleteTeam(deleteTeamOk)).toEqual({
      ok: false,
      data: 'Deleting team failed',
    });
  });

  it('should fail deleting a team due missing UUID', async () => {
    jest
      .spyOn(mockTeamRepository, 'delete')
      .mockResolvedValueOnce({affected: 0});
    expect(await service.deleteTeam(deleteTeamOk)).toEqual({
      ok: false,
      data: `No team with UUID ${deleteTeamOk.uuid}`,
    });
  });
});
