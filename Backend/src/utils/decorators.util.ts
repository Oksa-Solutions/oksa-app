import {applyDecorators} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiHeader,
  ApiUnauthorizedResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiForbiddenResponse,
} from '@nestjs/swagger';

export const JwtAuth = (tokenType = 'authToken'): any => {
  return applyDecorators(
    unauthorizedReq(),
    ApiBearerAuth(),
    ApiHeader({
      name: 'Authorization',
      description: `Bearer <${tokenType}>`,
    }),
  );
};

export const ApiKeyAuth = (): any => {
  return applyDecorators(
    ApiHeader({
      name: 'x-api-key',
      description: 'Api key',
    }),
  );
};

export const unauthorizedReq = (): any => {
  return applyDecorators(
    ApiUnauthorizedResponse({
      description: 'Invalid/expired token',
      schema: {
        properties: {
          ok: {
            example: false,
          },
          data: {
            example: 'Unauthorized',
          },
        },
      },
    }),
  );
};
export const forbiddenReq = (example = 'Forbidden resource'): any => {
  return applyDecorators(
    ApiForbiddenResponse({
      schema: {
        properties: {
          statusCode: {
            example: 403,
          },
          message: {
            example,
          },
          error: {
            example: 'Forbidden',
          },
        },
      },
    }),
  );
};
export const missingParameters = (): any => {
  return applyDecorators(
    ApiBadRequestResponse({
      schema: {
        properties: {
          ok: {
            example: false,
          },
          data: {
            example: 'Missing key(s)',
          },
        },
      },
    }),
  );
};

export const notFound = (example = 'Failure'): any => {
  return applyDecorators(
    ApiNotFoundResponse({
      description: 'Any other failure',
      schema: {
        properties: {
          ok: {
            example: false,
          },
          data: {
            example,
          },
        },
      },
    }),
  );
};
