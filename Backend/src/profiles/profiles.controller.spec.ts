import {Test, TestingModule} from '@nestjs/testing';
import {ConfigService} from '@nestjs/config';
import {JwtService} from '@nestjs/jwt';
import {Request} from 'express';

import {TokensService} from 'src/tokens/tokens.service';
import {mockedConfigService} from 'src/utils/mocks/config.service';
import {mockedJwtService} from 'src/utils/mocks/jwt.service';
import {mockedProfileService} from 'src/utils/mocks/profile.service';
import {ProfilesController} from './profiles.controller';
import {ProfilesService} from './profiles.service';
import {mockedTokensService} from 'src/utils/mocks/tokens.service';
import {
  getSampleProfile,
  getSampleProfileSettings,
  getSampleSubscription,
  getSampleUser,
  TEST_PROFILE_UUID,
} from 'test/testData';
import {Profile} from 'src/model/profile.entity';
import {readProfileDto} from './dto/readProfile.dto';

describe('ProfilesController', () => {
  let controller: ProfilesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfilesController],
      providers: [
        ProfilesService,
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
      .overrideProvider(ProfilesService)
      .useValue(mockedProfileService)
      .compile();

    controller = module.get<ProfilesController>(ProfilesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a profile', async () => {
    const mockReq = {
      body: {
        name: 'Test profile',
        email: 'test@email.com',
        phoneNumber: '0441234567',
        user: getSampleUser(),
      },
    } as Request;
    expect(await controller.createProfile(mockReq, mockReq.body)).toEqual(
      Object.assign(new Profile(), {
        uuid: expect.stringMatching(
          /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/,
        ),
        name: mockReq.body.name,
        email: mockReq.body.email,
        phoneNumber: mockReq.body.phoneNumber,
      }),
    );
  });

  it('should read a profile', async () => {
    expect(await controller.readProfile({uuid: TEST_PROFILE_UUID})).toEqual(
      Object.assign(new Profile(), {
        uuid: getSampleProfile().uuid,
        name: getSampleProfile().name,
        email: getSampleProfile().email,
        phoneNumber: getSampleProfile().phoneNumber,
        settings: getSampleProfileSettings(),
        subscription: getSampleSubscription(),
        organisations: [],
      }),
    );
  });

  it('should update a profile', async () => {
    const mockReq = {
      body: {
        uuid: TEST_PROFILE_UUID,
        name: 'Updated name',
        email: 'email@example.com',
        phoneNumber: '7654321044',
        user: getSampleUser(),
      },
    } as Request;
    expect(await controller.updateProfile(mockReq, mockReq.body)).toEqual(
      Object.assign(new Profile(), {
        uuid: mockReq.body.uuid,
        name: mockReq.body.name,
        email: mockReq.body.email,
        phoneNumber: mockReq.body.phoneNumber,
        settings: getSampleProfileSettings(),
      }),
    );
  });

  it('should delete a profile', async () => {
    const mockReq = {
      body: {
        uuid: TEST_PROFILE_UUID,
        user: getSampleUser(),
      },
    } as Request;
    expect(await controller.deleteProfile(mockReq.body)).toEqual(
      `Deleted profile with UUID ${mockReq.body.uuid}`,
    );
  });

  // Failing cases when missing keys
  it('should fail creating a profile', async () => {
    const mockReq = {
      body: {
        name: 'Test profile',
        email: 'test@email.com',
        phoneNumber: '0441234567',
        user: getSampleUser(),
      },
    } as Request;
    jest
      .spyOn(mockedProfileService, 'createProfile')
      .mockRejectedValueOnce('Mocked create profile failure');
    await expect(
      controller.createProfile(mockReq, mockReq.body),
    ).rejects.toThrowError('Creating profile failed');
  });

  it('should fail creating a profile with "Missing key(s)"', async () => {
    const mockReq = {
      body: {},
    } as Request;
    await expect(
      controller.createProfile(mockReq, mockReq.body),
    ).rejects.toThrowError('Missing key(s)');
  });

  it('should fail reading profile', async () => {
    const uuid = getSampleProfile().uuid;
    jest
      .spyOn(mockedProfileService, 'readProfile')
      .mockRejectedValueOnce('Mocked read profile failure');
    await expect(controller.readProfile({uuid})).rejects.toThrowError(
      'Reading profile failed',
    );
  });

  it('should fail reading profile with "Missing key(s)"', async () => {
    const mockReq: readProfileDto = {
      uuid: '',
    };
    await expect(controller.readProfile(mockReq)).rejects.toThrowError(
      'Missing key(s)',
    );
  });

  it('should fail updating profile', async () => {
    const mockReq = {
      body: {
        uuid: TEST_PROFILE_UUID,
        name: 'Updated name',
        email: 'email@example.com',
        phoneNumber: '7654321044',
        user: getSampleUser(),
      },
    } as Request;
    jest
      .spyOn(mockedProfileService, 'updateProfile')
      .mockRejectedValueOnce('Mocked update profile failure');
    await expect(
      controller.updateProfile(mockReq, mockReq.body),
    ).rejects.toThrowError('Updating profile failed');
  });

  it('should fail updating profile due missing JWT token in authorization header', async () => {
    const mockReq = {
      body: {
        uuid: TEST_PROFILE_UUID,
        name: 'Updated name',
        email: 'email@example.com',
        phoneNumber: '7654321044',
        user: getSampleUser(),
      },
    } as Request;
    jest
      .spyOn(mockedProfileService, 'updateProfile')
      .mockRejectedValueOnce('Mocked update profile failure');
    jest.spyOn(mockedTokensService, 'getUuidFromToken').mockReturnValueOnce('');
    await expect(
      controller.updateProfile(mockReq, mockReq.body),
    ).rejects.toThrowError('No UUID in JWT');
  });

  it('should fail updating profile with "Missing key(s)"', async () => {
    const mockReq = {
      body: {},
    } as Request;
    await expect(
      controller.updateProfile(mockReq, mockReq.body),
    ).rejects.toThrowError('Missing key(s)');
  });

  it('should fail deleteing profile', async () => {
    const mockReq = {
      body: {
        uuid: TEST_PROFILE_UUID,
        user: getSampleUser(),
      },
    } as Request;
    jest
      .spyOn(mockedProfileService, 'deleteProfile')
      .mockRejectedValueOnce('Mocked delete profile failure');
    await expect(controller.deleteProfile(mockReq.body)).rejects.toThrowError(
      'Deleting profile failed',
    );
  });

  it('should fail deleting profile with "Missing key(s)"', async () => {
    const mockReq = {
      body: {},
    } as Request;
    await expect(controller.deleteProfile(mockReq.body)).rejects.toThrowError(
      'Missing key(s)',
    );
  });
});
