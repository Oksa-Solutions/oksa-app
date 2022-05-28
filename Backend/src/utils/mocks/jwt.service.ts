export const mockedJwtService = {
  sign: (): string => '',
  decode: (token: string): any => {
    const payload = token.split('.')[1] || '';
    return JSON.parse(Buffer.from(payload, 'base64').toString('ascii'));
  },
};
