import {Test, TestingModule} from '@nestjs/testing';
import {mockedProfileSettingsService} from 'src/utils/mocks/profileSettings.service';
import {ProfileSettingsController} from './profileSettings.controller';
import {ProfileSettingsService} from './profileSettings.service';

describe('ProfileSettingsController', () => {
  let controller: ProfileSettingsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfileSettingsController],
      providers: [ProfileSettingsService],
    })
      .overrideProvider(ProfileSettingsService)
      .useValue(mockedProfileSettingsService)
      .compile();

    controller = module.get<ProfileSettingsController>(
      ProfileSettingsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
