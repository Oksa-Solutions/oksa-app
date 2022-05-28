import {Injectable} from '@nestjs/common';
import {SES} from 'aws-sdk';
import {SendEmailRequest} from 'aws-sdk/clients/ses';

import {requestTrialDto} from './dto/app.dto';

@Injectable()
export class AppService {
  getHealth(): {ok: boolean} {
    return {ok: true};
  }

  async requestTrial(post: requestTrialDto): Promise<any> {
    const to = ['asko@oksa.io', 'jore@oksa.io'];
    const msg = `${post.name} requested trial.\n\nContact data left:\nName: ${
      post.name
    }\nEmail: ${post.email}\nPhone: ${
      post?.phoneNumber || 'No phone number given'
    }`;

    const params: SendEmailRequest = {
      Source: 'no-reply@oksa.io',
      Destination: {
        ToAddresses: to,
      },
      Message: {
        Body: {
          Text: {
            Charset: 'UTF-8',
            Data: msg,
          },
        },
        Subject: {
          Charset: 'UTF-8',
          Data: `[Oksa Trial Request] New trial request from ${post.name}`,
        },
      },
    };
    const ses = new SES();
    ses.sendEmail(params, (err: any, data: any) => {
      if (err) console.log(err)
      else console.log(data)
    });
  }
}
