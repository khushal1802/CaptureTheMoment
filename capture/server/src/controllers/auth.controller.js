const { Auth } = require("../models/index.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config/config.js");
const { uploadOnCloudinary } = require("../utils/cloudinary.js");
const { authService, emailService } = require("../services/index.js");
const ejs = require("ejs");
const path = require("path");

/* ------------------------- create auth controller ------------------------- */
const authCreate = async (req, res) => {
  try {
    /** Create new auth */
    const reqBody = req.body;
    const authExists = await authService.getAuthByEmail(reqBody.Email);
    if (authExists) {
      throw new Error("User already created by this email!");
    }
    const auth = await authService.createAuth(reqBody);

    if (!auth) {
      throw new Error("Something went wrong, please try again or later!");
    }

    /** hash the password */
    auth.Password = await bcrypt.hash(auth.Password, 10);

    /** Genrate token */
    const accessToken = jwt.sign(
      { Password: auth.Password, Email: auth.Email, Phone: auth.Phone },
      config.jwt.accessTokenKey,
      { expiresIn: config.jwt.expiresInAccess }
    );

    auth.AccessToken = accessToken;

    const profileLocalPath = await req.files?.Profile[0]?.path;
    if (profileLocalPath) {
      const profile = await uploadOnCloudinary(profileLocalPath);
      auth.Profile = profile.url;
    }

    /** Save Data into MongoDB database */
    const result = await auth.save();
    if (!result) {
      res.status(400).json({
        Success: false,
        Message: `Error in creating auth ..!`,
      });
    }

    return res.status(200).json({
      Success: true,
      Message: `Auth created successfully..!`,
      Data: result,
    });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({
      Error: error.message,
    });
  }
};

/** Get auth list */
const getAuthList = async (req, res) => {
  try {
    const getList = await authService.getAuthList();

    res.status(200).json({
      success: true,
      message: "Get auth list successfully!",
      data: getList,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/** Get auth details by id */
const getAuthDetails = async (req, res) => {
  try {
    const getDetails = await authService.getAuthById(req.params.authId);
    if (!getDetails) {
      throw new Error("auth not found!");
    }

    res.status(200).json({
      success: true,
      message: "auth details get successfully!",
      data: getDetails,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/** auth details update by id */
const updateAuthDetails = async (req, res) => {
  try {
    const authId = req.params.authId;
    const authExists = await authService.getAuthById(authId);
    if (!authExists) {
      throw new Error("Auth not found!");
    }

    const updateAuth = await authService.updateAuthDetails(authId, req.body);

    const profileLocalPath = req.files?.Profile[0]?.path;
    if (profileLocalPath) {
      const profile = await uploadOnCloudinary(profileLocalPath);
      updateAuth.Profile = profile.url;
    }

    /** Save Data into MongoDB database */
    const result = await updateAuth.save();
    if (!result) {
      return res.status(400).json({
        Success: false,
        Message: "Error in updating auth!",
      });
    }

    return res.status(200).json({
      Success: true,
      Message: "Auth details updated successfully!",
      Data: updateAuth,
    });
  } catch (error) {
    return res.status(400).json({
      Success: false,
      Message: error.message || "Something went wrong.",
    });
  }
};

/** Delete auth */
const deleteAuth = async (req, res) => {
  try {
    const authId = req.params.authId;
    const authExists = await authService.getAuthById(authId);
    if (!authExists) {
      throw new Error("auth not found!");
    }

    await authService.deleteAuth(authId);

    res.status(200).json({
      success: true,
      message: "auth delete successfully!",
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/** Send mail to reqested email */
const sendMail = async (req, res) => {
  try {
    const reqBody = req.body;
    const sendEmail = await emailService.sendMail(
      reqBody.Email,
      reqBody.subject,
      reqBody.text
    );
    console.log(sendEmail);
    if (!sendEmail) {
      throw new Error("Something went wrong, please try again or later.");
    }

    res
      .status(200)
      .json({ success: true, message: "Email send successfully!" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
/* -------------------------- Login Auth controller ------------------------- */
const authLogin = async (req, res) => {
  try {
    const { Email, Password } = req.body;
    const AuthDetail = await authService.getAuthByEmail(Email, Password);

    if (!AuthDetail) {
      res.status(400).json({
        Success: false,
        Message: "Error in found Auth..! Please try again",
      });
    }

    const isPasswordValid = await bcrypt.compare(Password, AuthDetail.Password);
    if (!isPasswordValid) {
      res.status(400).json({
        Success: false,
        Message: "Invalid password..!",
      });
    }

    const token = jwt.sign(
      {
        Email,
        Role: AuthDetail.Role,
      },
      config.jwt.secretKey,
      { expiresIn: config.jwt.expiresInAccess }
    );

    return res.status(200).json({
      Success: true,
      Message: "Login successful..!",
      data: AuthDetail,
    });
  } catch (error) {
    res.status(400).json({
      Error: error.message,
    });
  }
};

module.exports = {
  authCreate,
  getAuthList,
  getAuthDetails,
  updateAuthDetails,
  deleteAuth,
  authLogin,
  sendMail,
};
