const { uploadOnCloudinary } = require("../utils/cloudinary.js");
const { photoService } = require("../services/index.js");

/** Create photo */
const createPhoto = async (req, res) => {
  try {
    const reqBody = req.body;
    const createdPhoto = await photoService.createPhoto(reqBody);

    const imageLocalPath = req.files?.image[0]?.path;
    if (imageLocalPath) {
      try {
        const image = await uploadOnCloudinary(imageLocalPath);
        createdPhoto.image = image.url;
      } catch (error) {
        console.error(`Error uploading image: ${error.message}`);
      }
    }

    /** Save Data into MongoDB database */
    const result = await createdPhoto.save();
    if (!result) {
      res.status(400).json({
        Success: false,
        Message: `Error in creating auth ..!`,
      });
    }

    res.status(200).json({
      success: true,
      message: "photo create successfully!",
      data: createdPhoto,
    });
  } catch (error) {
    res.status(error?.statusCode || 400).json({
      success: false,
      message:
        error?.message || "Something went wrong, please try again or later!",
    });
  }
};

/** Get photo details */
const getDetails = async (req, res) => {
  try {
    const photoExists = await photoService.getPhotoById(req.params.photoId);
    if (!photoExists) {
      throw new Error("photo not found!");
    }

    res.status(200).json({
      success: true,
      message: "photo details get successfully!",
      data: photoExists,
    });
  } catch (error) {
    res.status(error?.statusCode || 400).json({
      success: false,
      message:
        error?.message || "Something went wrong, please try again or later!",
    });
  }
};

/** Get photo list */
const getPhotoList = async (req, res) => {
  try {
    const getList = await photoService.getPhotoList();

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

/** Update photo details */
const updatePhoto = async (req, res) => {
  try {
    const reqBody = req.body;
    console.log(reqBody);
    const photoId = req.params.id;
    const photoExists = await photoService.getPhotoById(photoId);
    if (!photoExists) {
      throw new Error("photo not found!");
    }
    // console.log(reqBody);
    const updatedPhoto = await photoService.updatePhoto(photoId, reqBody);
    const imageLocalPath = req.files?.image[0]?.path;
    if (imageLocalPath) {
      try {
        const image = await uploadOnCloudinary(imageLocalPath);
        updatedPhoto.image = image.url;
      } catch (error) {
        console.error(`Error uploading image: ${error.message}`);
      }
    }

    /** Save Data into MongoDB database */
    const result = await updatedPhoto.save();
    if (!result) {
      res.status(400).json({
        Success: false,
        Message: `Error in creating auth ..!`,
      });
    }

    res.status(200).json({
      success: true,
      message: "photo details update successfully!",
      data: updatedPhoto,
    });
  } catch (error) {
    res.status(error?.statusCode || 400).json({
      success: false,
      message:
        error?.message || "Something went wrong, please try again or later!",
    });
  }
};

/** Delete photo */
const deletePhoto = async (req, res) => {
  try {
    const photoId = req.params.id;
    const photoExists = await photoService.getPhotoById(photoId);
    if (!photoExists) {
      throw new Error("photo not found!");
    }

    await photoService.deletePhoto(photoId);

    res.status(200).json({
      success: true,
      message: "photo delete successfully!",
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = {
  createPhoto,
  getDetails,
  getPhotoList,
  updatePhoto,
  deletePhoto,
};
