import {Test, TestingModule} from '@nestjs/testing';
import {JwtService} from '@nestjs/jwt';
import {ConfigService} from '@nestjs/config';

import {TokensService} from '../../src/tokens/tokens.service';
import {mockedConfigService} from '../../src/utils/mocks/config.service';
import {mockedJwtService} from '../../src/utils/mocks/jwt.service';
import {mockedAuthService} from '../../src/utils/mocks/auth.service';
import {AuthController} from './auth.controller';
import {AuthService} from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        TokensService,
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
      .overrideProvider(AuthService)
      .useValue(mockedAuthService)
      .compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
