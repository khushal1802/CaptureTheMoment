const { uploadOnCloudinary } = require("../utils/cloudinary.js");
const { packageService } = require("../services/index.js");

/** Create package */
const createPackage = async (req, res) => {
  try {
    const reqBody = req.body;
    const createdPackage = await packageService.createPackage(reqBody);

    const imageLocalPath = req.files?.image[0]?.path;
    if (imageLocalPath) {
      try {
        const image = await uploadOnCloudinary(imageLocalPath);
        createdPackage.image = image.url;
      } catch (error) {
        console.error(`Error uploading image: ${error.message}`);
      }
    }

    /** Save Data into MongoDB database */
    const result = await createdPackage.save();
    if (!result) {
      res.status(400).json({
        Success: false,
        Message: `Error in creating auth ..!`,
      });
    }

    res.status(200).json({
      success: true,
      message: "Package create successfully!",
      data: createdPackage,
    });
  } catch (error) {
    res.status(error?.statusCode || 400).json({
      success: false,
      message:
        error?.message || "Something went wrong, please try again or later!",
    });
  }
};

/** Get Package details */
const getDetails = async (req, res) => {
  try {
    const packageExists = await packageService.getPackageById(req.params.packageId);
    if (!packageExists) {
      throw new Error("Package not found!");
    }

    res.status(200).json({
      success: true,
      message: "Package details get successfully!",
      data: packageExists,
    });
  } catch (error) {
    res.status(error?.statusCode || 400).json({
      success: false,
      message:
        error?.message || "Something went wrong, please try again or later!",
    });
  }
};

/** Get package list */
const getPackageList = async (req, res) => {
  try {
    const getList = await packageService.getPackageList();

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

/** Update Package details */
const updatePackage = async (req, res) => {
  try {
    const reqBody = req.body;
    const packageId = req.params.id;
    const packageExists = await packageService.getPackageById(packageId);
    if (!packageExists) {
      throw new Error("Package not found!");
    }

    const updatedPackage = await packageService.updatePackage(packageId, reqBody);
    const imageLocalPath = req.files?.image[0]?.path;
    if (imageLocalPath) {
      try {
        const image = await uploadOnCloudinary(imageLocalPath);
        updatedPackage.image = image.url;
      } catch (error) {
        console.error(`Error uploading image: ${error.message}`);
      }
    }

    /** Save Data into MongoDB database */
    const result = await updatedPackage.save();
    if (!result) {
      res.status(400).json({
        Success: false,
        Message: `Error in creating auth ..!`,
      });
    }

    res.status(200).json({
      success: true,
      message: "Package details update successfully!",
      data: updatedPackage,
    });
  } catch (error) {
    res.status(error?.statusCode || 400).json({
      success: false,
      message:
        error?.message || "Something went wrong, please try again or later!",
    });
  }
};

/** Delete Package */
const deletePackage = async (req, res) => {
  try {
    const packageId = req.params.id;
    const packageExists = await packageService.getPackageById(packageId);
    if (!packageExists) {
      throw new Error("Package not found!");
    }

    await packageService.deletePackage(packageId);

    res.status(200).json({
      success: true,
      message: "Package delete successfully!",
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = {
  createPackage,
  getDetails,
  getPackageList,
  updatePackage,
  deletePackage,
};
