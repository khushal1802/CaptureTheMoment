const joi = require("joi");

const videoCreateValidation = {
  body: joi.object().keys({
    name: joi.string().trim(),
    description: joi.string().trim(),
    video: joi.string().trim(),
  }),
};

const videoUpdateValidation = {
  params: joi.object().keys({
    id: joi.string().trim().required(),
  }),
  body: joi.object().keys({
    name: joi.string().trim(),
    description: joi.string().trim(),
    video: joi.string().trim(),
  }),
};

const videoDelelteValidation = {
  params: joi.object().keys({
    id: joi.string().trim().required(),
  }),
};

module.exports = {
  videoCreateValidation,
  videoUpdateValidation,
  videoDelelteValidation,
};
