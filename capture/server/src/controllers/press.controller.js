const { uploadOnCloudinary } = require("../utils/cloudinary.js");
const { pressService } = require("../services/index.js");

/** Create press */
const createPress = async (req, res) => {
  try {
    const reqBody = req.body;
    const createdPress = await pressService.createPress(reqBody);
    const imageLocalPath = req.files?.press[0]?.path;
    if (imageLocalPath) {
      try {
        const image = await uploadOnCloudinary(imageLocalPath);
        createdPress.image = image.url;
      } catch (error) {
        console.error(`Error uploading image: ${error.message}`);
      }
    }

    /** Save Data into MongoDB database */
    const result = await createdPress.save();
    if (!result) {
      res.status(400).json({
        Success: false,
        Message: `Error in creating auth ..!`,
      });
    }

    res.status(200).json({
      success: true,
      message: "press create successfully!",
      data: createdPress,
    });
  } catch (error) {
    res.status(error?.statusCode || 400).json({
      success: false,
      message:
        error?.message || "Something went wrong, please try again or later!",
    });
  }
};

/** Get press details */
const getDetails = async (req, res) => {
  try {
    const pressExists = await pressService.getPressById(req.params.pressId);
    if (!pressExists) {
      throw new Error("press not found!");
    }

    res.status(200).json({
      success: true,
      message: "press details get successfully!",
      data: pressExists,
    });
  } catch (error) {
    res.status(error?.statusCode || 400).json({
      success: false,
      message:
        error?.message || "Something went wrong, please try again or later!",
    });
  }
};

/** Get press list */
const getPressList = async (req, res) => {
  try {
    const getList = await pressService.getPressList();

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

/** Update press details */
const updatePress = async (req, res) => {
  try {
    const reqBody = req.body;
    const pressId = req.params.id;
    const pressExists = await pressService.getPressById(pressId);
    if (!pressExists) {
      throw new Error("press not found!");
    }

    const updatedPress = await pressService.updatePress(pressId, reqBody);
    const imageLocalPath = req.files?.press[0]?.path;
    if (imageLocalPath) {
      try {
        const image = await uploadOnCloudinary(imageLocalPath);
        updatedPress.image = image.url;
      } catch (error) {
        console.error(`Error uploading image: ${error.message}`);
      }
    }

    /** Save Data into MongoDB database */
    const result = await updatedPress.save();
    if (!result) {
      res.status(400).json({
        Success: false,
        Message: `Error in creating auth ..!`,
      });
    }

    res.status(200).json({
      success: true,
      message: "press details update successfully!",
      data: updatedPress,
    });
  } catch (error) {
    res.status(error?.statusCode || 400).json({
      success: false,
      message:
        error?.message || "Something went wrong, please try again or later!",
    });
  }
};

/** Delete press */
const deletePress = async (req, res) => {
  try {
    const pressId = req.params.id;
    const pressExists = await pressService.getPressById(pressId);
    if (!pressExists) {
      throw new Error("press not found!");
    }

    await pressService.deletePress(pressId);

    res.status(200).json({
      success: true,
      message: "press delete successfully!",
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = {
  createPress,
  getDetails,
  getPressList,
  updatePress,
  deletePress,
};
