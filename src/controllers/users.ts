import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import { hash } from 'bcrypt';
import { badRequestError, conflictError, notFoundError } from '../errors';
import { IUser, User } from '../models/user';

export function getAllUsers(req: Request, res: Response, next: NextFunction) {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
}

export function createUser(req: Request, res: Response, next: NextFunction) {
  const signupRequest = req.body;
  hash(signupRequest.password, 10)
    .then((passwordHash: string) => User.create({
      ...signupRequest, password: passwordHash,
    }))
    .then((createdUser: IUser) => {
      res.json(createdUser);
    })
    .catch((err: Error) => {
      let error = err;
      if (err instanceof mongoose.Error.ValidationError) {
        error = badRequestError(err.message);
      }
      if (err instanceof mongoose.mongo.MongoServerError && err.code === 11000) {
        error = conflictError(err.message);
      }

      next(error);
    });
}

export function getUser(req: Request, res: Response, next: NextFunction) {
  getUserById(req.params.userId)
    .then((theUser) => {
      res.json(theUser);
    })
    .catch(next);
}

export function getMe(req: Request, res: Response, next: NextFunction) {
  getUserById(req.user._id)
    .then((theUser) => {
      res.json(theUser);
    })
    .catch(next);
}

function getUserById(userId: string): Promise<IUser> {
  return User.findById(userId)
    .then((theUser) => {
      if (theUser === null) {
        throw notFoundError('Пользователь не найден');
      }
      return theUser;
    });
}

export function editUser(req: Request, res: Response, next: NextFunction) {
  User.findByIdAndUpdate(req.user._id, req.body, { new: true, runValidators: true })
    .then((theUser) => {
      if (theUser === null) {
        throw notFoundError('Пользователь не найден');
      }
      res.json(theUser);
    })
    .catch((err: Error) => {
      const error = err instanceof mongoose.Error.ValidationError
        ? badRequestError(err.message)
        : err;
      next(error);
    });
}

export function editAvatar(req: Request, res: Response, next: NextFunction) {
  User.findByIdAndUpdate(
    req.user._id,
    { avatar: req.body.avatar },
    { new: true, runValidators: true },
  )
    .then((theUser) => {
      if (theUser === null) {
        throw notFoundError('Пользователь не найден');
      }
      res.json(theUser);
    })
    .catch((err: Error) => {
      const error = err instanceof mongoose.Error.ValidationError
        ? badRequestError(err.message)
        : err;
      next(error);
    });
}

/*
function handleErrors(next: NextFunction) {
  return (err: Error) => {
    const error = err instanceof mongoose.Error.ValidationError
      ? badRequestError(err.message)
      : err;
    next(error);
  };
}
*/
