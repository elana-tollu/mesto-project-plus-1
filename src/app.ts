import express, { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';

import { createUser, editAvatar, editUser, getAllUsers, getUserById } from './controllers/users';
import { addCardsLike, addCardsOwner, deleteCard, deleteCardsLike, getAllCards } from './controllers/cards';

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

app.get('/users', getAllUsers);

app.post('/users', createUser);

app.get('/users/:userId', getUserById);

app.patch('/users/me', editUser);

app.patch('/users/me/avatar', editAvatar);

app.get('/cards', getAllCards);

app.post('/cards', addCardsOwner);

app.put('/cards/:cardId/likes', addCardsLike);

app.delete('/cards/:cardId/likes', deleteCardsLike);

app.delete('/cards/:cardId', deleteCard);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).send({ message: 'Error' });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
