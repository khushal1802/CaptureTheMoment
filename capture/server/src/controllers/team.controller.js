const { uploadOnCloudinary } = require("../utils/cloudinary.js");
const { teamService } = require("../services/index.js");

/** Create team */
const createTeam = async (req, res) => {
  try {
    const reqBody = req.body;
    const createdTeam = await teamService.createTeam(reqBody);

    const photoLocalPath = req.files?.photo[0]?.path;
    if (photoLocalPath) {
      try {
        const photo = await uploadOnCloudinary(photoLocalPath);
        createdTeam.photo = photo.url;
      } catch (error) {
        console.error(`Error uploading photo: ${error.message}`);
      }
    }

    /** Save Data into MongoDB database */
    const result = await createdTeam.save();
    if (!result) {
      res.status(400).json({
        Success: false,
        Message: `Error in creating auth ..!`,
      });
    }

    res.status(200).json({
      success: true,
      message: "team create successfully!",
      data: createdTeam,
    });
  } catch (error) {
    res.status(error?.statusCode || 400).json({
      success: false,
      message:
        error?.message || "Something went wrong, please try again or later!",
    });
  }
};

/** Get team details */
const getDetails = async (req, res) => {
  try {
    const teamExists = await teamService.getTeamById(req.params.teamId);
    if (!teamExists) {
      throw new Error("team not found!");
    }

    res.status(200).json({
      success: true,
      message: "team details get successfully!",
      data: teamExists,
    });
  } catch (error) {
    res.status(error?.statusCode || 400).json({
      success: false,
      message:
        error?.message || "Something went wrong, please try again or later!",
    });
  }
};

/** Get team list */
const getTeamList = async (req, res) => {
  try {
    const getList = await teamService.getTeamList();

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

/** Update team details */
const updateTeam = async (req, res) => {
  try {
    const reqBody = req.body;
    const teamId = req.params.id;
    const teamExists = await teamService.getTeamById(teamId);
    if (!teamExists) {
      throw new Error("team not found!");
    }

    const updatedTeam = await teamService.updateTeam(teamId, reqBody);
    const photoLocalPath = req.files?.photo[0]?.path;
    if (photoLocalPath) {
      try {
        const photo = await uploadOnCloudinary(photoLocalPath);
        updatedTeam.photo = photo.url;
      } catch (error) {
        console.error(`Error uploading photo: ${error.message}`);
      }
    }

    /** Save Data into MongoDB database */
    const result = await updatedTeam.save();
    if (!result) {
      res.status(400).json({
        Success: false,
        Message: `Error in creating auth ..!`,
      });
    }

    res.status(200).json({
      success: true,
      message: "team details update successfully!",
      data: updatedTeam,
    });
  } catch (error) {
    res.status(error?.statusCode || 400).json({
      success: false,
      message:
        error?.message || "Something went wrong, please try again or later!",
    });
  }
};

/** Delete team */
const deleteTeam = async (req, res) => {
  try {
    const teamId = req.params.id;
    const teamExists = await teamService.getTeamById(teamId);
    if (!teamExists) {
      throw new Error("team not found!");
    }

    await teamService.deleteTeam(teamId);

    res.status(200).json({
      success: true,
      message: "team delete successfully!",
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = {
  createTeam,
  getDetails,
  getTeamList,
  updateTeam,
  deleteTeam,
};
