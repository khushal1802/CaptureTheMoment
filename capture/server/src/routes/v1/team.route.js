const express = require("express");
const router = express.Router();

const validate = require("../../middlewares/schemavalidation.js");
const { upload } = require("../../middlewares/upload.js");
const { teamValidation } = require("../../validation/index.js");
const { teamController } = require("../../controllers/index.js");

router.post(
  "/create",
  validate(teamValidation.teamCreateValidation),
  upload.fields([{ name: "photo", maxCount: 1 }]),
  teamController.createTeam
);
router.get("/list", teamController.getTeamList);
/** Get team details by id */
router.get("/get-details/:teamId", teamController.getDetails);

router.put(
  "/update/:id",
  validate(teamValidation.teamUpdateValidation),
  upload.fields([{ name: "photo", maxCount: 1 }]),
  teamController.updateTeam
);
router.delete(
  "/delete/:id",
  validate(teamValidation.teamDelelteValidation),
  teamController.deleteTeam
);

module.exports = router;
