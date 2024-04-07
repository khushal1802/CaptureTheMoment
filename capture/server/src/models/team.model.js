const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  photo: {
    type: String,
    trim: true,
    },
    role: { type: String, required: true }
});
const Team = mongoose.model("Team", teamSchema);
module.exports = Team;
