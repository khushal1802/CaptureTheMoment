const { Contact } = require("../models/index");

const getContactById = async (ContactId) => {
  return Contact.findOne({ _id: ContactId });
};

const getContactList = async () => {
  return Contact.find();
};

const createContact = async (reqBody) => {
  return Contact.create(reqBody);
};

const updateContact = async (contactId, updateBody) => {
  return Contact.findOneAndUpdate(
    { _id: contactId },
    { $set: updateBody },
    { new: true }
  );
};

const deleteContact = async (contactId) => {
  return Contact.findOneAndDelete({ _id: contactId });
};

module.exports = {
  getContactById,
  getContactList,
  createContact,
  updateContact,
  deleteContact,
};
