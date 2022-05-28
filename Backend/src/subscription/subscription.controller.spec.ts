import {Test, TestingModule} from '@nestjs/testing';

import {mockedSubscriptionService} from 'src/utils/mocks/subscription.service';
import {SubscriptionController} from './subscription.controller';
import {SubscriptionService} from './subscription.service';

describe('SubscriptionController', () => {
  let controller: SubscriptionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubscriptionController],
      providers: [SubscriptionService],
    })
      .overrideProvider(SubscriptionService)
      .useValue(mockedSubscriptionService)
      .compile();

    controller = module.get<SubscriptionController>(SubscriptionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
