import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import { compare } from 'bcrypt';
import * as jose from 'jose';
import {
  badRequestError, conflictError, notFoundError, unauthorizedError,
} from '../errors';
import { IUser, User } from '../models/user';

export function signin(req: Request, res: Response, next: NextFunction) {
  const loginRequest = req.body;
  User.findOne({ email: loginRequest.email }).select('+password')
    .then((theUser) => {
      if (theUser === null) {
        throw unauthorizedError('Доступ запрещен');
      }
      return compare(loginRequest.password, theUser.password)
        .then((result) => {
          if (!result) {
            throw unauthorizedError('Доступ запрещен');
          }
          const jwt = new jose.UnsecuredJWT({ _id: theUser._id })
            .setIssuedAt()
            .setExpirationTime('7d')
            .encode();

          res.cookie('auth', jwt, { httpOnly: true });
          res.end();
        });
    })
    .catch(next);
}

export function signUp(req: Request, res: Response, next: NextFunction) {

}
