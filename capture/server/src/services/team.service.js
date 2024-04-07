const { Team } = require("../models/index");

const getTeamById = async (teamId) => {
  return Team.findOne({ _id: teamId });
};

const getTeamList = async () => {
  return Team.find();
};

const createTeam = async (reqBody) => {
  return Team.create(reqBody);
};

const updateTeam = async (teamId, updateBody) => {
  return Team.findOneAndUpdate(
    { _id: teamId },
    { $set: updateBody },
    { new: true }
  );
};

const deleteTeam = async (teamId) => {
  return Team.findOneAndDelete({ _id: teamId });
};

module.exports = {
  getTeamById,
  getTeamList,
  createTeam,
  updateTeam,
  deleteTeam,
};
