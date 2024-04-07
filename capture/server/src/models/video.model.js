const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  video: {
    type: String,
    trim: true,
  },
});
const Video = mongoose.model("Video", videoSchema);
module.exports = Video;
