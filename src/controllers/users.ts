import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import { badRequestError, notFoundError } from '../errors';
import user from '../models/user';

export function getAllUsers(req: Request, res: Response, next: NextFunction) {
  user.find({})
    .then((users) => res.send(users))
    .catch(next);
}

export function createUser(req: Request, res: Response, next: NextFunction) {
  user.create(req.body)
    .then((createdUser) => {
      res.json(createdUser);
    })
    .catch((err: Error) => {
      const error = err instanceof mongoose.Error.ValidationError
        ? badRequestError(err.message)
        : err;
      next(error);
    });
}

export function getUserById(req: Request, res: Response, next: NextFunction) {
  user.findById(req.params.userId)
    .then((theUser) => {
      if (theUser === null) {
        throw notFoundError('Пользователь не найден');
      }
      res.json(theUser);
    })
    .catch(next);
}

export function editUser(req: Request, res: Response, next: NextFunction) {
  user.findByIdAndUpdate(req.user._id, req.body, { new: true, runValidators: true })
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
  user.findByIdAndUpdate(
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
