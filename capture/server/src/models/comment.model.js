const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  image: {
    type: String,
    trim: true,
  },
});
const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;
