import {Test, TestingModule} from '@nestjs/testing';
import {getRepositoryToken} from '@nestjs/typeorm';
import {getSampleProfile, updateProfileSettingsOk} from 'test/testData';

import {ProfileSetting} from '../../src/model/profileSettings.entity';
import {mockProfileSettingsRepository} from '../../src/utils/mocks/repositories';
import {ProfileSettingsService} from './profileSettings.service';

describe('ProfileSettingsService', () => {
  let service: ProfileSettingsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProfileSettingsService,
        {
          provide: getRepositoryToken(ProfileSetting),
          useValue: mockProfileSettingsRepository,
        },
      ],
    }).compile();

    service = module.get<ProfileSettingsService>(ProfileSettingsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should update profile settings', async () => {
    expect(await service.updateSetting(updateProfileSettingsOk)).toEqual({
      ok: true,
      data: Object.assign(new ProfileSetting(), {
        profile: getSampleProfile(),
        background: updateProfileSettingsOk.background,
        uuid: updateProfileSettingsOk.uuid,
      }),
    });
  });

  // Failing tests
  it('should fail updating profile settings', async () => {
    jest
      .spyOn(mockProfileSettingsRepository, 'save')
      .mockRejectedValueOnce('Mocked update profile settings failure');
    expect(await service.updateSetting(updateProfileSettingsOk)).toEqual({
      ok: false,
      data: 'Updating profile settings failed',
    });
  });
});
