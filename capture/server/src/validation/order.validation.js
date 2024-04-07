const joi = require("joi");

const orderCreateValidation = {
  body: joi.object().keys({
    name: joi.string().trim(),
    email: joi
      .string()
      .trim()
      .lowercase()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "org"] } }),
    date: joi.date().max("now"),
    address: joi.string().trim(),
    price: joi.number(),
    title: joi.string().trim(),
  }),
};

const orderUpdateValidation = {
  params: joi.object().keys({
    id: joi.string().trim().required(),
  }),
  body: joi.object().keys({
    name: joi.string().trim(),
    email: joi
      .string()
      .trim()
      .lowercase()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "org"] } }),
    date: joi.date().max("now"),
    address: joi.string().trim(),
    price: joi.number(),
    title: joi.string().trim(),
  }),
};

const orderDelelteValidation = {
  params: joi.object().keys({
    id: joi.string().trim().required(),
  }),
};

module.exports = {
  orderCreateValidation,
  orderUpdateValidation,
  orderDelelteValidation,
};
