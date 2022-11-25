import express, { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import { errors } from 'celebrate';
import usersRoutes from './routes/users';
import cardsRoutes from './routes/cards';
import authRoutes from './routes/auth';
import { AppError, internalServerError } from './errors';
import { requestLogger, errorLogger } from './middlewares/logger';

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

mongoose.connect('mongodb://mesto_user:mesto_password@localhost:27017/mestodb');

app.get('/', (req, res) => {
  res.send('Hello, Darling!');
});

app.use('/cards', cardsRoutes);

app.use('/users', usersRoutes);

app.use('/', authRoutes);

app.use(errorLogger);

app.use(errors());

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  const appError = err instanceof AppError ? err : internalServerError('На сервере произошла ошибка');
  res
    .status(appError.statusCode)
    .send({ message: appError.message });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
