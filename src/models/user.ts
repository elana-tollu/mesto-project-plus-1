import { Schema, model } from 'mongoose';
import isEmail from 'validator/lib/isEmail';

interface IUser {
  name: string;
  about: string;
  avatar: string;
}

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 200,
  },
  avatar: {
    type: String,
    validate: {
      validator(v: string): boolean {
        return !!new URL(v);
      },
    },
    required: true,
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
});

const user = model<IUser>('user', userSchema);

user.ensureIndexes();

export default user;
