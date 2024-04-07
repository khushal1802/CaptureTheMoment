const mongoose = require("mongoose");

const pressSchema = new mongoose.Schema({
    name: { type: String, required: true },
    title: { type: String, required: true },
  description: { type: String },
  image: {
    type: String,
    trim: true,
  },
});
const Press = mongoose.model("Press", pressSchema);
module.exports = Press;
