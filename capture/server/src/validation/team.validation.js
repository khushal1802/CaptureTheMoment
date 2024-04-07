const joi = require("joi");

const teamCreateValidation = {
  body: joi.object().keys({
    name: joi.string().trim(),
    description: joi.string().trim(),
    photo: joi.string().trim(),
    role: joi.string().trim,
  }),
};

const teamUpdateValidation = {
  params: joi.object().keys({
    id: joi.string().trim().required(),
  }),
  body: joi.object().keys({
    name: joi.string().trim(),
    description: joi.string().trim(),
    photo: joi.string().trim(),
    role: joi.string().trim,
  }),
};

const teamDelelteValidation = {
  params: joi.object().keys({
    id: joi.string().trim().required(),
  }),
};

module.exports = {
  teamCreateValidation,
  teamUpdateValidation,
  teamDelelteValidation,
};
