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

export const createUser = (): any => {
  return applyDecorators(
    ApiBody({
      schema: {
        properties: {
          name: {
            example: 'John Example',
            description: 'The name of user',
          },
        },
      },
    }),
    ApiCreatedResponse({
      schema: {
        properties: {
          ok: {example: true},
          data: {
            example: {
              uuid: '2ff5cb30-1da5-4090-9637-3601dc2fe03f',
              name: 'John Example',
              authToken:
                'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiZjYwMzJmOGQtMmI0Yy00NThkLThkMWItZDI2NWZkZjA1MzQyIiwibWVldGluZyI6Ijk2bi04MGctNXFoIiwiaWF0IjoxNjAzMjA3MTMzLCJleHAiOjE2MDMyMDgwMzN9.uO2p9rkEXmstNamilrPY5EQ_chsx0NagrI7D-YwRN9E',
              refreshToken:
                'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiZjYwMzJmOGQtMmI0Yy00NThkLThkMWItZDI2NWZkZjA1MzQyIiwibWVldGluZyI6Ijk2bi04MGctNXFoIiwiaWF0IjoxNjAzMjA3MTMzLCJleHAiOjE2MzQ3NDMxMzN9.nXegsJg2Kne3cUCJ8EKLrmBd_-HkKleke_byA_n9_IQ',
            },
          },
        },
      },
    }),
    notFound('Creation failed'),
    missingParameters(),
  );
};

export const readUser = (): any => {
  return applyDecorators(
    ApiBody({
      schema: {
        properties: {
          uuid: {
            example: 'dda72960-b9ca-421f-bfa9-4c4d9462dbcf',
            description: 'The UUID of a user',
          },
        },
      },
    }),
    ApiOkResponse({
      schema: {
        properties: {
          ok: {
            example: true,
          },
          data: {
            example: {
              uuid: '2ff5cb30-1da5-4090-9637-3601dc2fe03f',
              name: 'John Example',
              cards: [
                '2ff5cb30-1da5-4090-9637-3601dc2fe033',
                '2ff5cb30-1da5-4090-9637-3601dc2fe03d',
              ],
              meetings: ['xxx-yyy-zzz', 'aaa-bbb-ccc'],
              lastModified: 1602702753,
              authToken:
                'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiZjYwMzJmOGQtMmI0Yy00NThkLThkMWItZDI2NWZkZjA1MzQyIiwibWVldGluZyI6Ijk2bi04MGctNXFoIiwiaWF0IjoxNjAzMjA3MTMzLCJleHAiOjE2MDMyMDgwMzN9.uO2p9rkEXmstNamilrPY5EQ_chsx0NagrI7D-YwRN9E',
              refreshToken:
                'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiZjYwMzJmOGQtMmI0Yy00NThkLThkMWItZDI2NWZkZjA1MzQyIiwibWVldGluZyI6Ijk2bi04MGctNXFoIiwiaWF0IjoxNjAzMjA3MTMzLCJleHAiOjE2MzQ3NDMxMzN9.nXegsJg2Kne3cUCJ8EKLrmBd_-HkKleke_byA_n9_IQ',
            },
          },
        },
      },
    }),
    notFound('Read failed'),
    missingParameters(),
    unauthorizedReq(),
    forbiddenReq("Missing 'user-uuid' cookie"),
    ApiCookieAuth(),
  );
};

export const updateUser = (): any => {
  return applyDecorators(
    ApiBody({
      schema: {
        properties: {
          uuid: {
            example: 'dda72960-b9ca-421f-bfa9-4c4d9462dbcf',
            description: 'The UUID of the user',
          },
          name: {
            example: 'Modified Misty',
            description: 'The updated name of user',
          },
          meeting: {
            example: {add: true, id: 'xxx-yyy-zzz'},
            description: 'ID of the meeting',
          },
          card: {
            example: {add: true, uuid: 'dda72960-bfa9-421f-b9ca-4c4d9462dbcf'},
            description: 'UUID of the card',
          },
          authToken: {
            example:
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZWV0aW5ncyI6W10sImlhdCI6MTYwMzMwNDU4NiwiZXhwIjoxNjAzMzA1NDg2fQ.fVlsDFIsSge8amLNkP3F92o7UQQlP79s8GXAfk15fX0',
            description: 'Auth token for user',
          },
          refreshToken: {
            example:
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZWV0aW5ncyI6W10sImlhdCI6MTYwMzMwNDU4NiwiZXhwIjoxNjM0ODQwNTg2fQ.KqcXX2f-xKlItk1Mc-Q4FlDlD_0UD33Jdfu_lYSeaYU',
            description: 'Refresh token for user',
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
              uuid: '2ff5cb30-1da5-4090-9637-3601dc2fe03f',
              name: 'Modified Misty',
              meetings: ['xxx-yyy-zzz'],
              cards: ['dda72960-b9ca-bfa9-421f-4c4d9462dbcf'],
              accessToken:
                'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiZjYwMzJmOGQtMmI0Yy00NThkLThkMWItZDI2NWZkZjA1MzQyIiwibWVldGluZyI6Ijk2bi04MGctNXFoIiwiaWF0IjoxNjAzMjA3MTMzLCJleHAiOjE2MDMyMDgwMzN9.uO2p9rkEXmstNamilrPY5EQ_chsx0NagrI7D-YwRN9E',
              refreshToken:
                'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiZjYwMzJmOGQtMmI0Yy00NThkLThkMWItZDI2NWZkZjA1MzQyIiwibWVldGluZyI6Ijk2bi04MGctNXFoIiwiaWF0IjoxNjAzMjA3MTMzLCJleHAiOjE2MzQ3NDMxMzN9.nXegsJg2Kne3cUCJ8EKLrmBd_-HkKleke_byA_n9_IQ',
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

export const deleteUser = (): any => {
  return applyDecorators(
    ApiBody({
      schema: {
        properties: {
          uuid: {
            example: 'dda72960-b9ca-421f-bfa9-4c4d9462dbcf',
            description: 'The UUID of the user',
          },
        },
      },
    }),
    ApiOkResponse({
      schema: {
        properties: {
          ok: {example: true},
          data: {
            example:
              'Deleted user with uuid 2ff5cb30-1da5-4090-9637-3601dc2fe03f',
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
