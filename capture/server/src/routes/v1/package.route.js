const express = require("express");
const router = express.Router();

const validate = require("../../middlewares/schemavalidation.js");
const { upload } = require("../../middlewares/upload.js");
const { packageValidation } = require("../../validation/index.js");
const { packageController } = require("../../controllers/index.js");

router.post(
  "/create",
  validate(packageValidation.packageCreateValidation),
  upload.fields([{ name: "image", maxCount: 1 }]),
  packageController.createPackage
);
router.get("/list", packageController.getPackageList);
/** Get package details by id */
router.get("/get-details/:packageId", packageController.getDetails);

router.put(
  "/update/:id",
  validate(packageValidation.packageUpdateValidation),
  upload.fields([{ name: "image", maxCount: 1 }]),
  packageController.updatePackage
);
router.delete(
  "/delete/:id",
  validate(packageValidation.packageDelelteValidation),
  packageController.deletePackage
);

module.exports = router;
