import express from 'express';
import mongoose from 'mongoose';

import user from './models/user';

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://mesto_user:mesto_password@localhost:27017/mestodb');
user.findById('635edc8e38776faba385104f')
  .then((user) => console.log(user));

app.get('/', (req, res) => {
  res.send('Hello, Darling!');
});

app.get('/users', (req, res) => {
  user.find({})
    .then((users) => res.send(users));
});

app.get('/users/:userId', (req, res) => {
  user.findById(req.params.userId)
    .then((theUser) => res.json(theUser));
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
