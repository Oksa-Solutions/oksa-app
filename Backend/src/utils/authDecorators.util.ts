import {applyDecorators} from '@nestjs/common';
import {ApiBody, ApiOkResponse} from '@nestjs/swagger';
import {
  forbiddenReq,
  JwtAuth,
  missingParameters,
  notFound,
} from './decorators.util';

export const authMeeting = (): any => {
  return applyDecorators(
    ApiBody({
      schema: {
        properties: {
          meetingID: {
            example: 'xxx-yyy-zzz',
          },
          password: {
            example: 'Password123',
          },
          uuid: {
            example: '2ff5cb30-1da5-4090-9637-3601dc2fe03f',
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
              authToken:
                'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZWV0aW5ncyI6WyI5Nm4tODBnLTVxaCJdLCJpYXQiOjE2MDMzODc5MjcsImV4cCI6MTYwMzM4ODgyN30.vrpd4rtp4bjCNeAM9qyq8N5d3MTm4u2QdQFLDZ2w0HY',
              refreshToken:
                'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZWV0aW5ncyI6WyI5Nm4tODBnLTVxaCJdLCJpYXQiOjE2MDMzODc5MjcsImV4cCI6MTYzNDkyMzkyN30.n1FixxZ0pNVblPPI7gqYAasZnee--R3I1f4IzObzUik',
            },
          },
        },
      },
    }),
    notFound('Faced error during authentication'),
    missingParameters(),
    forbiddenReq(),
    JwtAuth(),
  );
};

export const refreshToken = (): any => {
  return applyDecorators(
    ApiBody({
      schema: {
        properties: {
          uuid: {
            example: '2ff5cb30-1da5-4090-9637-3601dc2fe03f',
          },
          refreshToken: {
            example:
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZWV0aW5ncyI6WyI5Nm4tODBnLTVxaCJdLCJpYXQiOjE2MDMzODc5MjcsImV4cCI6MTYzNDkyMzkyN30.n1FixxZ0pNVblPPI7gqYAasZnee--R3I1f4IzObzUik',
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
          authToken: {
            example:
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZWV0aW5ncyI6WyI5Nm4tODBnLTVxaCJdLCJpYXQiOjE2MDMzODc5MjcsImV4cCI6MTYwMzM4ODgyN30.vrpd4rtp4bjCNeAM9qyq8N5d3MTm4u2QdQFLDZ2w0HY',
          },
          refreshToken: {
            example:
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZWV0aW5ncyI6WyI5Nm4tODBnLTVxaCJdLCJpYXQiOjE2MDMzODc5MjcsImV4cCI6MTYzNDkyMzkyN30.n1FixxZ0pNVblPPI7gqYAasZnee--R3I1f4IzObzUik',
          },
        },
      },
    }),
    notFound('Token creation failed'),
    missingParameters(),
  );
};
