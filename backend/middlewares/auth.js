const jwt = require('jsonwebtoken');

export let BASE_URL = "";
const { NODE_ENV } = process.env;
if (NODE_ENV === "production") {
  BASE_URL = "https://mesto.vlrtyan.nomoredomains.sbs";
} else {
  BASE_URL = "http://localhost:3000";

const { JWT_SECRET = 'secret-key' } = process.env;
const UnauthorizedError = require('../errors/UnauthorizedError');

// eslint-disable-next-line consistent-return
module.exports.isAuthorised = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new UnauthorizedError('Пользователь не авторизован'));
  }
  const token = authorization.replace('Bearer ', '');

  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    next(new UnauthorizedError('Пользователь не авторизован'));
  }

  req.user = payload;
  next();
};
