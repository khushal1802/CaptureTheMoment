const mongoose = require("mongoose");

const authSchema = new mongoose.Schema(
  {
    Profile: {
      type: String,
      trim: true,
    },
    Password: {
      type: String,
      //   require: true
    },
    Name: {
      type: String,
    },
    DOB: {
      type: Date,
    },
    Address: {
      type: String,
    },
    Phone: {
      type: Number,
      match: /^[0-9]{10}$/,
      //   require: true,
      //  unique: true,
    },
    Email: {
      type: String,
      // unqiue: true,
      match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    },
    Role: {
      type: String,
      default: "user",
      enum: ["admin", "user"],
    },
    AccessToken: {
      type: String,
      default: "",
    },
    IsActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Auth = mongoose.model("Auth", authSchema);

module.exports = Auth;
