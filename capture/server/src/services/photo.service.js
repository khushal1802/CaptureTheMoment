const { Photo } = require("../models/index");

const getPhotoById = async (photoId) => {
  return Photo.findOne({ _id: photoId });
};

const getPhotoList = async () => {
  return Photo.find();
};

const createPhoto = async (reqBody) => {
  return Photo.create(reqBody);
};

const updatePhoto = async (photoId, updateBody) => {
  return Photo.findOneAndUpdate(
    { _id: photoId },
    { $set: updateBody },
    { new: true }
  );
};

const deletePhoto = async (photoId) => {
  return Photo.findOneAndDelete({ _id: photoId });
};

module.exports = {
  getPhotoById,
  getPhotoList,
  createPhoto,
  updatePhoto,
  deletePhoto,
};
