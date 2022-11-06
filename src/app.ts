import express from 'express';
import mongoose from 'mongoose';

import user from './models/user';

const { PORT = 3000 } = process.env;
const app = express();

app.use(express.json());

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

console.info('This is info');
console.warn('This is warning');
console.error('This is error');

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

