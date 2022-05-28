export const mockedConfigService = {
  get(key: string): string {
    switch (key) {
      case 'ACCESS_TOKEN_SECRET':
        return 'AccessTokenSecret';
      case 'REFRESH_TOKEN_SECRET':
        return 'RefreshTokenSecret';
    }
  },
};
