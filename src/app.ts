import express from 'express';
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

app.get('/users', (req, res) => {
  user.find({})
    .then((users) => res.send(users));
});

app.post('/users', (req, res) => {
  user.create(req.body)
    .then((createdUser) => {
      res.json(createdUser);
    });
});

app.get('/users/:userId', (req, res) => {
  user.findById(req.params.userId)
    .then((theUser) => res.json(theUser));
});

app.get('/cards', (req, res) => {
  card.find({})
    .then((cards) => res.send(cards));
});

app.post('/cards', (req, res) => {
  const newCard = {
    ...req.body,
    owner: req.user._id,
  };
  card.create(newCard)
    .then((createdCard) => {
      res.json(createdCard);
    });
});

app.delete('/cards/:cardId', (req, res) => {
  card.deleteOne({ _id: req.params.cardId })
    .then((deleteResult) => {
      if (deleteResult.deletedCount === 1) {
        res.status(200).end();
      } else {
        res.status(404).end();
      }
    });
});

console.info('This is info');
console.warn('This is warning');
console.error('This is error');

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
