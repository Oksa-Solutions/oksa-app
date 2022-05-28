import {TEST_USER_UUID} from 'test/testData';

export const mockedTokensService = {
  getUuidFromToken: jest.fn().mockImplementation(() => TEST_USER_UUID),
  getTokenKeys: jest.fn().mockImplementation(),
  createTokens: jest.fn().mockImplementation(() => {
    return {
      ok: true,
      data: {
        authToken: 'TestAuthToken',
        refreshToken: 'TestRefreshToken',
      },
    };
  }),
  isSuperAdmin: jest.fn().mockImplementation(),
};
