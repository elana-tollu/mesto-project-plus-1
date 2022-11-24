import { NextFunction, Request, Response } from 'express';
import * as jose from 'jose';
import { User } from '../models/user';
import { unauthorizedError } from '../errors';

export function getAllUsers(req: Request, res: Response, next: NextFunction) {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
}

export function authenticate(req: Request, res: Response, next: NextFunction) {
  const user = extractUser(req);
  if (user === null) {
    next(unauthorizedError('Требуется аутентификация'));
    return;
  }
  req.user = user;
  next();
}

function extractUser(req: Request): ({ _id: string } | null) {
  const encodedJwt = req.cookies.auth;
  if (!encodedJwt) {
    return null;
  }
  const jwt = jose.UnsecuredJWT.decode(encodedJwt) as any;
  if (!jwt?.payload._id) {
    return null;
  }
  return {
    _id: jwt.payload._id,
  };
}
