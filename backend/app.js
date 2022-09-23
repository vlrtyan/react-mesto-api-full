const bodyParser = require('body-parser');
const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const {
  login, createUser,
} = require('./controllers/users');
const { validateUserBody, validateAuthentification } = require('./middlewares/validators');
const { isAuthorised } = require('./middlewares/auth');
const { errorHandler } = require('./middlewares/error-handler');
const ErrorNotFound = require('./errors/ErrorNotFound');

const { PORT = 3000 } = process.env;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(cors());

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});


app.post('/signup', validateUserBody, createUser);
app.post('/signin', validateAuthentification, login);

app.use(isAuthorised);
app.use('/', require('./routes/users'));
app.use('/', require('./routes/cards'));

app.use((req, res, next) => {
  next(new ErrorNotFound('Пути не существует'));
});

app.use(errorLogger);

// обработчик ошибок celebrate
app.use(errors());

// централизованная обработка ошибок
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`On port ${PORT}`);
});
