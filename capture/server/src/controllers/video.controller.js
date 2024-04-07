const { uploadOnCloudinary } = require("../utils/cloudinary.js");
const { videoService } = require("../services/index.js");

/** Create video */
const createVideo = async (req, res) => {
  try {
    const reqBody = req.body;
    const createdVideo = await videoService.createVideo(reqBody);

    const videoLocalPath = req.files?.video[0]?.path;
    if (videoLocalPath) {
      try {
        const video = await uploadOnCloudinary(videoLocalPath);
        createdVideo.video = video.url;
      } catch (error) {
        console.error(`Error uploading video: ${error.message}`);
      }
    }

    /** Save Data into MongoDB database */
    const result = await createdVideo.save();
    if (!result) {
      res.status(400).json({
        Success: false,
        Message: `Error in creating auth ..!`,
      });
    }

    res.status(200).json({
      success: true,
      message: "video create successfully!",
      data: createdVideo,
    });
  } catch (error) {
    res.status(error?.statusCode || 400).json({
      success: false,
      message:
        error?.message || "Something went wrong, please try again or later!",
    });
  }
};

/** Get video details */
const getDetails = async (req, res) => {
  try {
    const videoExists = await videoService.getVideoById(req.params.videoId);
    if (!videoExists) {
      throw new Error("video not found!");
    }

    res.status(200).json({
      success: true,
      message: "video details get successfully!",
      data: videoExists,
    });
  } catch (error) {
    res.status(error?.statusCode || 400).json({
      success: false,
      message:
        error?.message || "Something went wrong, please try again or later!",
    });
  }
};

/** Get video list */
const getVideoList = async (req, res) => {
  try {
    const getList = await videoService.getVideoList();

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

/** Update video details */
const updateVideo = async (req, res) => {
  try {
    const reqBody = req.body;
    const videoId = req.params.id;
    const videoExists = await videoService.getVideoById(videoId);
    if (!videoExists) {
      throw new Error("video not found!");
    }

    const updatedVideo = await videoService.updateVideo(videoId, reqBody);
    const videoLocalPath = req.files?.video[0]?.path;
    if (videoLocalPath) {
      try {
        const video = await uploadOnCloudinary(videoLocalPath);
        updatedVideo.video = video.url;
      } catch (error) {
        console.error(`Error uploading video: ${error.message}`);
      }
    }

    /** Save Data into MongoDB database */
    const result = await updatedVideo.save();
    if (!result) {
      res.status(400).json({
        Success: false,
        Message: `Error in creating auth ..!`,
      });
    }

    res.status(200).json({
      success: true,
      message: "video details update successfully!",
      data: updatedVideo,
    });
  } catch (error) {
    res.status(error?.statusCode || 400).json({
      success: false,
      message:
        error?.message || "Something went wrong, please try again or later!",
    });
  }
};

/** Delete video */
const deleteVideo = async (req, res) => {
  try {
    const videoId = req.params.id;
    const videoExists = await videoService.getVideoById(videoId);
    if (!videoExists) {
      throw new Error("video not found!");
    }

    await videoService.deleteVideo(videoId);

    res.status(200).json({
      success: true,
      message: "video delete successfully!",
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = {
  createVideo,
  getDetails,
  getVideoList,
  updateVideo,
  deleteVideo,
};
