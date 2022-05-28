import {
  Controller,
  Body,
  Get,
  Post,
  HttpStatus,
  HttpException,
} from '@nestjs/common';

import {AppService} from './app.service';
import {requestTrialDto} from './dto/app.dto';
import {Public} from './utils/publicDecorator.util';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @Get()
  getHealth(): Record<string, any> {
    const health = this.appService.getHealth();
    if (health.ok) {
      return {
        healthy: health.ok,
        stage: process.env.STAGE,
        nowUTC: new Date(),
        timestamp: Date.now(),
      };
    } else {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
  }

  @Post('requestTrial')
  async requestTrial(@Body() post: requestTrialDto): Promise<any> {
    if (post?.name && post?.email) {
      try {
        await this.appService.requestTrial(post);
        return;
      } catch (err) {
        throw new HttpException(
          'Failed to send email',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    } else {
      throw new HttpException('Missing key(s)', HttpStatus.BAD_REQUEST);
    }
  }
}
