const { Package } = require("../models/index");

const getPackageById = async (packageId) => {
  return Package.findOne({ _id: packageId });
};

const getPackageList = async () => {
  return Package.find();
};

const createPackage = async (reqBody) => {
  return Package.create(reqBody);
};

const updatePackage = async (packageId, updateBody) => {
  return Package.findOneAndUpdate(
    { _id: packageId },
    { $set: updateBody },
    { new: true }
  );
};

const deletePackage = async (packageId) => {
  return Package.findOneAndDelete({ _id: packageId });
};

module.exports = {
  getPackageById,
  getPackageList,
  createPackage,
  updatePackage,
  deletePackage,
};
