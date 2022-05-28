import {Controller, Get, Req, Res, UseGuards} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';
import {Request, Response} from 'express';

import {StreamGuard} from 'src/guards/stream.guard';
import {Public} from 'src/utils/publicDecorator.util';

import RedisClient from '../utils/redisClient.util';
import {EventsService} from './events.service';

@ApiTags('Events')
@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Public()
  @UseGuards(StreamGuard)
  @Get('subscribe')
  // @subscribeEvents()
  async events(@Req() req: Request, @Res() res: Response): Promise<any> {
    const meetingUUID = req.query?.meetingUUID;
    const ip = req?.header('x-forwarded-for') || req?.connection?.remoteAddress;
    req.on('close', () => {
      if (!res.writableEnded) {
        redisClient.unsubscribeChannels();
        console.log(
          `Stopped sending events to ${ip} for connection ID: ${redisClient.client.connection_id}`,
        );
      }
    });
    const redisClient = new RedisClient(res, meetingUUID.toString());
    console.log(
      `Started connection to ${ip} for connection ID: ${redisClient.client.connection_id}`,
    );
  }
}
