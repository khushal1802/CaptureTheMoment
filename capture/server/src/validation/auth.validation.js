const Joi = require("joi");

/** Create validation */
const authCreateValidation = {
  body: Joi.object().keys({
    Profile: Joi.string().trim(),
    Password: Joi.string().trim(),
    Name: Joi.string().trim(),
    DOB: Joi.date().max("now"),
    Address: Joi.string().trim(),
    Phone: Joi.string()
      .trim()
      .pattern(/^[0-9]{10}$/),
    Email: Joi.string()
      .trim()
      .lowercase()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "org"] } }),
    Role: Joi.string().trim(),
  }),
};

/** Get user details by id */
const getDetails = {
  params: Joi.object().keys({
    _id: Joi.string().required().trim(),
  }),
};

/** Update validation */
const authUpdateValidation = {
  // params: Joi.object().keys({
  //   id: Joi.string().trim().required(),
  // }),
  body: Joi.object().keys({
    Profile: Joi.string().trim(),
    Password: Joi.string().trim(),
    Name: Joi.string().trim(),
    DOB: Joi.date().max("now"),
    Address: Joi.string().trim(),
    Phone: Joi.string()
      .trim()
      .pattern(/^[0-9]{10}$/),
    Email: Joi.string()
      .trim()
      .lowercase()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "org"] } }),
    Role: Joi.string().trim(),
  }),
};

/** Delete Validation */
const authDelelteValidation = {
  // params: Joi.object().keys({
  //   id: Joi.string().trim().required(),
  // }),
};

/** Send mail */
const sendMail = {
  body: Joi.object({
    email: Joi.string().required().trim().email(),
    subject: Joi.string().required().trim(),
    text: Joi.string().required().trim(),
  }),
};
module.exports = {
  authCreateValidation,
  getDetails,
  authUpdateValidation,
  authDelelteValidation,
  sendMail,
};
