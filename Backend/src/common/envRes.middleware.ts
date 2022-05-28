import {Request, Response, NextFunction} from 'express';

const retJson = {
  secrets: 'https://bit.ly/3qM8ayo',
};

export function envResMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (/\\*\.env*/.test(req.path)) {
    res
      .status(202)
      .send(Buffer.from(JSON.stringify(retJson)).toString('base64'));
  } else {
    next();
  }
}
