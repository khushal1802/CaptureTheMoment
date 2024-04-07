const joi = require("joi");

const photoCreateValidation = {
  body: joi.object().keys({
    name: joi.string().trim(),
    description: joi.string().trim(),
    image: joi.string().trim(),
  }),
};

const photoUpdateValidation = {
  params: joi.object().keys({
    id: joi.string().trim().required(),
  }),
  body: joi.object().keys({
    name: joi.string().trim(),
    description: joi.string().trim(),
    image: joi.string().trim(),
  }),
};

const photoDelelteValidation = {
  params: joi.object().keys({
    id: joi.string().trim().required(),
  }),
};

module.exports = {
  photoCreateValidation,
  photoUpdateValidation,
  photoDelelteValidation,
};
