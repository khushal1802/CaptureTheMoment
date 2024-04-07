const { Press } = require("../models/index");

const getPressById = async (pressId) => {
  return Press.findOne({ _id: pressId });
};

const getPressList = async () => {
  return Press.find();
};

const createPress = async (reqBody) => {
  return Press.create(reqBody);
};

const updatePress = async (pressId, updateBody) => {
  return Press.findOneAndUpdate(
    { _id: pressId },
    { $set: updateBody },
    { new: true }
  );
};

const deletePress = async (pressId) => {
  return Press.findOneAndDelete({ _id: pressId });
};

module.exports = {
  getPressById,
  getPressList,
  createPress,
  updatePress,
  deletePress,
};
