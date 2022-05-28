import {applyDecorators} from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import {
  forbiddenReq,
  JwtAuth,
  missingParameters,
  notFound,
} from './decorators.util';

export const createCard = (): any => {
  return applyDecorators(
    ApiBody({
      schema: {
        properties: {
          meetingID: {
            example: 'xxx-yyy-zzz',
          },
          author: {
            example: 'John Example',
            description: 'Name of the author of the card',
          },
          title: {
            example: 'Summer day',
            description: 'Title of the card',
          },
          content: {
            example: 'lorem ipsum, lorem ipsum',
            description: 'Textual content of the card',
          },
          categories: {
            example: [
              {name: 'category1', color: '#FF0000'},
              {name: 'category2', color: '#00FF00'},
              {name: 'category3', color: '#0000FF'},
            ],
            description: 'List of category objects related to card',
          },
          dates: {
            example: {startDate: 1602862553, endDate: 1602802553},
            description:
              'Start date and end date for the card as epoch timestamp',
            default: {startDate: 0, endDate: 0},
          },
          status: {
            example: 'Approved',
            description: 'Status of the idea',
            default: 'Waiting for review',
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
            example: 'Card created',
          },
        },
      },
    }),
    notFound('Creation failed'),
    missingParameters(),
    forbiddenReq(),
    JwtAuth(),
  );
};

export const readCard = (): any => {
  return applyDecorators(
    ApiBody({
      schema: {
        properties: {
          meetingID: {
            example: 'xxx-yyy-zzz',
          },
          uuid: {
            example: '2ff5cb30-1da5-4090-9637-3601dc2fe03f',
            description: 'Generated UUID of the card',
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
              meetingID: 'xxx-yyy-zzz',
              author: 'John Example',
              title: 'Summer day',
              content: 'lorem ipsum, lorem ipsum',
              votes: {
                yes: ['2ff5cb30-1da5-4090-9637-3601dc2fe03a'],
                no: [
                  '2ff5cb30-1da5-4090-9637-3601dc2fe03b',
                  '2ff5cb30-1da5-4090-9637-3601dc2fe03c',
                ],
              },
              dates: {
                startDate: 1602802553,
                endDate: 1602862553,
              },
              status: 'Approved',
              lastModified: 1602702753,
              created: 1602702553,
              deleted: false,
              categories: [
                {name: 'category1', color: '#00FF00'},
                {name: 'category2', color: '#FF00FF'},
              ],
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

export const readActive = (deleted: boolean): any => {
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
          ok: {
            example: true,
          },
          data: {
            example: [
              {
                uuid: '2ff5cb30-1da5-4090-9637-3601dc2fe03f',
                meetingID: 'xxx-yyy-zzz',
                author: 'John Example',
                title: 'Summer day',
                content: 'lorem ipsum, lorem ipsum',
                votes: {
                  yes: ['2ff5cb30-1da5-4090-9637-3601dc2fe03a'],
                  no: [
                    '2ff5cb30-1da5-4090-9637-3601dc2fe03b',
                    '2ff5cb30-1da5-4090-9637-3601dc2fe03c',
                  ],
                },
                dates: {
                  startDate: 1602802553,
                  endDate: 1602862553,
                },
                status: 'Approved',
                lastModified: 1602702753,
                created: 1602702553,
                deleted,
                categories: [
                  {name: 'category1', color: '#00FF00'},
                  {name: 'category2', color: '#FF00FF'},
                ],
              },
            ],
          },
        },
      },
    }),
    ApiNotFoundResponse({
      description: 'Any other failuere',
      schema: {
        properties: {
          ok: {
            example: false,
          },
          data: {
            example: [],
          },
        },
      },
    }),
    missingParameters(),
    forbiddenReq(),
    JwtAuth(),
  );
};

export const updateCard = (): any => {
  return applyDecorators(
    ApiBody({
      schema: {
        properties: {
          meetingID: {
            example: 'xxx-yyy-zzz',
          },
          uuid: {
            example: '2ff5cb30-1da5-4090-9637-3601dc2fe03f',
            description: 'Generated UUID of the card',
          },
          categories: {
            example: [
              {name: 'category1', color: '#FF0000'},
              {name: 'category2', color: '#00FF00'},
              {name: 'category3', color: '#0000FF'},
            ],
            description: 'List of categories related to the card',
          },
          title: {
            example: 'Summer day',
            description: 'Title of the card',
          },
          content: {
            example: 'lorem ipsum, lorem ipsum',
            description: 'Textual content of the card',
          },
          dates: {
            example: {startDate: 1602802553, endDate: 1602862553},
            description:
              'Start date and end date for the card as epoch timestamp',
          },
          status: {
            example: 'Approved',
            description: 'Status of the idea',
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
              categories: [
                {name: 'category1', color: '#FF0000'},
                {name: 'category2', color: '#00FF00'},
                {name: 'category3', color: '#0000FF'},
              ],
              title: 'Summer day',
              content: 'lorem ipsum, lorem ipsum',
              dates: {startDate: 1602802553, endDate: 1602862553},
              status: 'Approved',
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

export const deleteCard = (): any => {
  return applyDecorators(
    ApiBody({
      schema: {
        properties: {
          uuid: {
            example: '2ff5cb30-1da5-4090-9637-3601dc2fe03f',
            description: 'UUID of the card to be removed',
          },
          meetingID: {
            example: 'xxx-yyy-zzz',
          },
          remover: {
            example: '1d91c307-6c4f-4f1b-a813-3826f1129854',
            description: 'UUID of the remover',
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
            example:
              'Deleted card with ID 2ff5cb30-1da5-4090-9637-3601dc2fe03f',
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

export const voteCard = (): any => {
  return applyDecorators(
    ApiBody({
      schema: {
        properties: {
          uuid: {
            example: '2ff5cb30-1da5-4090-9637-3601dc2fe03f',
            description: 'UUID of the card',
          },
          meetingID: {
            example: 'xxx-yyy-zzz',
          },
          agree: {
            example: true,
            description: 'true if user votes up else false',
          },
          addVote: {
            example: true,
            description: 'false if user removes vote',
          },
          id: {
            example: '1d91c307-6c4f-4f1b-a813-3826f1129854',
            description: 'UUID of the user voting',
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
              votes: {
                yes: ['1d91c307-6c4f-4f1b-a813-3826f1129854'],
                no: [],
              },
            },
          },
        },
      },
    }),
    ApiNotFoundResponse({
      schema: {
        properties: {
          ok: {
            example: false,
          },
          data: {
            example: {
              votes: {},
              lastModified: null,
            },
          },
        },
      },
    }),
    missingParameters(),
    forbiddenReq(),
    JwtAuth(),
  );
};
