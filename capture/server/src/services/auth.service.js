const { Auth } = require("../models");

const createAuth = async (reqBody) => {
  return await Auth.create(reqBody);
};

const getAuthList = async (req, res) => {
  return Auth.find();
};

const getAuthByEmail = async (Email) => {
  return await Auth.findOne({ Email });
};

const getAuthById = async (authId) => {
  return Auth.findById(authId);
};

const updateAuthDetails = async (authId, updateBody) => {
  try {
    const updatedAuth = await Auth.findByIdAndUpdate(
      authId,
      { $set: updateBody },
      { new: true }
    );
    if (!updatedAuth) {
      throw new Error("Unable to update auth details.");
    }
    return updatedAuth;
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteAuth = async (authId) => {
  return Auth.findByIdAndDelete(authId);
};

const deleteAuthByEmail = async (email) => {
  return Auth.findOneAndDelete({ email: email });
};

module.exports = {
  createAuth,
  getAuthList,
  getAuthById,
  updateAuthDetails,
  getAuthByEmail,
  deleteAuth,
  deleteAuthByEmail,
};
