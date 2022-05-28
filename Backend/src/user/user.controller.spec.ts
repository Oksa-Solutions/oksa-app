import {Test, TestingModule} from '@nestjs/testing';
import {JwtService} from '@nestjs/jwt';
import {ConfigService} from '@nestjs/config';
import {Request} from 'express';

import {TokensService} from '../../src/tokens/tokens.service';
import {mockedConfigService} from '../../src/utils/mocks/config.service';
import {mockedJwtService} from '../../src/utils/mocks/jwt.service';
import {mockedUserService} from '../../src/utils/mocks/user.service';
import {UserController} from './user.controller';
import {UserService} from './user.service';
import {User} from 'src/model/user.entity';
import {mockedTokensService} from 'src/utils/mocks/tokens.service';
import {
  getSampleCard,
  getSampleMeeting,
  getSampleProfile,
  getSampleUser,
} from 'test/testData';
import {Profile} from 'src/model/profile.entity';
import {Meeting} from 'src/model/meeting.entity';
import {Card} from 'src/model/card.entity';
import {readUserDto} from './dto/readUser.dto';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        {
          provide: TokensService,
          useValue: mockedTokensService,
        },
        {
          provide: ConfigService,
          useValue: mockedConfigService,
        },
        {
          provide: JwtService,
          useValue: mockedJwtService,
        },
      ],
    })
      .overrideProvider(UserService)
      .useValue(mockedUserService)
      .compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a user', async () => {
    const mockReq = {
      body: {},
    } as Request;
    expect(await controller.createUser(mockReq.body)).toEqual(
      Object.assign(new User(), {
        uuid: expect.stringMatching(
          /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/,
        ),
        authToken: 'InitialTestAuthToken',
        refreshToken: 'InitialTestRefreshToken',
        cards: [],
        meetings: [],
        profile: undefined,
      }),
    );
  });

  it('should read a user', async () => {
    const uuid = getSampleUser().uuid;
    expect(await controller.readUser({uuid})).toEqual(
      Object.assign(new User(), {
        uuid: getSampleUser().uuid,
        authToken: getSampleUser().authToken,
        refreshToken: getSampleUser().refreshToken,
        cards: [
          Object.assign(new Card(), {
            uuid: getSampleCard().uuid,
            meeting: {uuid: getSampleMeeting().uuid},
            author: {uuid: getSampleUser().uuid},
            title: getSampleCard().title,
            content: getSampleCard().content,
            categories: getSampleCard().categories,
            votes: getSampleCard().votes,
            status: getSampleCard().status,
            taskStatus: getSampleCard().taskStatus,
            dates: getSampleCard().dates,
          }),
        ],
        meetings: [
          Object.assign(new Meeting(), {
            uuid: getSampleMeeting().uuid,
            name: getSampleMeeting().name,
            id: getSampleMeeting().id,
            status: getSampleMeeting().status,
            authorizedUsers: getSampleMeeting().authorizedUsers,
            cards: getSampleMeeting().cards,
            categories: getSampleMeeting().categories,
          }),
        ],
        profile: Object.assign(new Profile(), {
          uuid: getSampleProfile().uuid,
          name: getSampleProfile().name,
          email: getSampleProfile().email,
          phoneNumber: getSampleProfile().phoneNumber,
          settings: getSampleProfile().settings,
          subscription: getSampleProfile().subscription,
          organisations: [],
        }),
      }),
    );
  });

  it('should update a user', async () => {
    const mockReq = {
      body: {
        uuid: getSampleUser().uuid,
        authToken: 'UpdatedTestAuthToken',
        refreshToken: 'UpdatedTestRefreshToken',
      },
    } as Request;
    expect(await controller.updateUser(mockReq.body, mockReq)).toEqual(
      Object.assign(new User(), {
        uuid: getSampleUser().uuid,
        authToken: mockReq.body.authToken,
        refreshToken: mockReq.body.refreshToken,
        profile: Object.assign(new Profile(), {
          uuid: getSampleProfile().uuid,
          name: getSampleProfile().name,
          email: getSampleProfile().email,
          phoneNumber: getSampleProfile().phoneNumber,
          settings: getSampleProfile().settings,
          subscription: getSampleProfile().subscription,
          organisations: [],
        }),
        cards: [
          Object.assign(new Card(), {
            uuid: getSampleCard().uuid,
            meeting: {uuid: getSampleMeeting().uuid},
            author: {uuid: getSampleUser().uuid},
            title: getSampleCard().title,
            content: getSampleCard().content,
            categories: getSampleCard().categories,
            votes: getSampleCard().votes,
            status: getSampleCard().status,
            taskStatus: getSampleCard().taskStatus,
            dates: getSampleCard().dates,
          }),
        ],
        meetings: [
          Object.assign(new Meeting(), {
            uuid: getSampleMeeting().uuid,
            name: getSampleMeeting().name,
            id: getSampleMeeting().id,
            status: getSampleMeeting().status,
            authorizedUsers: getSampleMeeting().authorizedUsers,
            cards: getSampleMeeting().cards,
            categories: getSampleMeeting().categories,
          }),
        ],
      }),
    );
  });

  it('should update meetings of a user', async () => {
    const mockReq = {
      body: {
        uuid: getSampleUser().uuid,
        add: false,
        meeting: {uuid: getSampleMeeting().uuid},
      },
    } as Request;
    expect(await controller.updateUserMeeting(mockReq.body)).toEqual(
      Object.assign(new User(), {
        uuid: getSampleUser().uuid,
        authToken: getSampleUser().authToken,
        refreshToken: getSampleUser().refreshToken,
        cards: [
          Object.assign(new Card(), {
            uuid: getSampleCard().uuid,
            meeting: {uuid: getSampleMeeting().uuid},
            author: {uuid: getSampleUser().uuid},
            title: getSampleCard().title,
            content: getSampleCard().content,
            categories: getSampleCard().categories,
            votes: getSampleCard().votes,
            status: getSampleCard().status,
            taskStatus: getSampleCard().taskStatus,
            dates: getSampleCard().dates,
          }),
        ],
        meetings: [],
        profile: Object.assign(new Profile(), {
          uuid: getSampleProfile().uuid,
          name: getSampleProfile().name,
          email: getSampleProfile().email,
          phoneNumber: getSampleProfile().phoneNumber,
          settings: getSampleProfile().settings,
          subscription: getSampleProfile().subscription,
          organisations: [],
        }),
      }),
    );
  });

  it('should delete a user', async () => {
    const mockReq = {
      body: {
        uuid: getSampleUser().uuid,
      },
    } as Request;
    expect(await controller.deleteUser(mockReq.body)).toEqual(
      `Deleted user with UUID ${mockReq.body.uuid}`,
    );
  });

  // Failing cases
  it('should fail creating user', async () => {
    const mockReq = {
      body: {},
    } as Request;
    jest
      .spyOn(mockedUserService, 'createUser')
      .mockRejectedValueOnce('Mocked create user failure');
    await expect(controller.createUser(mockReq.body)).rejects.toThrowError(
      'User creation failed',
    );
  });

  it('should fail reading user', async () => {
    const mockReq: readUserDto = {
      uuid: getSampleUser().uuid,
    };
    jest
      .spyOn(mockedUserService, 'readUser')
      .mockRejectedValueOnce('Mocked read user failure');
    await expect(controller.readUser(mockReq)).rejects.toThrowError(
      'Reading user failed',
    );
  });

  it('should fail reading user with "Missing key(s)"', async () => {
    const mockReq: readUserDto = {
      uuid: '',
    };
    await expect(controller.readUser(mockReq)).rejects.toThrowError(
      'Missing key(s)',
    );
  });

  it('should fail updating user due broken JWT', async () => {
    const mockReq = {
      body: {
        uuid: getSampleUser().uuid,
        // authToken: 'UpdatedTestAuthToken',
        // refreshToken: 'UpdatedTestRefreshToken',
      },
    } as Request;
    jest.spyOn(mockedTokensService, 'getUuidFromToken').mockReturnValueOnce('');
    await expect(
      controller.updateUser(mockReq.body, mockReq),
    ).rejects.toThrowError('No UUID in JWT');
  });

  it('should fail updating user', async () => {
    const mockReq = {
      body: {
        uuid: getSampleUser().uuid,
      },
    } as Request;
    jest
      .spyOn(mockedUserService, 'updateUser')
      .mockRejectedValueOnce('Mocked update user failure');
    await expect(
      controller.updateUser(mockReq.body, mockReq),
    ).rejects.toThrowError('Updating user failed');
  });

  it('should fail updating user with "Missing key(s)"', async () => {
    const mockReq = {
      body: {},
    } as Request;
    await expect(
      controller.updateUser(mockReq.body, mockReq),
    ).rejects.toThrowError('Missing key(s)');
  });

  it('should fail deleting user', async () => {
    const mockReq = {
      body: {
        uuid: getSampleUser().uuid,
      },
    } as Request;
    jest
      .spyOn(mockedUserService, 'deleteUser')
      .mockRejectedValueOnce('Mocked deleting user failure');
    await expect(controller.deleteUser(mockReq.body)).rejects.toThrowError(
      'Deleting user failed',
    );
  });

  it('should fail deleting user with "Missing key(s)"', async () => {
    const mockReq = {
      body: {},
    } as Request;
    await expect(controller.deleteUser(mockReq.body)).rejects.toThrowError(
      'Missing key(s)',
    );
  });

  it('should fail updating meetings of a user', async () => {
    const mockReq = {
      body: {
        uuid: getSampleUser().uuid,
        add: false,
        meeting: {uuid: getSampleMeeting().uuid},
      },
    } as Request;
    jest
      .spyOn(mockedUserService, 'updateUserMeetings')
      .mockRejectedValueOnce("Mocked update user's meetings failure");
    await expect(
      controller.updateUserMeeting(mockReq.body),
    ).rejects.toThrowError("Updating user's meetings failed");
  });

  it('should fail updating meetings of a user with "Missing key(s)"', async () => {
    const mockReq = {
      body: {},
    } as Request;
    await expect(
      controller.updateUserMeeting(mockReq.body),
    ).rejects.toThrowError('Missing key(s)');
  });
});
