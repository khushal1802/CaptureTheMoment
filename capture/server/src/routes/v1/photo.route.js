const express = require("express");
const router = express.Router();

const validate = require("../../middlewares/schemavalidation.js");
const { upload } = require("../../middlewares/upload.js");
const { photoValidation } = require("../../validation/index.js");
const { photoController } = require("../../controllers/index.js");

router.post(
  "/create",
  validate(photoValidation.photoCreateValidation),
  upload.fields([{ name: "image", maxCount: 1 }]),
  photoController.createPhoto
);
router.get("/list", photoController.getPhotoList);
/** Get photo details by id */
router.get(
  "/get-details/:photoId",
  photoController.getDetails
);

router.put(
  "/update/:id",
  validate(photoValidation.photoUpdateValidation),
  upload.fields([{ name: "image", maxCount: 1 }]),
  photoController.updatePhoto
);
router.delete(
  "/delete/:id",
  validate(photoValidation.photoDelelteValidation),
  photoController.deletePhoto
);

module.exports = router;