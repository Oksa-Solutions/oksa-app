import {Test, TestingModule} from '@nestjs/testing';
import {ConfigService} from '@nestjs/config';
import {JwtService} from '@nestjs/jwt';
import {getRepositoryToken} from '@nestjs/typeorm';

import {TokensService} from '../../src/tokens/tokens.service';
import {mockedConfigService} from '../../src/utils/mocks/config.service';
import {AuthService} from './auth.service';
import {mockedJwtService} from '../../src/utils/mocks/jwt.service';
import {Login} from 'src/model/login.entity';
import {Profile} from 'src/model/profile.entity';
import {Meeting} from 'src/model/meeting.entity';
import {
  mockLoginRepository,
  mockMeetingRepository,
  mockProfileRepository,
} from 'src/utils/mocks/repositories';
import {mockedUserService} from 'src/utils/mocks/user.service';
import {UserService} from 'src/user/user.service';
import {ProfilesService} from 'src/profiles/profiles.service';
import {mockedProfileService} from 'src/utils/mocks/profile.service';
import {mockedTokensService} from 'src/utils/mocks/tokens.service';
import {getSampleUser} from 'test/testData';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getRepositoryToken(Login),
          useValue: mockLoginRepository,
        },
        {
          provide: getRepositoryToken(Profile),
          useValue: mockProfileRepository,
        },
        {
          provide: getRepositoryToken(Meeting),
          useValue: mockMeetingRepository,
        },
        {
          provide: UserService,
          useValue: mockedUserService,
        },
        {
          provide: ProfilesService,
          useValue: mockedProfileService,
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

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should refresh auth and refresh tokens', async () => {
    expect(await service.refreshToken(getSampleUser().uuid)).toEqual({
      ok: true,
      data: {
        authToken: 'TestAuthToken',
        refreshToken: 'TestRefreshToken',
      },
    });
  });

  // it('should create OTP login', () => {
  //   expect(service.login({otp: '123456'})).toEqual({});
  // });
});
