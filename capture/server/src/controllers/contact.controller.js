const { uploadOnCloudinary } = require("../utils/cloudinary.js");
const { contactService } = require("../services/index.js");

/** Create contact */
const createContact = async (req, res) => {
  try {
    const reqBody = req.body;
    const createdContact = await contactService.createContact(reqBody);

    res.status(200).json({
      success: true,
      message: "contact create successfully!",
      data: createdContact,
    });
  } catch (error) {
    res.status(error?.statusCode || 400).json({
      success: false,
      message:
        error?.message || "Something went wrong, please try again or later!",
    });
  }
};

/** Get contact details */
const getDetails = async (req, res) => {
  try {
    const contactExists = await contactService.getContactById(req.params.contactId);
    if (!contactExists) {
      throw new Error("contact not found!");
    }

    res.status(200).json({
      success: true,
      message: "contact details get successfully!",
      data: contactExists,
    });
  } catch (error) {
    res.status(error?.statusCode || 400).json({
      success: false,
      message:
        error?.message || "Something went wrong, please try again or later!",
    });
  }
};

/** Get contact list */
const getContactList = async (req, res) => {
  try {
    const getList = await contactService.getContactList();

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

/** Update contact details */
const updateContact = async (req, res) => {
  try {
    const reqBody = req.body;
    const contactId = req.params.id;
    const contactExists = await contactService.getContactById(contactId);
    if (!contactExists) {
      throw new Error("contact not found!");
    }
const updatedContact = await contactService.updateContact(contactId, reqBody);
    res.status(200).json({
      success: true,
      message: "contact details update successfully!",
      data: updatedContact,
    });
  } catch (error) {
    res.status(error?.statusCode || 400).json({
      success: false,
      message:
        error?.message || "Something went wrong, please try again or later!",
    });
  }
};

/** Delete contact */
const deleteContact = async (req, res) => {
  try {
    const contactId = req.params.id;
    const contactExists = await contactService.getContactById(contactId);
    if (!contactExists) {
      throw new Error("contact not found!");
    }

    await contactService.deleteContact(contactId);

    res.status(200).json({
      success: true,
      message: "contact delete successfully!",
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = {
  createContact,
  getDetails,
  getContactList,
  updateContact,
  deleteContact,
};
