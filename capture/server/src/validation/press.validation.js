const joi = require("joi");

const pressCreateValidation = {
  body: joi.object().keys({
    name: joi.string().trim(),
    description: joi.string().trim(),
      press: joi.string().trim(),
    title: joi.string().trim(),
  }),
};

const pressUpdateValidation = {
  params: joi.object().keys({
    id: joi.string().trim().required(),
  }),
  body: joi.object().keys({
    name: joi.string().trim(),
    description: joi.string().trim(),
      press: joi.string().trim(),
    title: joi.string().trim(),
  }),
};

const pressDelelteValidation = {
  params: joi.object().keys({
    id: joi.string().trim().required(),
  }),
};

module.exports = {
  pressCreateValidation,
  pressUpdateValidation,
  pressDelelteValidation,
};
