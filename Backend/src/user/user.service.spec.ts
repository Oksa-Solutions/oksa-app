import {Test, TestingModule} from '@nestjs/testing';
import {ConfigService} from '@nestjs/config';
import {JwtService} from '@nestjs/jwt';
import {getRepositoryToken} from '@nestjs/typeorm';

import {UserService} from './user.service';
import {mockedConfigService} from '../../src/utils/mocks/config.service';
import {mockedJwtService} from '../../src/utils/mocks/jwt.service';
import {TokensService} from '../../src/tokens/tokens.service';
import {User} from '../../src/model/user.entity';
import {mockUserRepository} from '../../src/utils/mocks/repositories';
import {
  createUserOk,
  createUserWithProfileOk,
  readUserOk,
  getSampleUser,
  updateUserOk,
  deleteUserOk,
  getSampleProfile,
  updateUserMeetingsOk,
} from '../../test/testData';
import {mockedTokensService} from 'src/utils/mocks/tokens.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
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
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user', async () => {
    expect(await service.createUser(createUserOk)).toEqual({
      ok: true,
      data: Object.assign(new User(), {
        uuid: expect.stringMatching(
          /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/,
        ),
        authToken: expect.any(String),
        refreshToken: expect.any(String),
        cards: [],
        meetings: [],
        profile: null,
      }),
    });
  });

  it('should create a user with profile attached', async () => {
    expect(await service.createUser(createUserWithProfileOk)).toEqual({
      ok: true,
      data: Object.assign(new User(), {
        uuid: expect.stringMatching(
          /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/,
        ),
        authToken: expect.any(String),
        refreshToken: expect.any(String),
        cards: [],
        meetings: [],
        profile: createUserWithProfileOk.profile,
      }),
    });
  });

  it('should read a user', async () => {
    expect(await service.readUser(readUserOk)).toEqual({
      ok: true,
      data: Object.assign(getSampleUser(), {
        authToken: 'InitialTestAuthToken',
        refreshToken: 'InitialTestRefreshToken',
      }),
    });
  });

  it('should read a user without tokens', async () => {
    jest
      .spyOn(mockUserRepository, 'findOne')
      .mockResolvedValueOnce(
        Object.assign(getSampleUser(), {authToken: '', refreshToken: ''}),
      );
    expect(await service.readUser(readUserOk)).toEqual({
      ok: true,
      data: Object.assign(getSampleUser(), {
        authToken: 'TestAuthToken',
        refreshToken: 'TestRefreshToken',
      }),
    });
  });

  it('should update a user', async () => {
    expect(await service.updateUser(updateUserOk)).toEqual({
      ok: true,
      data: {
        uuid: updateUserOk.uuid,
        authToken: 'InitialTestAuthToken',
        refreshToken: 'InitialTestRefreshToken',
        lastModifiedBy: updateUserOk.uuid,
        profile: getSampleProfile(),
      },
    });
  });

  it('should update meetings where a user belongs', async () => {
    expect(await service.updateUserMeetings(updateUserMeetingsOk)).toEqual({
      ok: true,
      data: Object.assign(getSampleUser(), {
        meetings: [],
        authToken: 'InitialTestAuthToken',
        refreshToken: 'InitialTestRefreshToken',
      }),
    });
  });

  it('should delete a user', async () => {
    expect(await service.deleteUser(deleteUserOk)).toEqual({
      ok: true,
      data: `Deleted user with UUID ${deleteUserOk.uuid}`,
    });
  });

  // Failing tests
  it('should fail creating a user', async () => {
    jest
      .spyOn(mockUserRepository, 'save')
      .mockRejectedValueOnce('Mocked create user failure');
    expect(await service.createUser(createUserOk)).toEqual({
      ok: false,
      data: 'Creating user failed',
    });
  });

  it('should fail reading a user from DB', async () => {
    jest
      .spyOn(mockUserRepository, 'findOne')
      .mockRejectedValueOnce('Mocked read user failure');
    expect(await service.readUser(readUserOk)).toEqual({
      ok: false,
      data: 'User not found',
    });
  });

  it('should fail reading a user due failing tokens update', async () => {
    jest
      .spyOn(mockUserRepository, 'findOne')
      .mockResolvedValueOnce(
        Object.assign(getSampleUser(), {authToken: '', refreshToken: ''}),
      );
    jest
      .spyOn(mockedTokensService, 'createTokens')
      .mockResolvedValueOnce({ok: false});
    expect(await service.readUser(readUserOk)).toEqual({
      ok: false,
      data: 'User not found',
    });
  });

  it('should fail reading a user due failing update', async () => {
    jest
      .spyOn(mockUserRepository, 'findOne')
      .mockResolvedValueOnce(
        Object.assign(getSampleUser(), {authToken: '', refreshToken: ''}),
      );
    jest.spyOn(service, 'updateUser').mockResolvedValueOnce({ok: false});
    expect(await service.readUser(readUserOk)).toEqual({
      ok: false,
      data: 'User not found',
    });
  });

  it('should fail reading a user due not finding a user', async () => {
    jest.spyOn(mockUserRepository, 'findOne').mockResolvedValueOnce(null);
    expect(await service.readUser(readUserOk)).toEqual({
      ok: false,
      data: 'User not found',
    });
  });

  it('should fail updating a user', async () => {
    jest
      .spyOn(mockUserRepository, 'save')
      .mockRejectedValueOnce('Mocked update user failure');
    expect(await service.updateUser(updateUserOk)).toEqual({
      ok: false,
      data: 'Updating user failed',
    });
  });

  it('should fail deleting a user', async () => {
    jest
      .spyOn(mockUserRepository, 'delete')
      .mockRejectedValueOnce('Mocked delete user failure');
    expect(await service.deleteUser(deleteUserOk)).toEqual({
      ok: false,
      data: 'Deleting user failed',
    });
  });

  it('should fail deleting a user since it does not exist', async () => {
    jest
      .spyOn(mockUserRepository, 'delete')
      .mockResolvedValueOnce({affected: 0});
    expect(await service.deleteUser(deleteUserOk)).toEqual({
      ok: true,
      data: `No user with UUID ${deleteUserOk.uuid}`,
    });
  });

  it("should fail updating user's meetings due exception", async () => {
    jest
      .spyOn(service, 'readUser')
      .mockRejectedValueOnce("Mocked updating user's meetings failure");
    expect(await service.updateUserMeetings(updateUserMeetingsOk)).toEqual({
      ok: false,
      data: "Updating user's meetings failed",
    });
  });

  it("should fail updating user's meetings due read error", async () => {
    jest.spyOn(service, 'readUser').mockResolvedValueOnce({ok: false});
    expect(await service.updateUserMeetings(updateUserMeetingsOk)).toEqual({
      ok: false,
      data: "Updating user's meetings failed due not finding user",
    });
  });
});
