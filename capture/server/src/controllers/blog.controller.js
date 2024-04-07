const { uploadOnCloudinary } = require("../utils/cloudinary.js");
const { blogService } = require("../services/index.js");

/** Create blog */
const createBlog = async (req, res) => {
  try {
    const reqBody = req.body;
    const createdBlog = await blogService.createBlog(reqBody);

    const imageLocalPath = req.files?.image[0]?.path;
    if (imageLocalPath) {
      try {
        const image = await uploadOnCloudinary(imageLocalPath);
        createdBlog.image = image.url;
      } catch (error) {
        console.error(`Error uploading image: ${error.message}`);
      }
    }

    /** Save Data into MongoDB database */
    const result = await createdBlog.save();
    if (!result) {
      res.status(400).json({
        Success: false,
        Message: `Error in creating auth ..!`,
      });
    }

    res.status(200).json({
      success: true,
      message: "blog create successfully!",
      data: createdBlog,
    });
  } catch (error) {
    res.status(error?.statusCode || 400).json({
      success: false,
      message:
        error?.message || "Something went wrong, please try again or later!",
    });
  }
};

/** Get blog details */
const getDetails = async (req, res) => {
  try {
    const blogExists = await blogService.getBlogById(req.params.blogId);
    if (!blogExists) {
      throw new Error("blog not found!");
    }

    res.status(200).json({
      success: true,
      message: "blog details get successfully!",
      data: blogExists,
    });
  } catch (error) {
    res.status(error?.statusCode || 400).json({
      success: false,
      message:
        error?.message || "Something went wrong, please try again or later!",
    });
  }
};

/** Get blog list */
const getBlogList = async (req, res) => {
  try {
    const getList = await blogService.getBlogList();

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

/** Update blog details */
const updateBlog = async (req, res) => {
  try {
    const reqBody = req.body;
    const blogId = req.params.id;
    const blogExists = await blogService.getBlogById(blogId);
    if (!blogExists) {
      throw new Error("blog not found!");
    }

    const updatedblog = await blogService.updateBlog(blogId, reqBody);
    const imageLocalPath = req.files?.image[0]?.path;
    if (imageLocalPath) {
      try {
        const image = await uploadOnCloudinary(imageLocalPath);
        updatedblog.image = image.url;
      } catch (error) {
        console.error(`Error uploading image: ${error.message}`);
      }
    }

    /** Save Data into MongoDB database */
    const result = await updatedblog.save();
    if (!result) {
      res.status(400).json({
        Success: false,
        Message: `Error in creating auth ..!`,
      });
    }

    res.status(200).json({
      success: true,
      message: "blog details update successfully!",
      data: updatedblog,
    });
  } catch (error) {
    res.status(error?.statusCode || 400).json({
      success: false,
      message:
        error?.message || "Something went wrong, please try again or later!",
    });
  }
};

/** Delete blog */
const deleteBlog = async (req, res) => {
  try {
    const blogId = req.params.id;
    const blogExists = await blogService.getBlogById(blogId);
    if (!blogExists) {
      throw new Error("blog not found!");
    }

    await blogService.deleteBlog(blogId);

    res.status(200).json({
      success: true,
      message: "blog delete successfully!",
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = {
  createBlog,
  getDetails,
  getBlogList,
  updateBlog,
  deleteBlog,
};
