const multer = require("multer");
const fs = require("fs");
const path = require("path");
const { fileURLToPath } = require("url");

__filename = __filename || fileURLToPath(require.main.filename);
__dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (
      file.fieldname === "Profile" ||
      file.fieldname === "image" ||
      file.fieldname === "video" ||
      file.fieldname === "photo" ||
      file.fieldname === "press"
    ) {
      fs.mkdirSync(path.join(__dirname, "../public/temp"), { recursive: true });
      cb(null, path.join(__dirname, "../public/temp"));
    }
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    if (
      ext !== ".png" &&
      ext !== ".jpg" &&
      ext !== ".jpeg" &&
      ext !== ".mp4" &&
      ext !== ".webm"
    ) {
      cb("Only .png, .jpg, .jpeg, .mp4 formats are allowed!");
    }
    cb(null, new Date().getTime() + ext);
  },
});

module.exports.upload = multer({ storage: storage });
