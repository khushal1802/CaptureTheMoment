const joi = require("joi");

const contactCreateValidation = {
  body: joi.object().keys({
    fname: joi.string().trim(),
    lname: joi.string().trim(),
    phone: joi.string()
      .trim()
      .pattern(/^[0-9]{10}$/),
    email: joi.string()
      .trim()
      .lowercase()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "org"] } }),
    description: joi.string().trim(),
  }),
};

const contactUpdateValidation = {
  params: joi.object().keys({
    id: joi.string().trim().required(),
  }),
  body: joi.object().keys({
    fname: joi.string().trim(),
    lname: joi.string().trim(),
    phone: joi
      .string()
      .trim()
      .pattern(/^[0-9]{10}$/),
    email: joi
      .string()
      .trim()
      .lowercase()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "org"] } }),
    description: joi.string().trim(),
  }),
};

const contactDelelteValidation = {
  params: joi.object().keys({
    id: joi.string().trim().required(),
  }),
};

module.exports = {
  contactCreateValidation,
  contactUpdateValidation,
  contactDelelteValidation,
};
