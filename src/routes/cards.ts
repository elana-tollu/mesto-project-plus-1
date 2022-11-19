import { Router } from 'express';

import {
  addCardsLike, addCardsOwner, deleteCard, deleteCardsLike, getAllCards,
} from '../controllers/cards';

const router = Router();

router.put('/:cardId/likes', addCardsLike);

router.delete('/:cardId/likes', deleteCardsLike);

router.delete('/:cardId', deleteCard);

router.get('/', getAllCards);

router.post('/', addCardsOwner);

export default router;
