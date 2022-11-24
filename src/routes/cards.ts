import { Router } from 'express';
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

router.post('/', addCard);

export default router;
