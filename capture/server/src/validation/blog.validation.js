const joi = require("joi");

const blogCreateValidation = {
  body: joi.object().keys({
    title: joi.string().trim(),
    description: joi.string().trim(),
    image: joi.string().trim(),
  }),
};

const blogUpdateValidation = {
  params: joi.object().keys({
    id: joi.string().trim().required(),
  }),
  body: joi.object().keys({
    title: joi.string().trim(),
    description: joi.string().trim(),
    image: joi.string().trim(),
  }),
};

const blogDelelteValidation = {
  params: joi.object().keys({
    id: joi.string().trim().required(),
  }),
};

module.exports = {
  blogCreateValidation,
  blogUpdateValidation,
  blogDelelteValidation,
};
