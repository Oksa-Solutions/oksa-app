import {Test, TestingModule} from '@nestjs/testing';
import {ConfigService} from '@nestjs/config';
import {JwtService} from '@nestjs/jwt';
import {Request} from 'express';

import {TokensService} from './tokens.service';
import {mockedConfigService} from '../../src/utils/mocks/config.service';
import {mockedJwtService} from '../../src/utils/mocks/jwt.service';

describe('TokensService', () => {
  let service: TokensService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
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
    }).compile();

    service = module.get<TokensService>(TokensService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get UUID from JWT token in authorization header', () => {
    const mockReq = {
      headers: {
        authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZWV0aW5ncyI6WyJiNWQ2YzUwMC04OGFlLTQxYWQtYWIzOS05NGI0MzFlMTc2NDgiLCIwODczOTllZi00ZjI5LTQzMjMtYTcwOS1lNWY3YTk0Nzg3NjQiXSwidXVpZCI6ImQzZjQ0ZTA1LWVkZmEtNDA1Yi04ZmY3LWI5NDExYzQ4Zjk4ZiIsIm9yZ2FuaXNhdGlvbnMiOltdLCJpYXQiOjE2MTg0NzA4MDIsImV4cCI6MTYxODQ3MTcwMn0.e3MV2p_ObSXQiNXqS6_JLbpZs7iGMvDI_6TMrIR5gqo',
      },
    } as Request;
    expect(service.getUuidFromToken(mockReq)).toEqual(
      'd3f44e05-edfa-405b-8ff7-b9411c48f98f',
    );
  });

  it('should return token key secrets', () => {
    expect(service.getTokenKeys()).toEqual({
      authKey: 'AccessTokenSecret',
      refreshKey: 'RefreshTokenSecret',
    });
  });

  // Failing tests
  it('should fail getting UUID from JWT token', () => {
    const mockReq = {
      headers: {
        authorization: 'Bearer authToken',
      },
    } as Request;
    expect(service.getUuidFromToken(mockReq)).toEqual('');
  });
});
