import { NextFunction, Request, Response } from 'express';

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
    .catch(next);
}

export function getUserById(req: Request, res: Response, next: NextFunction) {
  user.findById(req.params.userId)
    .then((theUser) => res.json(theUser))
    .catch(next);
}

export function editUser(req: Request, res: Response, next: NextFunction) {
  user.findByIdAndUpdate(req.user._id, req.body, { new: true })
    .then((theUser) => res.json(theUser))
    .catch(next);
}

export function editAvatar(req: Request, res: Response, next: NextFunction) {
  user.findByIdAndUpdate(req.user._id, { avatar: req.body.avatar }, { new: true })
    .then((theUser) => res.json(theUser))
    .catch(next);
}
