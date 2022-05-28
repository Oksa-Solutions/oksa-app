import {applyDecorators} from '@nestjs/common';
import {
  ApiBody,
  ApiCookieAuth,
  ApiCreatedResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import {
  forbiddenReq,
  JwtAuth,
  missingParameters,
  notFound,
  unauthorizedReq,
} from './decorators.util';

export const createMeeting = (): any => {
  return applyDecorators(
    ApiBody({
      schema: {
        properties: {
          name: {
            example: 'Team day',
            description: 'Name of the meeting',
          },
          password: {
            example: 'Password123',
            description: 'Plaintext password for the meeting',
          },
          creatorName: {
            example: 'John Example',
            description: 'Name of the creator of the meeting',
          },
          creatorEmail: {
            example: 'john@example.com',
            description: 'Email of the creator of the meeting',
          },
        },
      },
    }),
    ApiCreatedResponse({
      schema: {
        properties: {
          ok: {
            example: true,
          },
          data: {
            example: {
              meetingID: 'xxx-yyy-zzz',
              name: 'Team day',
              password: 'Password123',
              status: 'active',
            },
            description:
              'Data object containing id of the meeting and password to access the meeting',
          },
        },
      },
    }),
    notFound('Creation failed'),
    missingParameters(),
    unauthorizedReq(),
    forbiddenReq("Missing 'user-uuid' cookie"),
    ApiCookieAuth(),
  );
};

export const readMeeting = (): any => {
  return applyDecorators(
    ApiBody({
      schema: {
        properties: {
          meetingID: {
            example: 'xxx-yyy-zzz',
          },
        },
      },
    }),
    ApiOkResponse({
      schema: {
        properties: {
          ok: {example: true},
          data: {
            example: {
              meetingID: 'xxx-yyy-zzz',
              name: 'Team day',
              status: 'Waiting',
            },
          },
        },
      },
    }),
    notFound('Read failed'),
    missingParameters(),
    forbiddenReq(),
    JwtAuth(),
  );
};

export const updateMeeting = (): any => {
  return applyDecorators(
    ApiBody({
      schema: {
        properties: {
          meetingID: {
            example: 'xxx-yyy-zzz',
            description: 'ID of the meeting',
          },
          name: {
            example: 'Team day',
            description: 'Name of the meeting',
          },
          status: {
            example: 'Waiting',
            description: 'Status of the meeting',
          },
        },
      },
    }),
    ApiOkResponse({
      schema: {
        properties: {
          ok: {example: true},
          data: {
            example: {
              name: 'Team day',
              status: 'Waiting',
              lastModified: 1602862553,
            },
          },
        },
      },
    }),
    notFound('Update failed'),
    missingParameters(),
    forbiddenReq(),
    JwtAuth(),
  );
};

export const deleteMeeting = (): any => {
  return applyDecorators(
    ApiBody({
      schema: {
        properties: {
          meetingID: {
            example: 'xxx-yyy-zzz',
            description: 'ID of the meeting',
          },
        },
      },
    }),
    ApiOkResponse({
      schema: {
        properties: {
          ok: {example: true},
          data: {
            example: 'Deleted meeting with ID xxx-yyy-zzz',
          },
        },
      },
    }),
    notFound('Delete failed'),
    missingParameters(),
    forbiddenReq(),
    JwtAuth(),
  );
};
