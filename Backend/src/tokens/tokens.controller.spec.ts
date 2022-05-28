import {Test, TestingModule} from '@nestjs/testing';
import {mockedTokensService} from 'src/utils/mocks/tokens.service';
import {TokensController} from './tokens.controller';
import {TokensService} from './tokens.service';

describe('TokensController', () => {
  let controller: TokensController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TokensController],
      providers: [TokensService],
    })
      .overrideProvider(TokensService)
      .useValue(mockedTokensService)
      .compile();

    controller = module.get<TokensController>(TokensController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
