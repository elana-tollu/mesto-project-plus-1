import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import { badRequestError, notFoundError } from '../errors';

import card from '../models/card';

export function getAllCards(req: Request, res: Response, next: NextFunction) {
  console.log('cards');
  card.find({})
    .then((cards) => res.send(cards))
    .catch(next);
}

export function addCard(req: Request, res: Response, next: NextFunction) {
  const newCard = {
    ...req.body,
    owner: req.user._id,
  };
  card.create(newCard)
    .then((createdCard) => {
      res.json(createdCard);
    })
    .catch((err: Error) => {
      const error = err instanceof mongoose.Error.ValidationError
        ? badRequestError(err.message)
        : err;
      next(error);
    });
}

export function addCardsLike(req: Request, res: Response, next: NextFunction) {
  card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((theCard) => {
      if (theCard === null) {
        throw notFoundError('Карточка не найдена');
      }
      res.json(theCard);
    })
    .catch(next);
}

export function deleteCardsLike(req: Request, res: Response, next: NextFunction) {
  card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then((theCard) => {
      if (theCard === null) {
        throw notFoundError('Карточка не найдена');
      }
      res.json(theCard);
    })
    .catch(next);
}

export function deleteCard(req: Request, res: Response, next: NextFunction) {
  card.deleteOne({ _id: req.params.cardId })
    .then((deleteResult) => {
      if (deleteResult.deletedCount === 1) {
        res.status(200).end();
      } else {
        throw notFoundError('Карточка не найдена');
      }
    })
    .catch(next);
}
