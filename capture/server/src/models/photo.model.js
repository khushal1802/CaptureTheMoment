const mongoose = require("mongoose");

const photoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
     image: {
      type: String,
      trim: true,
    },
});
const Photo = mongoose.model("Photo", photoSchema);
module.exports = Photo;
