const { Router } = require("express");
const validate = require("../../middlewares/schemavalidation");
const { upload } = require("../../middlewares/upload.js");
const { authValidation } = require("../../validation/index.js");
const { authController } = require("../../controllers/index.js");

const router = Router();

/** Auth routes */
router.post(
  "/create",
  validate(authValidation.authCreateValidation),
  upload.fields([{ name: "Profile", maxCount: 1 }]),
  authController.authCreate
);

/** Get auth list */
router.get("/list", authController.getAuthList);

/** Get auth details by id */
router.get(
  "/get-details/:authId",
  validate(authValidation.getDetails),
  authController.getAuthDetails
);

/** auth details update by id */
router.put(
  "/update/:authId",
  validate(authValidation.authUpdateValidation),
  upload.fields([{ name: "Profile", maxCount: 1 }]),
  authController.updateAuthDetails
);

/** Delete auth */
router.delete(
  "/delete/:authId",
  validate(authValidation.authDelelteValidation),
  authController.deleteAuth
);

/** Send mail */
router.post(
  "/send-mail",
  validate(authValidation.sendMail),
  authController.sendMail
);

router.post("/login", authController.authLogin);

module.exports = router;
