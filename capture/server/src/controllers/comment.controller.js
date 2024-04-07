const { uploadOnCloudinary } = require("../utils/cloudinary.js");
const { commentService } = require("../services/index.js");

/** Create comment */
const createComment = async (req, res) => {
  try {
    const reqBody = req.body;
    const createdComment = await commentService.createComment(reqBody);

    const imageLocalPath = req.files?.image[0]?.path;
    if (imageLocalPath) {
      try {
        const image = await uploadOnCloudinary(imageLocalPath);
        createdComment.image = image.url;
      } catch (error) {
        console.error(`Error uploading image: ${error.message}`);
      }
    }

    /** Save Data into MongoDB database */
    const result = await createdComment.save();
    if (!result) {
      res.status(400).json({
        Success: false,
        Message: `Error in creating auth ..!`,
      });
    }

    res.status(200).json({
      success: true,
      message: "comment create successfully!",
      data: createdComment,
    });
  } catch (error) {
    res.status(error?.statusCode || 400).json({
      success: false,
      message:
        error?.message || "Something went wrong, please try again or later!",
    });
  }
};

/** Get comment details */
const getDetails = async (req, res) => {
  try {
    const commentExists = await commentService.getCommentById(
      req.params.commentId
    );
    if (!commentExists) {
      throw new Error("comment not found!");
    }

    res.status(200).json({
      success: true,
      message: "comment details get successfully!",
      data: commentExists,
    });
  } catch (error) {
    res.status(error?.statusCode || 400).json({
      success: false,
      message:
        error?.message || "Something went wrong, please try again or later!",
    });
  }
};

/** Get comment list */
const getCommentList = async (req, res) => {
  try {
    const getList = await commentService.getCommentList();

    res.status(200).json({
      success: true,
      data: getList,
    });
  } catch (error) {
    res.status(error?.statusCode || 400).json({
      success: false,
      message:
        error?.message || "Something went wrong, please try again or later!",
    });
  }
};

/** Update comment details */
const updateComment = async (req, res) => {
  try {
    const reqBody = req.body;
    const commentId = req.params.id;
    const commentExists = await commentService.getCommentById(commentId);
    if (!commentExists) {
      throw new Error("comment not found!");
    }

    const updatedComment = await commentService.updateComment(
      commentId,
      reqBody
    );
    const imageLocalPath = req.files?.image[0]?.path;
    if (imageLocalPath) {
      try {
        const image = await uploadOnCloudinary(imageLocalPath);
        updatedComment.image = image.url;
      } catch (error) {
        console.error(`Error uploading image: ${error.message}`);
      }
    }

    /** Save Data into MongoDB database */
    const result = await updatedComment.save();
    if (!result) {
      res.status(400).json({
        Success: false,
        Message: `Error in creating auth ..!`,
      });
    }

    res.status(200).json({
      success: true,
      message: "comment details update successfully!",
      data: updatedComment,
    });
  } catch (error) {
    res.status(error?.statusCode || 400).json({
      success: false,
      message:
        error?.message || "Something went wrong, please try again or later!",
    });
  }
};

/** Delete comment */
const deleteComment = async (req, res) => {
  try {
    const commentId = req.params.id;
    const commentExists = await commentService.getCommentById(commentId);
    if (!commentExists) {
      throw new Error("comment not found!");
    }

    await commentService.deleteComment(commentId);

    res.status(200).json({
      success: true,
      message: "comment delete successfully!",
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = {
  createComment,
  getDetails,
  getCommentList,
  updateComment,
  deleteComment,
};
