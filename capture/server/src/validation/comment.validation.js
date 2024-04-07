const joi = require("joi");

const commentCreateValidation = {
  body: joi.object().keys({
    name: joi.string().trim(),
    description: joi.string().trim(),
    image: joi.string().trim(),
  }),
};

const commentUpdateValidation = {
  params: joi.object().keys({
    id: joi.string().trim().required(),
  }),
  body: joi.object().keys({
    name: joi.string().trim(),
    description: joi.string().trim(),
    image: joi.string().trim(),
  }),
};

const commentDelelteValidation = {
  params: joi.object().keys({
    id: joi.string().trim().required(),
  }),
};

module.exports = {
  commentCreateValidation,
  commentUpdateValidation,
  commentDelelteValidation,
};
