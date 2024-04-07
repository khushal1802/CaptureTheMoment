const { Blog } = require("../models/index");

const getBlogById = async (blogId) => {
  return Blog.findOne({ _id: blogId });
};

const getBlogList = async () => {
  return Blog.find();
};

const createBlog = async (reqBody) => {
  return Blog.create(reqBody);
};

const updateBlog = async (blogId, updateBody) => {
  return Blog.findOneAndUpdate(
    { _id: blogId },
    { $set: updateBody },
    { new: true }
  );
};

const deleteBlog = async (blogId) => {
  return Blog.findOneAndDelete({ _id: blogId });
};

module.exports = {
  getBlogById,
  getBlogList,
  createBlog,
  updateBlog,
  deleteBlog,
};
