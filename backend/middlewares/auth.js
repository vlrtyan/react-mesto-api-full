const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');
const { NODE_ENV, JWT_SECRET } = process.env;

// eslint-disable-next-line consistent-return
module.exports.isAuthorised = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new UnauthorizedError('Пользователь не авторизован'));
  }
  const token = authorization.replace('Bearer ', '');

  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV ? JWT_SECRET : 'very_secret');
  } catch (err) {
    next(new UnauthorizedError('Пользователь не авторизован'));
  }

  req.user = payload;
  next();
};
