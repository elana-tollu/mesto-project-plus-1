import express, { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import { errors, celebrate, Joi } from 'celebrate';
import { createUser } from './controllers/users';
import { signin } from './controllers/auth';
import usersRoutes from './routes/users';
import cardsRoutes from './routes/cards';
import { AppError, internalServerError } from './errors';
import { requestLogger, errorLogger } from './middlewares/logger';
import { authenticate } from './middlewares/auth';

declare global{
  namespace Express {
      interface Request {
          user: { _id: string }
      }
  }
}

const { PORT = 3000 } = process.env;
const app = express();

app.use(requestLogger);
app.use(cookieParser());
app.use(express.json());

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
}), signin);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), createUser);

app.use(authenticate);

app.use('/cards', cardsRoutes);

app.use('/users', usersRoutes);

app.use(errorLogger);

app.use(errors());

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  const appError = err instanceof AppError ? err : internalServerError('На сервере произошла ошибка');
  res
    .status(appError.statusCode)
    .send({ message: appError.message });
});

mongoose.connect('mongodb://mesto_user:mesto_password@localhost:27017/mestodb');

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
