const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  fname: {
    type: String,
    trim: true,
  },
  lname: {
    type: String,
    trim: true,
  },
  phone: {
    type: Number,
    match: /^[0-9]{10}$/,
  },
  email: {
    type: String,
    match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
  },
  description: {
    type: String,
    trim: true,
  },
});
const Contact = mongoose.model("Contact", contactSchema);
module.exports = Contact;
