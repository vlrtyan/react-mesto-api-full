const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
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
    maxlength: 30,
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator(v) {
        return /(http:\/\/|https:\/\/)(www)*[a-z0-9\-._~:/?#[\]@!$&'()*+,;=]+#*/.test(v);
      },
    },
  },
  email: {
    type: String,
    unique: true,
    validate: {
      validator: validator.isEmail,
    },
    required: true,
  },
  password: {
    type: String,
    select: false,
    required: true,
  },
}, { versionKey: false });

module.exports = mongoose.model('user', userSchema);
