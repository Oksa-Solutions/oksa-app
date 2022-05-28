import * as redis from 'redis';
import {Response} from 'express';
import {meetingChannel, cardsChannel} from './constants.util';

export default class RedisClient {
  client: redis.RedisClient;
  private readonly meetingUUID: string;
  private readonly res: Response;
  private timerRef: NodeJS.Timeout | null;

  constructor(res: Response, meetingUUID: string) {
    this.client = redis.createClient({url: `redis://${process.env.REDIS_URL}`});
    this.res = res;
    this.timerRef = null;
    this.meetingUUID = meetingUUID;
    this.res.writeHead(200, {
      Connection: 'keep-alive',
      'Content-type': 'text/event-stream',
      'Cache-Control': 'no-cache',
    });
    this.timerRef = setInterval(() => {
      res.write(`data: ${JSON.stringify({type: 'ping'})}\n\n`);
    }, 55000);
    this.subscribeToChannels();
    this.client.on('pmessage', (pattern, channel, message) => {
      const msgObj = JSON.parse(message);
      if (msgObj.meeting.uuid === this.meetingUUID) {
        this.res.write(`data: ${JSON.stringify({type: channel, ...msgObj})}`);
        this.res.write('\n\n');
      }
    });
  }

  subscribeToChannels(): void {
    this.client.psubscribe(meetingChannel);
    this.client.psubscribe(cardsChannel);
  }

  unsubscribeChannels(): void {
    clearInterval(this.timerRef);
    this.timerRef = null;
    this.client.punsubscribe(meetingChannel);
    this.client.punsubscribe(cardsChannel);
    this.res.end();
  }
}
