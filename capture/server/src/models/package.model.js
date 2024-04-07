const mongoose = require("mongoose");

const packageSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  fild: { type: String, required: true },
  type: { type: String, required: true },
  hours: { type: String, required: true },
  member: { type: String, required: true },
  album: { type: String, required: true },
  description: { type: String },
});
const Package = mongoose.model("Package", packageSchema);
module.exports = Package;
