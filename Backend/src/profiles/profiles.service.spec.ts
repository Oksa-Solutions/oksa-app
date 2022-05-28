import {Test, TestingModule} from '@nestjs/testing';
import {getRepositoryToken} from '@nestjs/typeorm';
import {ProfileSettingsService} from 'src/profileSettings/profileSettings.service';
import {mockedProfileSettingsService} from 'src/utils/mocks/profileSettings.service';
import {
  createProfileOk,
  deleteProfileOk,
  getSampleProfile,
  getSampleUser,
  readProfileOk,
  updateProfileOk,
} from 'test/testData';

import {Profile} from '../../src/model/profile.entity';
import {mockProfileRepository} from '../../src/utils/mocks/repositories';
import {createProfileDto} from './dto/createProfile.dto';
import {ProfilesService} from './profiles.service';

describe('ProfilesService', () => {
  let service: ProfilesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProfilesService,
        {
          provide: getRepositoryToken(Profile),
          useValue: mockProfileRepository,
        },
        {
          provide: ProfileSettingsService,
          useValue: mockedProfileSettingsService,
        },
      ],
    }).compile();

    service = module.get<ProfilesService>(ProfilesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a profile', async () => {
    expect(await service.createProfile(createProfileOk)).toEqual({
      ok: true,
      data: Object.assign(new Profile(), {
        uuid: expect.stringMatching(
          /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/,
        ),
        name: createProfileOk.name,
        email: createProfileOk.email,
        phoneNumber: createProfileOk.phoneNumber,
        createdBy: createProfileOk.user.uuid,
        lastModifiedBy: createProfileOk.user.uuid,
        user: createProfileOk.user,
      }),
    });
  });

  it('should read a profile', async () => {
    expect(await service.readProfile(readProfileOk)).toEqual({
      ok: true,
      data: Object.assign(new Profile(), {
        uuid: readProfileOk.uuid,
        ...getSampleProfile(),
      }),
    });
  });

  it('should update a profile', async () => {
    expect(await service.updateProfile(updateProfileOk)).toEqual({
      ok: true,
      data: Object.assign(new Profile(), {
        uuid: updateProfileOk.uuid,
        user: updateProfileOk.user,
        lastModifiedBy: getSampleUser().uuid,
        name: updateProfileOk.name,
        email: updateProfileOk.email,
        phoneNumber: updateProfileOk.phoneNumber,
      }),
    });
  });

  it('should delete a profile', async () => {
    expect(await service.deleteProfile(deleteProfileOk)).toEqual({
      ok: true,
      data: `Deleted profile with UUID ${deleteProfileOk.uuid}`,
    });
  });

  // Failing tests
  it('should fail creating a profile', async () => {
    jest
      .spyOn(mockProfileRepository, 'save')
      .mockRejectedValueOnce('Mocked create profile failure');
    expect(await service.createProfile(createProfileOk)).toEqual({
      ok: false,
      data: 'Creating profile failed',
    });
  });

  it('should fail creating a profile, since profile for user already exists', async () => {
    jest
      .spyOn(mockProfileRepository, 'save')
      .mockImplementation((dto: createProfileDto) =>
        Promise.reject({
          detail: `Key ("userUuid")=(${dto.user.uuid}) already exists.`,
        }),
      );
    expect(await service.createProfile(createProfileOk)).toEqual({
      ok: false,
      data: 'Profile already exists',
    });
  });

  it('should fail reading a profile', async () => {
    jest
      .spyOn(mockProfileRepository, 'findOne')
      .mockRejectedValueOnce('Mocked read profile failure');
    expect(await service.readProfile(readProfileOk)).toEqual({
      ok: false,
      data: 'Reading profile failed',
    });
  });

  it('should fail updating a profile', async () => {
    jest
      .spyOn(mockProfileRepository, 'save')
      .mockRejectedValueOnce('Mocked update profile failure');
    expect(await service.updateProfile(updateProfileOk)).toEqual({
      ok: false,
      data: 'Updating profile failed',
    });
  });

  it('should fail deleting a profile', async () => {
    jest
      .spyOn(mockProfileRepository, 'delete')
      .mockRejectedValueOnce('Mocked delete profile failure');
    expect(await service.deleteProfile(deleteProfileOk)).toEqual({
      ok: false,
      data: 'Deleting profile failed',
    });
  });
});
