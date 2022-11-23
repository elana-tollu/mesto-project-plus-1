import { Schema, model } from 'mongoose';
import isEmail from 'validator/lib/isEmail';

export interface IUser {
  name: string;
  about: string;
  avatar: string;
  email: string;
  password: string;
}

const userSchema = new Schema({
  name: {
    type: String,
    default: 'Жак-Ив Кусто',
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    default: 'Исследователь',
    minlength: 2,
    maxlength: 200,
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator(v: string): boolean {
        return !!new URL(v);
      },
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(v: string): boolean {
        return isEmail(v);
      },
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

export const User = model<IUser>('user', userSchema);

User.ensureIndexes();
