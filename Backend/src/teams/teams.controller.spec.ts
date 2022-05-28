import {Test, TestingModule} from '@nestjs/testing';
import {getRepositoryToken} from '@nestjs/typeorm';
import {JwtService} from '@nestjs/jwt';
import {Request} from 'express';

import {configService} from 'config/config.service';
import {Team} from 'src/model/team.entity';
import {TokensService} from 'src/tokens/tokens.service';
import {mockedConfigService} from 'src/utils/mocks/config.service';
import {mockedJwtService} from 'src/utils/mocks/jwt.service';
import {mockTeamRepository} from 'src/utils/mocks/repositories';
import {mockedTeamService} from 'src/utils/mocks/team.service';
import {mockedTokensService} from 'src/utils/mocks/tokens.service';
import {
  getSampleMeeting,
  getSampleOrganisation,
  getSampleProfile,
  getSampleTeam,
  TEST_MEETING_UUID,
  TEST_ORGANISATION_UUID,
  TEST_PROFILE_UUID,
  TEST_TEAM_UUID,
} from 'test/testData';
import {TeamsController} from './teams.controller';
import {TeamsService} from './teams.service';
import {deleteTeamDto} from './dto/deleteTeam.dto';
import {readTeamDto} from './dto/readTeam.dto';

describe('TeamsController', () => {
  let controller: TeamsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TeamsController],
      providers: [
        TeamsService,
        // {
        //   provide: getRepositoryToken(Team),
        //   useValue: mockTeamRepository,
        // },
        {
          provide: TokensService,
          useValue: mockedTokensService,
        },
        // {
        //   provide: configService,
        //   useValue: mockedConfigService,
        // },
        // {
        //   provide: JwtService,
        //   useValue: mockedJwtService,
        // },
      ],
    })
      .overrideProvider(TeamsService)
      .useValue(mockedTeamService)
      .compile();

    controller = module.get<TeamsController>(TeamsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a team', async () => {
    const mockReq = {
      body: {
        name: 'Test team',
        organisation: {
          uuid: TEST_ORGANISATION_UUID,
        },
        admins: [
          {
            uuid: TEST_PROFILE_UUID,
          },
        ],
        topics: [
          {
            uuid: TEST_MEETING_UUID,
          },
        ],
      },
    } as Request;
    expect(await controller.createTeam(mockReq, mockReq.body)).toEqual(
      Object.assign(new Team(), {
        uuid: expect.stringMatching(
          /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/,
        ),
        name: mockReq.body.name,
        organisation: {
          uuid: TEST_ORGANISATION_UUID,
        },
        admins: [
          {
            uuid: TEST_PROFILE_UUID,
          },
        ],
        users: [
          {
            uuid: TEST_PROFILE_UUID,
          },
        ],
        topics: [
          {
            uuid: TEST_MEETING_UUID,
          },
        ],
      }),
    );
  });

  it('should read a team', async () => {
    expect(await controller.findOneTeam({uuid: TEST_TEAM_UUID})).toEqual(
      Object.assign(new Team(), {
        uuid: expect.stringMatching(
          /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/,
        ),
        name: getSampleTeam().name,
        organisation: getSampleTeam().organisation,
        admins: getSampleTeam().admins,
        users: getSampleTeam().users,
        topics: getSampleTeam().topics,
      }),
    );
  });

  it('should update a team', async () => {
    const mockReq = {
      body: {
        uuid: TEST_TEAM_UUID,
        name: 'Updated team name',
        topics: [],
        admins: [],
        users: [],
        archived: true,
      },
    } as Request;
    expect(await controller.updateTeam(mockReq, mockReq.body)).toEqual(
      Object.assign(new Team(), {
        uuid: expect.stringMatching(
          /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/,
        ),
        name: mockReq.body.name,
        topics: mockReq.body.topics,
        admins: mockReq.body.admins,
        users: mockReq.body.users,
        archived: mockReq.body.archived,
      }),
    );
  });

  it('should delete a team', async () => {
    const mockReq = {
      body: {
        uuid: TEST_TEAM_UUID,
      },
    } as Request;
    expect(await controller.deleteTeam(mockReq.body)).toEqual(
      `Deleted team with UUID ${mockReq.body.uuid}`,
    );
  });

  // Failing tests
  it('should fail creating a team', async () => {
    const mockReq = {
      body: {
        name: 'Test team',
        organisation: {
          uuid: TEST_ORGANISATION_UUID,
        },
        admins: [
          {
            uuid: TEST_PROFILE_UUID,
          },
        ],
        topics: [
          {
            uuid: TEST_MEETING_UUID,
          },
        ],
      },
    } as Request;
    jest
      .spyOn(mockedTeamService, 'createTeam')
      .mockRejectedValueOnce('Mocked create team failure');
    await expect(
      controller.createTeam(mockReq, mockReq.body),
    ).rejects.toThrowError('Creating team failed');
  });

  it('should fail creating a team due Internal server error', async () => {
    const mockReq = {
      body: {
        name: 'Test team',
        organisation: {
          uuid: TEST_ORGANISATION_UUID,
        },
        admins: [
          {
            uuid: TEST_PROFILE_UUID,
          },
        ],
        topics: [
          {
            uuid: TEST_MEETING_UUID,
          },
        ],
      },
    } as Request;
    jest
      .spyOn(mockedTeamService, 'createTeam')
      .mockReturnValueOnce({ok: false, data: 'Creating team failed'});
    await expect(
      controller.createTeam(mockReq, mockReq.body),
    ).rejects.toThrowError('Creating team failed');
  });

  it('should fail creating a team with "Missing key(s)"', async () => {
    const mockReq = {
      body: {},
    } as Request;
    await expect(
      controller.createTeam(mockReq, mockReq.body),
    ).rejects.toThrowError('Missing key(s)');
  });

  it('should fail reading a team', async () => {
    jest
      .spyOn(mockedTeamService, 'findOneTeam')
      .mockRejectedValueOnce('Mocked read team failure');
    await expect(
      controller.findOneTeam({uuid: TEST_TEAM_UUID}),
    ).rejects.toThrowError('Reading team failed');
  });

  it('should fail reading a team with Internal server error', async () => {
    jest
      .spyOn(mockedTeamService, 'findOneTeam')
      .mockReturnValueOnce({ok: false, data: 'Reading team failed'});
    await expect(
      controller.findOneTeam({uuid: TEST_TEAM_UUID}),
    ).rejects.toThrowError('Reading team failed');
  });

  it('should fail reading a team with "Missing key(s)"', async () => {
    await expect(controller.findOneTeam(<readTeamDto>{})).rejects.toThrowError(
      'Missing key(s)',
    );
  });

  it('should fail updating a team', async () => {
    const mockReq = {
      body: {
        uuid: TEST_TEAM_UUID,
        name: 'Updated team name',
        topics: [],
        admins: [],
        users: [],
        archived: true,
      },
    } as Request;
    jest
      .spyOn(mockedTeamService, 'updateTeam')
      .mockRejectedValueOnce('Mocked update team failure');
    await expect(
      controller.updateTeam(mockReq, mockReq.body),
    ).rejects.toThrowError('Updating team failed');
  });

  it('should fail updating a team with Internal server error', async () => {
    const mockReq = {
      body: {
        uuid: TEST_TEAM_UUID,
        name: 'Updated team name',
        topics: [],
        admins: [],
        users: [],
        archived: true,
      },
    } as Request;
    jest
      .spyOn(mockedTeamService, 'updateTeam')
      .mockReturnValueOnce({ok: false, data: 'Updating team failed'});
    await expect(
      controller.updateTeam(mockReq, mockReq.body),
    ).rejects.toThrowError('Updating team failed');
  });

  it('should fail updating team with "Missing key(s)"', async () => {
    const mockReq = {
      body: {},
    } as Request;
    await expect(
      controller.updateTeam(mockReq, mockReq.body),
    ).rejects.toThrowError('Missing key(s)');
  });

  it('should fail deleting a team', async () => {
    jest
      .spyOn(mockedTeamService, 'deleteTeam')
      .mockRejectedValueOnce('Mocked delete team failure');
    await expect(
      controller.deleteTeam({uuid: TEST_TEAM_UUID}),
    ).rejects.toThrowError('Deleting team failed');
  });

  it('should fail deleting a team with "Missing key(s)"', async () => {
    const mockReq = {
      body: {},
    } as Request;
    await expect(controller.deleteTeam(mockReq.body)).rejects.toThrowError(
      'Missing key(s)',
    );
  });
});
