import {Test, TestingModule} from '@nestjs/testing';
import {ConfigService} from '@nestjs/config';
import {JwtService} from '@nestjs/jwt';

import {TokensService} from 'src/tokens/tokens.service';
import {mockedAdminService} from 'src/utils/mocks/admin.service';
import {mockedConfigService} from 'src/utils/mocks/config.service';
import {mockedJwtService} from 'src/utils/mocks/jwt.service';
import {AdminController} from './admin.controller';
import {AdminService} from './admin.service';

describe('AdminController', () => {
  let controller: AdminController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminController],
      providers: [
        AdminService,
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
      .overrideProvider(AdminService)
      .useValue(mockedAdminService)
      .compile();

    controller = module.get<AdminController>(AdminController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
