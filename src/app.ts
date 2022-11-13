import express, { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';

import user from './models/user';
import card from './models/card';

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

app.get('/users', (req, res, next) => {
  user.find({})
    .then((users) => res.send(users))
    .catch(next);
});

app.post('/users', (req, res, next) => {
  user.create(req.body)
    .then((createdUser) => {
      res.json(createdUser);
    })
    .catch(next);
});

app.get('/users/:userId', (req, res, next) => {
  user.findById(req.params.userId)
    .then((theUser) => res.json(theUser))
    .catch(next);
});

app.patch('/users/me', (req, res, next) => {
  user.findByIdAndUpdate(req.user._id, req.body, { new: true })
    .then((theUser) => res.json(theUser))
    .catch(next);
});

app.patch('/users/me/avatar', (req, res, next) => {
  user.findByIdAndUpdate(req.user._id, { avatar: req.body.avatar}, { new: true })
    .then((theUser) => res.json(theUser))
    .catch(next);
});

app.get('/cards', (req, res, next) => {
  card.find({})
    .then((cards) => res.send(cards))
    .catch(next);
});

app.post('/cards', (req, res, next) => {
  const newCard = {
    ...req.body,
    owner: req.user._id,
  };
  card.create(newCard)
    .then((createdCard) => {
      res.json(createdCard);
    })
    .catch(next);
});

app.put('/cards/:cardId/likes', (req, res, next) => {
  card.findByIdAndUpdate(req.params.cardId, {$addToSet: {likes: req.user._id}}, { new: true })
  .then((theCard) => res.json(theCard))
  .catch(next);
});

app.delete('/cards/:cardId/likes', (req, res, next) => {
  card.findByIdAndUpdate(req.params.cardId, {$pull: {likes: req.user._id}}, { new: true })
  .then((theCard) => res.json(theCard))
  .catch(next);
});

app.delete('/cards/:cardId', (req, res, next) => {
  card.deleteOne({ _id: req.params.cardId })
    .then((deleteResult) => {
      if (deleteResult.deletedCount === 1) {
        res.status(200).end();
      } else {
        res.status(404).end();
      }
    })
    .catch(next);
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).send({ message: 'Error' });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
