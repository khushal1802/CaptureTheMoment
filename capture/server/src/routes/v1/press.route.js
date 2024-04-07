const express = require("express");
const router = express.Router();

const validate = require("../../middlewares/schemavalidation.js");
const { upload } = require("../../middlewares/upload.js");
const { pressValidation } = require("../../validation/index.js");
const { pressController } = require("../../controllers/index.js");

router.post(
  "/create",
  validate(pressValidation.pressCreateValidation),
  upload.fields([{ name: "press", maxCount: 1 }]),
  pressController.createPress
);
router.get("/list", pressController.getPressList);
/** Get press details by id */
router.get("/get-details/:pressId", pressController.getDetails);

router.put(
  "/update/:id",
  validate(pressValidation.pressUpdateValidation),
  upload.fields([{ name: "press", maxCount: 1 }]),
  pressController.updatePress
);
router.delete(
  "/delete/:id",
  validate(pressValidation.pressDelelteValidation),
  pressController.deletePress
);

module.exports = router;
