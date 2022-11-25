import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';
import { authenticate } from '../middlewares/auth';

import {
  addCardsLike, addCard, deleteCard, deleteCardsLike, getAllCards,
} from '../controllers/cards';

const router = Router();

router.use(authenticate);

router.put('/:cardId/likes', addCardsLike);

router.delete('/:cardId/likes', deleteCardsLike);

router.delete('/:cardId', deleteCard);

router.get('/', getAllCards);

router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().uri(),
  }),
}), addCard);

export default router;
