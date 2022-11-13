import { NextFunction, Request, Response } from 'express';

import card from '../models/card';

export function getAllCards(req: Request, res: Response, next: NextFunction) {
  card.find({})
    .then((cards) => res.send(cards))
    .catch(next);
}

export function addCardsOwner(req: Request, res: Response, next: NextFunction) {
  const newCard = {
    ...req.body,
    owner: req.user._id,
  };
  card.create(newCard)
    .then((createdCard) => {
      res.json(createdCard);
    })
    .catch(next);
}

export function addCardsLike(req: Request, res: Response, next: NextFunction) {
  card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((theCard) => res.json(theCard))
    .catch(next);
}

export function deleteCardsLike(req: Request, res: Response, next: NextFunction) {
  card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then((theCard) => res.json(theCard))
    .catch(next);
}

export function deleteCard(req: Request, res: Response, next: NextFunction) {
  card.deleteOne({ _id: req.params.cardId })
    .then((deleteResult) => {
      if (deleteResult.deletedCount === 1) {
        res.status(200).end();
      } else {
        res.status(404).end();
      }
    })
    .catch(next);
}
