import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';
import { createUser } from '../controllers/users';
import { signin } from '../controllers/auth';

const router = Router();

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
}), signin);

router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), createUser);

export default router;
