const { Comment } = require("../models/index");

const getCommentById = async (commentId) => {
  return Comment.findOne({ _id: commentId });
};

const getCommentList = async () => {
  return Comment.find();
};

const createComment = async (reqBody) => {
  return Comment.create(reqBody);
};

const updateComment = async (commentId, updateBody) => {
  return Comment.findOneAndUpdate(
    { _id: commentId },
    { $set: updateBody },
    { new: true }
  );
};

const deleteComment = async (commentId) => {
  return Comment.findOneAndDelete({ _id: commentId });
};

module.exports = {
  getCommentById,
  getCommentList,
  createComment,
  updateComment,
  deleteComment,
};
