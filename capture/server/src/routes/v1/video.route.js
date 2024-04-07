const express = require("express");
const router = express.Router();

const validate = require("../../middlewares/schemavalidation.js");
const { upload } = require("../../middlewares/upload.js");
const { videoValidation } = require("../../validation/index.js");
const { videoController } = require("../../controllers/index.js");

router.post(
  "/create",
  validate(videoValidation.videoCreateValidation),
  upload.fields([{ name: "video", maxCount: 1 }]),
  videoController.createVideo
);

router.get("/list", videoController.getVideoList);

/** Get video details by id */
router.get(
  "/get-details/:videoId",
  validate(videoValidation.getDetails),
  videoController.getDetails
);

router.put(
  "/update/:id",
  validate(videoValidation.videoUpdateValidation),
  upload.fields([{ name: "video", maxCount: 1 }]),
  videoController.updateVideo
);
router.delete(
  "/delete/:id",
  validate(videoValidation.videoDelelteValidation),
  videoController.deleteVideo
);

module.exports = router;
