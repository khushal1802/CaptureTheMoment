const express = require("express");
const router = express.Router();

const validate = require("../../middlewares/schemavalidation.js");
const { upload } = require("../../middlewares/upload.js");
const { commentValidation } = require("../../validation/index.js");
const { commentController } = require("../../controllers/index.js");

router.post(
  "/create",
  validate(commentValidation.commentCreateValidation),
  upload.fields([{ name: "image", maxCount: 1 }]),
  commentController.createComment
);
router.get("/list", commentController.getCommentList);
/** Get comment details by id */
router.get("/get-details/:commentId", commentController.getDetails);

router.put(
  "/update/:id",
  validate(commentValidation.commentUpdateValidation),
  upload.fields([{ name: "image", maxCount: 1 }]),
  commentController.updateComment
);
router.delete(
  "/delete/:id",
  validate(commentValidation.commentDelelteValidation),
  commentController.deleteComment
);

module.exports = router;
