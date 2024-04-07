const joi = require("joi");

const packageCreateValidation = {
  body: joi.object().keys({
    title: joi.string().trim(),
    price: joi.number().required(),
    fild: joi.string().trim(),
    type: joi.string().trim(),
    hours: joi.string().trim(),
    member: joi.string().trim(),
    album: joi.string().trim(),
    description: joi.string().trim(),
  }),
};

const packageUpdateValidation = {
  params: joi.object().keys({
    id: joi.string().trim().required(),
  }),
  body: joi.object().keys({
    title: joi.string().trim(),
    price: joi.number().integer().required(),
    fild: joi.string().trim(),
    type: joi.string().trim(),
    hours: joi.string().trim(),
    member: joi.string().trim(),
    album: joi.string().trim(),
    description: joi.string().trim(),
  }),
};

const packageDelelteValidation = {
  params: joi.object().keys({
    id: joi.string().trim().required(),
  }),
};

module.exports = {
  packageCreateValidation,
  packageUpdateValidation,
  packageDelelteValidation,
};
