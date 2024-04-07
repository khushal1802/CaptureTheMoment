const express = require("express");
const router = express.Router();

const validate = require("../../middlewares/schemavalidation.js");
const { upload } = require("../../middlewares/upload.js");
const { blogValidation } = require("../../validation/index.js");
const { blogController } = require("../../controllers/index.js");

router.post(
  "/create",
  validate(blogValidation.blogCreateValidation),
  upload.fields([{ name: "image", maxCount: 1 }]),
  blogController.createBlog
);
router.get("/list", blogController.getBlogList);
/** Get blog details by id */
router.get("/get-details/:blogId", blogController.getDetails);

router.put(
  "/update/:id",
  validate(blogValidation.blogUpdateValidation),
  upload.fields([{ name: "image", maxCount: 1 }]),
  blogController.updateBlog
);
router.delete(
  "/delete/:id",
  validate(blogValidation.blogDelelteValidation),
  blogController.deleteBlog
);

module.exports = router;
