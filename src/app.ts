import express from 'express';
import mongoose from 'mongoose';

import user from './models/user';

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://mesto_user:mesto_password@localhost:27017/mestodb');
user.find({})
  .then((users) => console.log(users));







app.get('/', (req, res) => {
  res.send('Hello, Darling!');
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
