import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import { badRequestError, forbiddenError, notFoundError } from '../errors';

import card, { ICard } from '../models/card';

export function getAllCards(req: Request, res: Response, next: NextFunction) {
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
  getCardById(req.params.cardId)
    .then((theCard) => {
      if (!theCard.owner.equals(req.user._id)) {
        throw forbiddenError('Вы не можете удалить чужую карточку');
      }
      return theCard;
    })
    .then((theCard) => card.deleteOne({ _id: theCard._id }))
    .then(() => {
      res.status(200).end();
    })
    .catch(next);
}

function getCardById(cardId: string): Promise<ICard> {
  return card.findById(cardId)
    .then((theCard) => {
      if (theCard === null) {
        throw notFoundError('Карточка не найдена');
      }
      return theCard;
    });
}
