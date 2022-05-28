import {Module} from '@nestjs/common';
import {SharedModule} from 'src/utils/shared.module';
import {EventsController} from './events.controller';
import {EventsService} from './events.service';

@Module({
  imports: [SharedModule],
  providers: [EventsService],
  controllers: [EventsController],
  exports: [EventsService],
})
export class EventsModule {}
