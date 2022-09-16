const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const { ObjectId } = require('mongoose').Types;

module.exports.validateObjId = celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().custom((value, helpers) => {
      if (ObjectId.isValid(value)) {
        return value;
      }
      return helpers.message('невалидный id');
    }),
  }),
});

module.exports.validateCardId = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().custom((value, helpers) => {
      if (ObjectId.isValid(value)) {
        return value;
      }
      return helpers.message('невалидный id');
    }),
  }),
});

module.exports.validateAvatarUpdate = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message('Поле должно быть url-адресом');
    }),
  }),
});

module.exports.validateUserUpdate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30)
      .messages({
        'string.min': 'минимальная длина поля - 2 символа',
        'string.max': 'максимальная длина поля - 30 символов',
      }),
    about: Joi.string().min(2).max(30)
      .messages({
        'string.min': 'минимальная длина поля - 2 символа',
        'string.max': 'максимальная длина поля - 30 символов',
      }),
    avatar: Joi.string().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message('Поле должно быть url-адресом');
    }),
  }),
});

module.exports.validateCardBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30)
      .messages({
        'string.min': 'минимальная длина поля - 2 символа',
        'string.max': 'максимальная длина поля - 30 символов',
        'string.required': 'поле должно быть заполнено',
      }),
    link: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message('Поле должно быть url-адресом');
    })
      .messages({
        'string.required': 'поле должно быть заполнено',
      }),
  }),
});

module.exports.validateUserBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30)
      .messages({
        'string.min': 'минимальная длина поля - 2 символа',
        'string.max': 'максимальная длина поля - 30 символов',
      }),
    about: Joi.string().min(2).max(30)
      .messages({
        'string.min': 'минимальная длина поля - 2 символа',
        'string.max': 'максимальная длина поля - 30 символов',
      }),
    avatar: Joi.string().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message('Поле должно быть url-адресом');
    }),
    email: Joi.string().required().email()
      .messages({
        'string.email': 'поле должно содержать email',
        'string.required': 'поле должно быть заполнено',
      }),
    password: Joi.string().required()
      .messages({
        'string.required': 'поле должно быть заполнено',
      }),
  }),
});

module.exports.validateAuthentification = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email()
      .messages({
        'string.email': 'поле должно содержать email',
        'string.required': 'поле должно быть заполнено',
      }),
    password: Joi.string().required()
      .messages({
        'string.required': 'поле должно быть заполнено',
      }),
  }),
});
