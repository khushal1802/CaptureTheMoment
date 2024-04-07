const { Video } = require("../models/index");

const getVideoById = async (videoId) => {
  return Video.findOne({ _id: videoId });
};

const getVideoList = async () => {
  return Video.find();
};

const createVideo = async (reqBody) => {
  return Video.create(reqBody);
};

const updateVideo = async (videoId, updateBody) => {
  return Video.findOneAndUpdate(
    { _id: videoId },
    { $set: updateBody },
    { new: true }
  );
};

const deleteVideo = async (videoId) => {
  return Video.findOneAndDelete({ _id: videoId });
};

module.exports = {
  getVideoById,
  getVideoList,
  createVideo,
  updateVideo,
  deleteVideo,
};
