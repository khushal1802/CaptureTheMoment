const express = require("express");
const router = express.Router();
const validate = require("../../middlewares/schemavalidation.js");
const { contactValidation } = require("../../validation/index.js");
const { contactController } = require("../../controllers/index.js");

router.post(
  "/create",
  validate(contactValidation.contactCreateValidation),
  contactController.createContact
);
router.get("/list", contactController.getContactList);
/** Get contact details by id */
router.get("/get-details/:contactId", contactController.getDetails);

router.put(
  "/update/:id",
  validate(contactValidation.contactUpdateValidation),
  contactController.updateContact
);
router.delete(
  "/delete/:id",
  validate(contactValidation.contactDelelteValidation),
  contactController.deleteContact
);

module.exports = router;
