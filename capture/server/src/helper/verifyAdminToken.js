const jwt = require("jsonwebtoken");
const { Auth } = require("../models");
const config = require("../config/config");

console.log(config.jwt.secretKey);
const auth = () => async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return next(
        res.status(401).json({
          status: 401,
          message: "Please authenticate!",
        })
      );
    }

    const decoded = jwt.verify(
      token.replace("Bearer ", ""),
      config.jwt.secretKey
    );

    if (!decoded) {
      return next(new Error("Please enter valid token!"));
    }

    const auth = await Auth.findOne({ _id: decoded.user });
    if (!auth) {
      return next(new Error("Please authenticate!"));
    }

    req.auth = auth;
    next();
  } catch (error) {
    return next(new Error(error));
  }
};

module.exports = auth;
