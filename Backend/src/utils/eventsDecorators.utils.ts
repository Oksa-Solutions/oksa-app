import {applyDecorators} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiHeader,
  ApiOkResponse,
  ApiParam,
} from '@nestjs/swagger';
import {forbiddenReq} from './decorators.util';

export const subscribeEvents = (): any => {
  return applyDecorators(
    ApiParam({
      name: 'meetingID',
      required: true,
      description: 'xxx-yyy-zzz',
    }),
    ApiOkResponse(),
    forbiddenReq(),
    ApiBearerAuth(),
    ApiHeader({
      name: 'Authorization',
      description: 'Bearer <authToken>',
    }),
  );
};
