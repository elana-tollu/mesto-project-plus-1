import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { // у пользователя есть имя — опишем требования к имени в схеме:
    type: String, // имя — это строка
    required: true, // имя — обязательное поле
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String, // гендер — это строка
    required: true, // имя — обязательное поле
    minlength: 2,
    maxlength: 200,
  },
  avatar: { // у пользователя есть имя — опишем требования к имени в схеме:
    type: String, // имя — это строка
    required: true,
  },
});

export default mongoose.model('user', userSchema);
