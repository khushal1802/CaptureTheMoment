const dotenv = require("dotenv");
const Joi = require("joi");

dotenv.config();

const envVarsSchema = Joi.object({
  PORT: Joi.number().integer(),
  CORS_ORIGIN: Joi.string().trim(),
  MONGODB_URI: Joi.string().trim(),
  // DATABASE_NAME: Joi.string().trim(),
  JWT_SECRET_KEY: Joi.string().trim(),
  ACCESS_TOKEN_SECRET: Joi.string().trim(),
  ACCESS_TOKEN_EXPIRY: Joi.string().trim(),
  SMTP_HOST: Joi.string().description("server that will send the emails"),
  SMTP_PORT: Joi.number().description("port to connect to the email server"),
  SMTP_USERNAME: Joi.string().description("username for email server"),
  SMTP_PASSWORD: Joi.string().description("password for email server"),
  EMAIL_FROM: Joi.string().description(
    "the from field in the emails sent by the app"
  ),
  // STRIPE_PUBLISHABLE_KEY: Joi.string().description("Stripe publishable key"),
  // STRIPE_SECRET_KEY: Joi.string().description("Stripe Secret key"),
}).unknown();

const { value: envVars, err } = envVarsSchema
  .prefs({ errors: { label: "key" } })
  .validate(process.env);

if (err) {
  resizeBy.status(400).json({
    Error: `ENV config error..! :-> ${err.message}`,
  });
}

module.exports = {
  port: envVars.PORT,
  origin: envVars.CORS_ORIGIN,
  mongodb: {
    url: envVars.MONGODB_URI,
    // dbname: envVars.DATABASE_NAME,
  },
  jwt: {
    secretKey: envVars.JWT_SECRET_KEY,
    accessTokenKey: envVars.ACCESS_TOKEN_SECRET,
    expiresInAccess: envVars.ACCESS_TOKEN_EXPIRY,
  },
  email: {
    smtp: {
      host: envVars.SMTP_HOST,
      port: envVars.SMTP_PORT,
      auth: {
        user: envVars.SMTP_USERNAME,
        pass: envVars.SMTP_PASSWORD,
      },
    },
    from: envVars.EMAIL_FROM,
  },
// stripe:{
//   secretKey:envVars.STRIPE_SECRET_KEY,
//   publishableKey:envVars.STRIPE_PUBLISHABLE_KEY
// }
};
