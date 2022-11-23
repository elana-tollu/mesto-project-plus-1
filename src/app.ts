import express, { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';

import usersRoutes from './routes/users';
import cardsRoutes from './routes/cards';
import authRoutes from './routes/auth';
import { AppError, internalServerError } from './errors';

declare global{
  namespace Express {
      interface Request {
          user: { _id: string }
      }
  }
}

const { PORT = 3000 } = process.env;
const app = express();

app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: '63683b3bc09c57e6b17e6d45',
  };
  next();
});

mongoose.connect('mongodb://mesto_user:mesto_password@localhost:27017/mestodb');

app.get('/', (req, res) => {
  res.send('Hello, Darling!');
});

app.use('/cards', cardsRoutes);

app.use('/users', usersRoutes);

app.use('/', authRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  const appError = err instanceof AppError ? err : internalServerError('На сервере произошла ошибка');
  res
    .status(appError.statusCode)
    .send({ message: appError.message });

});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
